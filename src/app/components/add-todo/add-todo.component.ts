import { Component, OnInit, Inject } from '@angular/core';
import { TodosService } from 'src/app/core/services/todos.service';
import { TodoInterface } from 'src/app/core/models/todo-interface';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

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
  public importanceStats: string[];
  public todo: TodoInterface;
  public headline = 'New Todo';
  public file: File = null;

  constructor(private todoService: TodosService,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              private bottomSheet: MatBottomSheetRef<AddTodoComponent>) {
    this.importanceStats = data.importance;
    if (data.todo) {
      this.headline = 'Edit Todo';
      this.todo = data.todo;
    }
  }

  ngOnInit() {
  }

  public onFileSelected(event) {
    this.file = event.target.files[0];
  }


  /**
   * This method gets triggered, when save button gets triggered, it will save the data to the store and
   * server and than close itself
   * 
   * @param value the data entered through the from
   */
  public addTodo(value: {importance: number, todoMsg: string, endDate: Date, details: string}) {
    const tmp = {isDone: false};
    if (this.importanceStats.indexOf("Done") === value.importance) {
      tmp.isDone = true;
    }
    const todo: TodoInterface = Object.assign(tmp, value);
    todo.details = todo.details === '' ? null : todo.details;
    todo.endDate = <any>todo.endDate === '' ? null : todo.endDate;
    if(this.todo) {
      todo.id = this.todo.id;
    }
    this.bottomSheet.dismiss({todo, file: this.file});
  }
}
