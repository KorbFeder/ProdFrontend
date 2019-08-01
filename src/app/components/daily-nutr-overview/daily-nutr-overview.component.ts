import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { DailyNutrientInterface } from 'src/app/core/models/daily-nutrient-interface';
import { MatTableDataSource } from '@angular/material';
import { FoodInterface } from 'src/app/core/models/food-interface';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-daily-nutr-overview',
  templateUrl: './daily-nutr-overview.component.html',
  styleUrls: ['./daily-nutr-overview.component.scss']
})
export class DailyNutrOverviewComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  public dailyNutr$: Observable<DailyNutrientInterface>;
  public unsub$: Subject<boolean> = new Subject();

  public caloriesToday: number;
  public caloriesGoal: number;

  public displayedColumns: string[] = ['name', 'amount', 'goal', 'diff'];
  public tableData = new MatTableDataSource<any>([]);

  public date: Date;

  constructor() {
  }

  ngOnChanges() {
    this.dailyNutr$.pipe(
      takeUntil(this.unsub$)
    ).subscribe((dailyNutr) => {
      this.createDataTable(dailyNutr);
    });
  }

  ngOnInit() {
  }

  private createDataTable(dailyNutr: DailyNutrientInterface) {
    const today = this.calculateFromEaten(dailyNutr.foods);
    this.tableData.data = [
      {
        name: 'Carbs',
        amount: today.carb,
        goal: dailyNutr.carbGoal,
        diff: dailyNutr.carbGoal - today.carb
      },
      {
        name: 'Protein',
        amount: today.protein,
        goal: dailyNutr.proteinGoal,
        diff: dailyNutr.proteinGoal - today.protein
      },
      {
        name: 'Fat',
        amount: today.fat,
        goal: dailyNutr.fatGoal,
        diff: dailyNutr.fatGoal - today.fat
      },
    ];
    this.caloriesToday = 4 * today.carb + today.fat * 9 + today.protein * 4;
    this.caloriesGoal = 4 * dailyNutr.carbGoal + dailyNutr.fatGoal * 9 + dailyNutr.proteinGoal * 4;
    this.date = dailyNutr.dayNr;
  }

  private calculateFromEaten(foods: FoodInterface[]) {
    let carb = 0;
    let fat = 0;
    let protein = 0;
    for (let food of foods) {
      carb += food.carb;
      fat += food.fat;
      protein += food.protein;
    }
    return {carb, fat, protein};
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.unsubscribe();
  }
}
