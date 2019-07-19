import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoInterface } from 'src/app/core/models/todo-interface';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  @Input()
  todo: TodoInterface;

  @Output()
  deletedTodo = new EventEmitter<TodoInterface>();

  @Output()
  checkedTodo = new EventEmitter<TodoInterface>();

  constructor() { }

  ngOnInit() {
  }

}
