import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/core/services/todos.service';
import { TodoInterface } from 'src/app/core/models/todo-interface';
import { MatBottomSheetRef } from '@angular/material';

/**
 * The bottom sheet component, that gets opened when the user tries to add a todo
 */
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

  /**
   * This method gets triggered, when save button gets triggered, it will save the data to the store and
   * server and than close itself
   * 
   * @param value the data entered through the from
   */
  public addTodo(value: {importance: number, todoMsg: string, endDate: Date}) {
    const tmp = {isDone: 0};
    const todo: TodoInterface = Object.assign(tmp, value);
    todo.endDate = <any>todo.endDate === '' ? null : todo.endDate;
    this.todoService.save(todo).subscribe();
    this.bottomSheet.dismiss();
  }
}
