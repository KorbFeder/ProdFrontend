import { Component, OnInit } from '@angular/core';
import { TodoInterface } from 'src/app/models/todo-interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  private todos: TodoInterface[];

  constructor(private api: ApiService) {
    this.api.get('/todos').subscribe((todos) => {
      this.todos = todos;
    },
    (error) => {
      console.log(`An error has ocurred: ${error}`);
    });
  }

  ngOnInit() {
  }

}
