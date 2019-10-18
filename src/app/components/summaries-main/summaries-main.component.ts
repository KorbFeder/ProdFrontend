import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SummeriesService } from 'src/app/core/services/summeries.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { SummariesInterface } from 'src/app/core/models/summaries-interface';
import { FolderInterface } from 'src/app/core/models/folder-interface';
import { FolderService } from 'src/app/core/services/folder.service';
import { MatDialog } from '@angular/material';
import { DeleteSummaryComponent } from '../delete-summary/delete-summary.component';

@Component({
  selector: 'app-summaries-main',
  templateUrl: './summaries-main.component.html',
  styleUrls: ['./summaries-main.component.scss']
})
export class SummariesMainComponent implements OnInit {
  public summaries$: Observable<SummariesInterface[]>;
  public folderId: string;
  public folder: FolderInterface;

  public edit = false;
  public editFolderName = false;
  public enterName = false;
  public editor = '<p> inital value</p>';
  public currentSummary: SummariesInterface;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private summariesService: SummeriesService,
    private folderService: FolderService,
    private store: Store<{summaries: SummariesInterface[]}>,
    private connection: ConnectionService,
    private matDialog: MatDialog
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
        this.folderService.get(this.folderId).subscribe((res) => {
          this.folder = res[0];
        });
      }
    });
    this.currentSummary = {
      folderId: +this.folderId,
      topic: null,
      content: null,
    };
  }

  public addSummary(name: string) {
    const summary: SummariesInterface = {
      folderId: +this.folderId,
      topic: name,
      content: '',
    };
    this.enterName = false;
    this.summariesService.save(summary).subscribe();
  }

  public summaryChosen(summary: SummariesInterface) {
    this.currentSummary = summary;
  }

  public saveSummary() {
    this.edit = !this.edit;
    this.summariesService.update(this.currentSummary).subscribe();
  }

  public deleteSummary() {
    const dialogRef = this.matDialog.open(DeleteSummaryComponent, {
      width: '80%',
      maxWidth: '30rem',
      data: {
        type: 'Summary',
        message: this.currentSummary.topic
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.summariesService.delete(this.currentSummary.id).subscribe();
        this.currentSummary = {
          folderId: +this.folderId,
          topic: null,
          content: null,
        };
      }
    });
  }

  public deleteFolder() {
    const dialogRef = this.matDialog.open(DeleteSummaryComponent, {
      width: '80%',
      maxWidth: '30rem',
      data: {
        type: 'Folder',
        message: this.folder.name
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.folderService.delete(this.folder.id).subscribe();
        this.router.navigate(['/summaries']);
      }
    });
  }

  public changedFolderName() {
    this.editFolderName = !this.editFolderName;
    this.folderService.update(this.folder).subscribe();
  }
}
