import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/core/services/todos.service';
import { TodoInterface } from 'src/app/core/models/todo-interface';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  /** The 3 importance states of a todo */
  public importanceStats: string[] = ["Someday", "Next view days", "Very urgent"];

  constructor(private todoService: TodosService,
              private bottomSheet: MatBottomSheetRef<AddTodoComponent>) {
  }

  ngOnInit() {

  }

  public addTodo(value: {importance: number, todoMsg: string, endDate: Date}) {
    const tmp = {isDone: 0};
    const todo: TodoInterface = Object.assign(tmp, value);
    todo.endDate = <any>todo.endDate === '' ? null : todo.endDate;
    console.log(todo);
    this.todoService.save(todo).subscribe((result) => {
      console.log(JSON.stringify(result));
    });
    this.bottomSheet.dismiss();
  }
}
