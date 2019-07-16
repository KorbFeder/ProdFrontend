import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  saveTodoSettings(formValue) {
    //todo -> save settings in database
    this.snackbar.open('The todo-settings where saved', '', {duration: 2000});
  }
}
