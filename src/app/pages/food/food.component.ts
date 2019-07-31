import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/core/services/food.service';
import { DailyNutrientInterface } from 'src/app/core/models/daily-nutrient-interface';



@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  public dailyNutr: DailyNutrientInterface = this.buildNewDailyNutrient();

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodService.getDaily(new Date()).subscribe((result: DailyNutrientInterface) => {
      this.dailyNutr = result;
      if (result) {
        this.dailyNutr = result;
      } else {
        this.foodService.saveDaily(this.dailyNutr).subscribe((result) => {
          this.dailyNutr = result;
        });
      }
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
