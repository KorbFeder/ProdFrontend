import { Component, OnInit, Input, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DailyNutrientInterface } from 'src/app/core/models/daily-nutrient-interface';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { FoodInterface } from 'src/app/core/models/food-interface';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChangeDailyGoalComponent } from '../change-daily-goal/change-daily-goal.component';

@Component({
  selector: 'app-daily-nutr-overview',
  templateUrl: './daily-nutr-overview.component.html',
  styleUrls: ['./daily-nutr-overview.component.scss']
})
export class DailyNutrOverviewComponent implements OnInit, OnDestroy, OnChanges {
  /** The observable, that emits the new data if there is need for it */
  @Input()
  public dailyNutr$: Observable<DailyNutrientInterface>;
  public unsub$: Subject<boolean> = new Subject();

  @Output()
  public dailyGoalChanged: EventEmitter<[{name: string, amount: number, goal: number, diff: number}]> = new EventEmitter();

  /** The calculated calories for the view */
  public caloriesToday: number;
  public caloriesGoal: number;

  public displayedColumns: string[] = ['name', 'amount', 'goal', 'diff'];
  public tableData = new MatTableDataSource<any>([]);

  public date: Date;

  constructor(private matDialog: MatDialog) {
  }

  /**
   * On changes, whenever the input binding gets changed this gets triggered.
   * The observable gets set and whenever the observable itself gets changed it gets resubscribed.
   */
  ngOnChanges(changes) {
    if(changes['dailyNutr$'] && this.dailyNutr$) {
      this.dailyNutr$.pipe(
        takeUntil(this.unsub$)
      ).subscribe((dailyNutr) => {
        this.createDataTable(dailyNutr);
      });
    }
  }

  ngOnInit() {
  }

  /**
   * Helper function to build a table for the ma-table. It needs the current Daily Nutrients which will be
   * displayed in the table.
   *
   * @param dailyNutr DailyNutrientInterface
   */
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

  /**
   * Helper function to calculate the calories for the table.
   * 
   * @param foods FoodInterface[]
   */
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

  public openChangeGoalDialog() {
    const dialogRef = this.matDialog.open(ChangeDailyGoalComponent, {
      width: '80%',
      maxWidth: '30rem',
      data: this.tableData.data
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log({result});
      this.dailyGoalChanged.emit(result);
    });
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.unsubscribe();
  }
}
