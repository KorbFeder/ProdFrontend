import { Component, OnInit } from '@angular/core';
import { FitService } from 'src/app/core/services/fit.service';
import { TrainingsPlan } from 'src/app/core/models/trainings-plan-interface';

@Component({
  selector: 'app-fit',
  templateUrl: './fit.component.html',
  styleUrls: ['./fit.component.scss']
})
export class FitComponent implements OnInit {


  constructor(private fitService: FitService) { }

  ngOnInit() {
    const trainingsPlan: TrainingsPlan[] = [{
      phase: 1,
      dayNr: 1,
      muscle: 'muscle',
      exercise: 'excersize',
      amountOfSets: 3,
      repetitions: 3,
      pauseInbetween: 10,
      startingWeight: 50,
      repetitionsDone: [5, 4, 3],
      weightsUsed: [10, 20, 30]
    }];
    this.fitService.save(trainingsPlan).subscribe((res) => {
      console.log(res);
    });
  }

}
