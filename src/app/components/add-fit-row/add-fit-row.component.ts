import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-add-fit-row',
  templateUrl: './add-fit-row.component.html',
  styleUrls: ['./add-fit-row.component.scss']
})
export class AddFitRowComponent implements OnInit {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheet: MatBottomSheetRef<AddFitRowComponent>
  ) { }

  public addFitRow(formData) {
    formData.phase = this.data.phase;
    formData.dayNr = this.data.dayNr;
    this.bottomSheet.dismiss(formData);
  }

  ngOnInit() {
  }

}
