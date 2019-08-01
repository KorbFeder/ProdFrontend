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
  public loadedFood: FoodInterface[];

  public dailyNutr$ = new BehaviorSubject<DailyNutrientInterface>(this.buildNewDailyNutrient());

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodService.getDaily(new Date()).subscribe((result: DailyNutrientInterface) => {
      if (result) {
        this.dailyNutr$.next(result);
        this.foodService.getOwnFood(result.id.toString()).subscribe((result) => {
          this.loadedFood = result;
        });
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

  public itemChosen(food: FoodInterface) {
    food.day_id = this.dailyNutr$.value.id;
    this.foodService.saveOwnFood(food).subscribe((result) => {
      //this.dailyNutr.foods.push(result);
      this.sendNewDaily([...this.dailyNutr$.value.foods, ...result]);
      this.foodService.getOwnFood(this.dailyNutr$.value.id.toString()).subscribe((result) => {
        this.loadedFood = result;
      });
    });
  }

  public ownFoodDeleted(food: FoodInterface) {
    this.foodService.deleteOwnFood(food.id).subscribe((result) => {
      this.foodService.getOwnFood(this.dailyNutr$.value.id.toString()).subscribe((res) => {
        this.loadedFood = res;
        this.sendNewDaily(res);
     });
    });
  }

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

  private sendNewDaily(foods) {
    const newDaily = {...this.dailyNutr$.value};
    newDaily.foods = foods;
    this.dailyNutr$.next(newDaily);
  }
}
