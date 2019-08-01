import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/core/services/food.service';
import { DailyNutrientInterface } from 'src/app/core/models/daily-nutrient-interface';
import { FoodInterface } from 'src/app/core/models/food-interface';
import { mergeMap, tap } from 'rxjs/operators';



@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  public dailyNutr: DailyNutrientInterface = this.buildNewDailyNutrient();
  public loadedFood: FoodInterface[];

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodService.getDaily(new Date()).subscribe((result: DailyNutrientInterface) => {
      if (result) {
        this.dailyNutr = result;
        this.foodService.getOwnFood(this.dailyNutr.id.toString()).subscribe((result) => {
          this.loadedFood = result;
        });
      } else {
        this.foodService.saveDaily(this.buildNewDailyNutrient()).subscribe((result) => {
          this.dailyNutr = result;
          this.foodService.getOwnFood(this.dailyNutr.id.toString()).subscribe((result) => {
            this.loadedFood = result;
          });
        });
      }
    });
  }

  public itemChosen(food: FoodInterface) {
    food.day_id = this.dailyNutr.id;
    this.foodService.saveOwnFood(food).subscribe((result) => {
      this.dailyNutr.foods.push(result);
      console.log({result});
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
}
