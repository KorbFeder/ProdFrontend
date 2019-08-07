import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/core/services/food.service';
import { DailyNutrientInterface } from 'src/app/core/models/daily-nutrient-interface';
import { FoodInterface } from 'src/app/core/models/food-interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mergeMap, tap, map } from 'rxjs/operators';


// todo -> ngrx store
@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  /** Data for meals-stepper to hand data to its components */
  public loadedFood: FoodInterface[];

  /** Subject to inform the Daily-Nutrient component for updates */
  public dailyNutr$ = new BehaviorSubject<DailyNutrientInterface>(this.buildNewDailyNutrient(new Date()));

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodService.getDaily(new Date()).subscribe((result: DailyNutrientInterface) => {
      // if there is already a DailyNutrient for today use that one
      if (result) {
        this.dailyNutr$.next(result);
        // gets meals, which have been chosen today
        this.foodService.getOwnFood(result.id.toString()).subscribe((result) => {
          this.loadedFood = result;
        });
      // if there no DailyNutrient for today create a new one
      } else {
        this.getSavedDailyNutrient().pipe(
          mergeMap((saved) => {
            const daily = this.buildNewDailyNutrient(new Date());
            daily.fatGoal = saved.fatGoal;
            daily.carbGoal = saved.carbGoal;
            daily.proteinGoal = saved.proteinGoal;
            return this.foodService.saveDaily(daily);
          }),
          tap((saved: DailyNutrientInterface) => this.dailyNutr$.next(saved)),
          mergeMap((saved: DailyNutrientInterface) => this.foodService.getOwnFood(saved.id.toString())),
          tap((food: FoodInterface[]) => this.loadedFood = food)
        ).subscribe();
      }
    });
  }

  /**
   * This is an event emitted when an item got chosen and added was clicked, in the search food component.
   * This events get handed down from the search-food.component to the meals stepper to this component.
   * This will save the new food and add it the ownFood Database.
   *
   * @param food FoodInterface
   */
  public itemChosen(food: FoodInterface) {
    food.day_id = this.dailyNutr$.value.id;
    this.foodService.saveOwnFood(food).subscribe((result) => {
      // refresh / load new data into the daily nutrient component
      this.sendNewDaily([...this.dailyNutr$.value.foods, ...result]);
      // gets the new food array of all foods to refresh / reload the display-food component
      this.foodService.getOwnFood(this.dailyNutr$.value.id.toString()).subscribe((result) => {
        this.loadedFood = result;
      });
    });
  }

  /**
   * This is an event emitted when the delete button gets clicked in the display-food-component,
   * its get handed from there to the meals-stepper component to this function. 
   * This function will delete the food from the database.
   *
   * @param food FoodInterface
   */
  public ownFoodDeleted(food: FoodInterface) {
    this.foodService.deleteOwnFood(food.id).subscribe((result) => {
      // gets called to refresh the other components (daily nutrient and display food component)
      this.foodService.getOwnFood(this.dailyNutr$.value.id.toString()).subscribe((res) => {
        this.loadedFood = res;
        this.sendNewDaily(res);
     });
    });
  }

  /**
   * Builds a default daily nutrient object if, which will be overwritten if one could be loaded from the
   * database.
   */
  private buildNewDailyNutrient(date: Date): DailyNutrientInterface {
    const newDailyNutr: DailyNutrientInterface = {
      dayNr: date,
      fatGoal: 100,
      carbGoal: 300,
      proteinGoal: 200,
      fat: 0,
      carb: 0,
      protein: 0,
      foods: []
    };

    return  newDailyNutr;
  }
  private dailyGoalUpdated(newGoal: [{name: string, amount: number, goal: number, diff: number}]) {
    this.getSavedDailyNutrient().pipe(
      map((result) => {
        for (let goal of newGoal) {
          switch (goal.name) {
            case 'Fat':
              result.fatGoal = goal.goal;
              break;
            case 'Protein':
              result.proteinGoal = goal.goal;
              break;
            case 'Carbs':
              result.carbGoal = goal.goal;
          }
        }
        return result;
      }),
      mergeMap((result) => this.foodService.updateDaily(result)),
      mergeMap(() => this.foodService.getDaily(new Date())),
      mergeMap((result) => {
        for (let goal of newGoal) {
          switch (goal.name) {
            case 'Fat':
              result.fatGoal = goal.goal;
              break;
            case 'Protein':
              result.proteinGoal = goal.goal;
              break;
            case 'Carbs':
              result.carbGoal = goal.goal;
          }
        }
        return this.foodService.updateDaily(result);
      })

    ).subscribe();
  }

  private getSavedDailyNutrient(): Observable<DailyNutrientInterface> {
    const date = new Date(1999);
    return this.foodService.getDaily(date).pipe(
      mergeMap((result) => {
      if (result === null) {
        return this.foodService.saveDaily(this.buildNewDailyNutrient(date));
      } else {
        return of(result);
      }}),
    );
  }

  /**
   * Helper function to refresh / sends new Data to the daily nutrient component.
   *
   * @param foods FoodInterface[]
   */
  private sendNewDaily(foods: FoodInterface[]) {
    const newDaily = {...this.dailyNutr$.value};
    newDaily.foods = foods;
    this.dailyNutr$.next(newDaily);
  }
}
