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
    'pauseInbetween', 'startingWeight', 'repetition',
    'weightUsed'
  ];

  constructor(
    private fitService: FitService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {

  }

  public getTables() {
    if (this.phase !== null && this.dayNr !== null) {
      this.fitService.get(this.phase.toString(), this.dayNr.toString()).subscribe((res) => {
        this.data = res;
      });
    }
  }

  public addTrainingsPlanRow() {
    const ref = this.bottomSheet.open(AddFitRowComponent, {data: {phase: this.phase, dayNr: this.dayNr}});
    ref.afterDismissed().subscribe((response) => {
      if (response) {
        const newRow: TrainingsPlan[] = [{
          amountOfSets: response.amountOfSets,
          dayNr: response.dayNr,
          exercise: response.exercise,
          muscle: response.muscle,
          pauseInbetween: response.pause,
          phase: response.phase,
          repetitions: response.repetitions,
          startingWeight: response.startingWeight,
          repetition: [],
          weightUsed: []
        }];
        this.fitService.save(newRow).subscribe((response) => {
          this.data = response;
        });
      }
    });
  }
}
