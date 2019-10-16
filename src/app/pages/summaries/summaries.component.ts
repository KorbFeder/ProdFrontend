import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { AddFolderComponent } from 'src/app/components/add-folder/add-folder.component';
import { FolderInterface } from 'src/app/core/models/folder-interface';

@Component({
  selector: 'app-summaries',
  templateUrl: './summaries.component.html',
  styleUrls: ['./summaries.component.scss']
})
export class SummariesComponent implements OnInit {
  folders: FolderInterface;

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }

  /**
   * This gets triggered when the add-Folder button is pressed.
   * An bottom sheet will get opened where the todo information should get entered, than there will be a
   * new todo added to the store.
   */
  public addFolder() {
    const ref = this.bottomSheet.open(AddFolderComponent);
    ref.afterDismissed().subscribe((response) => {
      if (response) {
        console.log(response);
      }
    });
  }


}
