import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TodoInterface } from 'src/app/core/models/todo-interface';

@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.scss']
})
export class DeleteTodoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public todo: TodoInterface) { }

  ngOnInit() {
  }

}
