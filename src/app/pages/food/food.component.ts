import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/core/services/food.service';
import { DailyNutrientInterface } from 'src/app/core/models/daily-nutrient-interface';
import { FoodInterface } from 'src/app/core/models/food-interface';
import { BehaviorSubject } from 'rxjs';


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
  public dailyNutr$ = new BehaviorSubject<DailyNutrientInterface>(this.buildNewDailyNutrient());

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
        this.foodService.saveDaily(this.buildNewDailyNutrient()).subscribe((result) => {
          this.dailyNutr$.next(result);
          this.foodService.getOwnFood(result.id.toString()).subscribe((result) => {
            this.loadedFood = result;
          });
        });
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
  private buildNewDailyNutrient(): DailyNutrientInterface {
    const newDailyNutr: DailyNutrientInterface = {
      dayNr: new Date(),
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
