import { Component, OnInit } from '@angular/core';
import { FitService } from 'src/app/core/services/fit.service';
import { TrainingsPlan } from 'src/app/core/models/trainings-plan-interface';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material';
import { AddFitRowComponent } from 'src/app/components/add-fit-row/add-fit-row.component';

@Component({
  selector: 'app-fit',
  templateUrl: './fit.component.html',
  styleUrls: ['./fit.component.scss']
})
export class FitComponent implements OnInit {
  public phase: number = null;
  public dayNr: number = null;
  public data: TrainingsPlan[];
  public displayedColumns: string[] = [
    'muscle', 'exercise', 'amountOfSets', 'repetitions', 
    'pauseInbetween', 'startingWeight', 'repetitionsDone',
    'weightsUsed'
  ];


  constructor(
    private fitService: FitService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.fitService.get('1', '1').subscribe((res) => {
      this.data = res;
    });
  }

  public addTrainingsPlanRow() {
    const ref = this.bottomSheet.open(AddFitRowComponent, {data: {phase: this.phase, dayNr: this.dayNr}});
    ref.afterDismissed().subscribe((response) => {
      if(response) {
        console.log(response);
      }
    })
  }
}
