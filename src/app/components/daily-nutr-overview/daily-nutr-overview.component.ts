import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DailyNutrientInterface } from 'src/app/core/models/daily-nutrient-interface';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-daily-nutr-overview',
  templateUrl: './daily-nutr-overview.component.html',
  styleUrls: ['./daily-nutr-overview.component.scss']
})
export class DailyNutrOverviewComponent implements OnInit, OnChanges{
  @Input()
  public dailyNutr: DailyNutrientInterface;

  public caloriesToday: number;
  public caloriesGoal: number;

  public displayedColumns: string[] = ['name', 'amount', 'goal', 'diff'];
  public tableData = new MatTableDataSource<any>([]);

  public date: Date;

  constructor() {
  }

  ngOnInit() {
 }

  ngOnChanges() {
    this.tableData.data = [
      {
        name: 'Carbs',
        amount: this.dailyNutr.carb,
        goal: this.dailyNutr.carbGoal,
        diff: this.dailyNutr.carbGoal - this.dailyNutr.carb
      },
      {
        name: 'Protein',
        amount: this.dailyNutr.protein,
        goal: this.dailyNutr.proteinGoal,
        diff: this.dailyNutr.proteinGoal - this.dailyNutr.protein
      },
      {
        name: 'Fat',
        amount: this.dailyNutr.fat,
        goal: this.dailyNutr.fatGoal,
        diff: this.dailyNutr.fatGoal - this.dailyNutr.fat
      },
    ];
    this.caloriesToday = 4 * this.dailyNutr.carb + this.dailyNutr.fat * 9 + this.dailyNutr.protein * 4;
    this.caloriesGoal = 4 * this.dailyNutr.carbGoal + this.dailyNutr.fatGoal * 9 + this.dailyNutr.proteinGoal * 4;
  }
}
