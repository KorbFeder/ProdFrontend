import { Component, OnInit } from '@angular/core';
import { TodoInterface } from 'src/app/core/models/todo-interface';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { AddTodoComponent } from 'src/app/components/add-todo/add-todo.component';
import { TodosService } from 'src/app/core/services/todos.service';
import { DeleteTodoComponent } from 'src/app/components/delete-todo/delete-todo.component';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public todos$: Observable<TodoInterface[]>;
  public importanceStates: string[] = ['Very urgent', 'In the next view days', 'Someday', 'Done'];

  constructor(private todoService: TodosService,
              private bottomSheet: MatBottomSheet,
              private matDialog: MatDialog,
              private store: Store<{todos: TodoInterface[]}>) {
    this.todos$ = store.pipe(
      select('todos'),
      map(result => result.todos)
    );
    this.todos$.subscribe();
    this.todoService.get().subscribe();
  }

  ngOnInit() {
  }

  /**
   * This gets triggered when the add-Todo button is pressed.
   * An bottom sheet will get opened where the todo information should get entered, than there will be a
   * new todo added to the store.
   */
  public addTodo() {
    this.bottomSheet.open(AddTodoComponent, {data: this.importanceStates});
  }

  /**
   * This gets triggered when the trashcan gets clicked This will open a dialog which asks the user
   * if he really wants to delete it an than delete the todo form the store.
   * 
   * @param todo the todo which gets deleted
   */
  public deleteTodo(todo) {
    const dialogRef = this.matDialog.open(DeleteTodoComponent, {
      width: '80%',
      maxWidth: '30rem',
      data: todo.todoMsg,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.todoService.delete(todo.id).subscribe();
      }
    });
  }
}
