import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-nutr-overview',
  templateUrl: './daily-nutr-overview.component.html',
  styleUrls: ['./daily-nutr-overview.component.scss']
})
export class DailyNutrOverviewComponent implements OnInit {
  private carbsToday: number;
  private proteinToday: number;
  private fatToday: number;
  public carbohydratesToday: number;

  private carbsGoal: number;
  private proteinGoal: number;
  private fatGoal: number;
  public carbohydratesGoal: number;

  public displayedColumns: string[] = ['name', 'amount', 'goal', 'diff'];
  public tableData;

  public date: Date;

  constructor() {
    this.tableData = [
      {name: 'Carbs', amount: this.carbsToday, goal: this.carbsGoal, diff: this.carbsGoal - this.carbsToday},
      {name: 'Protein', amount: this.proteinToday, goal: this.proteinGoal, diff: this.proteinGoal - this.proteinToday},
      {name: 'Fat', amount: this.fatToday, goal: this.fatGoal, diff: this.fatGoal - this.fatToday},
    ];
  }

  ngOnInit() {
  }

}
