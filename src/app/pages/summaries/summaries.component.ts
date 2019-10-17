import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { AddFolderComponent } from 'src/app/components/add-folder/add-folder.component';
import { FolderInterface } from 'src/app/core/models/folder-interface';
import { FolderService } from 'src/app/core/services/folder.service';
import { Store, select } from '@ngrx/store';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-summaries',
  templateUrl: './summaries.component.html',
  styleUrls: ['./summaries.component.scss']
})
export class SummariesComponent implements OnInit {
  folders$: Observable<FolderInterface>;

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
  }

  ngOnInit() {
    this.connection.connected$.subscribe((connected) => {
      if (connected) {
        this.folderService.get().subscribe();
      }
    });
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


}
