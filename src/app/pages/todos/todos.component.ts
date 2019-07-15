import { Component, OnInit } from '@angular/core';
import { TodoInterface } from 'src/app/core/models/todo-interface';
import { ApiService } from 'src/app/core/services/api.service';
import { MatBottomSheet } from '@angular/material';
import { AddEventComponent } from 'src/app/components/add-event/add-event.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public todos: TodoInterface[];

  constructor(private api: ApiService,
              private bottomSheet: MatBottomSheet) {
    this.api.get('/todos').subscribe((todos) => {
      this.todos = todos;
    },
    (error) => {
      console.log(`An error has ocurred: ${error}`);
    });
  }

  public addTodo() {
    this.bottomSheet.open(AddEventComponent);
  }

  ngOnInit() {
  }

}
