import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoInterface } from 'src/app/core/models/todo-interface';
import { TodosService } from 'src/app/core/services/todos.service';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  public open = false;

  @Input()
  todo: TodoInterface;

  @Output()
  deletedTodo = new EventEmitter<any>();

  @Output()
  editedTodo = new EventEmitter<any>();

  @Output()
  doneTodo = new EventEmitter<any>();

  constructor(private todoService: TodosService) { }

  ngOnInit() {}

}
