import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SummeriesService } from 'src/app/core/services/summeries.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { SummariesInterface } from 'src/app/core/models/summaries-interface';

@Component({
  selector: 'app-summaries-main',
  templateUrl: './summaries-main.component.html',
  styleUrls: ['./summaries-main.component.scss']
})
export class SummariesMainComponent implements OnInit {
  public summaries$: Observable<SummariesInterface[]>;
  public folderId: string;

  constructor(
    private route: ActivatedRoute,
    private summariesService: SummeriesService,
    private store: Store<{summaries: SummariesInterface[]}>,
    private connection: ConnectionService
  ) {
    this.summaries$ = store.pipe(
      select('summaries'),
      map(result => result.summaries)
    );
    this.summaries$.subscribe();
  }

  ngOnInit() {
    this.folderId = this.route.snapshot.paramMap.get('id');
    this.connection.connected$.subscribe((connected) => {
      if (connected) {
        this.summariesService.get(this.folderId).subscribe();
      }
    });
  }

}
