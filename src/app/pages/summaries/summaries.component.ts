import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { AddFolderComponent } from 'src/app/components/add-folder/add-folder.component';
import { FolderInterface } from 'src/app/core/models/folder-interface';
import { FolderService } from 'src/app/core/services/folder.service';
import { Store, select } from '@ngrx/store';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-summaries',
  templateUrl: './summaries.component.html',
  styleUrls: ['./summaries.component.scss']
})
export class SummariesComponent implements OnInit, OnDestroy {
  folders$: Observable<FolderInterface>;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private bottomSheet: MatBottomSheet,
    private folderService: FolderService,
    private store: Store<{folder: FolderInterface[]}>,
    private connection: ConnectionService
  ) {
    this.folders$ = store.pipe(
      select('folder'),
      map(result => result.folders)
    );
    this.folders$.subscribe();
    this.connection.connected$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((connected) => {
      if (connected) {
        this.folderService.get().subscribe();
      }
    });
  }

  ngOnInit() {

  }
  

  /**
   * This gets triggered when the add-Folder button is pressed.
   * An bottom sheet will get opened where the todo information should get entered, than there will be a
   * new todo added to the store.
   */
  public addFolder() {
    const ref = this.bottomSheet.open(AddFolderComponent);
    ref.afterDismissed().subscribe((response: FolderInterface) => {
      if (response) {
        this.folderService.save(response).subscribe();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
