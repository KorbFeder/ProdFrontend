import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/core/services/todos.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  constructor(private todoService: TodosService) { }

  ngOnInit() {

  }

}
