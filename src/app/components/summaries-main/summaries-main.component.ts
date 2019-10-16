import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SummeriesService } from 'src/app/core/services/summeries.service';
import { FolderInterface } from 'src/app/core/models/folder-interface';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConnectionService } from 'src/app/core/services/connection.service';

@Component({
  selector: 'app-summaries-main',
  templateUrl: './summaries-main.component.html',
  styleUrls: ['./summaries-main.component.scss']
})
export class SummariesMainComponent implements OnInit {
  public folders$: Observable<FolderInterface[]>;
  public folderId: string;

  constructor(
    private route: ActivatedRoute,
    private summariesService: SummeriesService,
    private store: Store<{folder: FolderInterface[]}>,
    private connection: ConnectionService
  ) {
    this.folders$ = store.pipe(
      select('folder'),
      map(result => result.folder)
    );
    this.folders$.subscribe();
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
