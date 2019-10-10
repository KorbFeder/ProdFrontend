import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { FolderInterface } from 'src/app/core/models/folder-interface';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss']
})
export class AddFolderComponent implements OnInit {
  public folder: FolderInterface;
  public headline = 'Add a new Folder';

  constructor(private bottomSheet: MatBottomSheetRef<AddFolderComponent>) { }

  ngOnInit() {
  }
  /**
   * This method gets triggered, when save button gets triggered, it will save the data to the store and
   * server and than close itself
   * 
   * @param value the data entered through the from
   */
  public addFolder(value: FolderInterface) {
    this.folder = value;
    this.bottomSheet.dismiss(this.folder);
  }
}
