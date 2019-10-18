import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-summary',
  templateUrl: './delete-summary.component.html',
  styleUrls: ['./delete-summary.component.scss']
})
export class DeleteSummaryComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {type: string, message: string}) { }

  ngOnInit() {
  }

}
