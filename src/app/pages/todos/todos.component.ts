import { Component, OnInit } from '@angular/core';
import { TodoInterface } from 'src/app/core/models/todo-interface';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { AddTodoComponent } from 'src/app/components/add-todo/add-todo.component';
import { TodosService } from 'src/app/core/services/todos.service';
import { DeleteTodoComponent } from 'src/app/components/delete-todo/delete-todo.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public todos: TodoInterface[];

  constructor(private todoService: TodosService,
              private bottomSheet: MatBottomSheet,
              private matDialog: MatDialog) {
    this.todoService.get().subscribe((todos) => {
      this.todos = todos;
    },
    (error: any) => {
      console.log(`An error has ocurred: ${error}`);
    });
  }

  ngOnInit() {
  }

  public addTodo() {
    this.bottomSheet.open(AddTodoComponent);
  }

  public deleteTodo(todo) {
    const dialogRef = this.matDialog.open(DeleteTodoComponent, {
      width: '80%',
      maxWidth: '450px',
      data: todo.todoMsg,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.todoService.delete(todo.id).subscribe((result) => {
          console.log(result);
        });
      }
    });
  }
}
