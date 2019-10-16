import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-summaries-main',
  templateUrl: './summaries-main.component.html',
  styleUrls: ['./summaries-main.component.scss']
})
export class SummariesMainComponent implements OnInit {
  public folderId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.folderId = this.route.snapshot.paramMap.get('id');
  }

}
