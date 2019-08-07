import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-change-daily-goal',
  templateUrl: './change-daily-goal.component.html',
  styleUrls: ['./change-daily-goal.component.scss']
})
export class ChangeDailyGoalComponent {

  constructor(public dialogRef: MatDialogRef<ChangeDailyGoalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

}
