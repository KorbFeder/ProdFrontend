import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summaries',
  templateUrl: './summaries.component.html',
  styleUrls: ['./summaries.component.scss']
})
export class SummariesComponent implements OnInit {
  folders: string[] = ["Hallo", "welt"];

  constructor() { }

  ngOnInit() {
  }

}
