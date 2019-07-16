import { Component, OnInit } from '@angular/core';
import { TodoInterface } from 'src/app/core/models/todo-interface';
import { MatBottomSheet } from '@angular/material';
import { AddTodoComponent } from 'src/app/components/add-todo/add-todo.component';
import { TodosService } from 'src/app/core/services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public todos: TodoInterface[];

  constructor(private todoService: TodosService,
              private bottomSheet: MatBottomSheet) {
    this.todoService.get().subscribe((todos) => {
      this.todos = todos;
    },
    (error: any) => {
      console.log(`An error has ocurred: ${error}`);
    });
  }

  public addTodo() {
    this.bottomSheet.open(AddTodoComponent);
  }

  ngOnInit() {
  }

}
