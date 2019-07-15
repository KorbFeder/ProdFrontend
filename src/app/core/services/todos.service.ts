import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoInterface } from '../models/todo-interface';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

/**
 * This is a wrapper service for api service, so i can be switched out by any other database/service
 */
@Injectable({
  providedIn: 'root'
})
export class TodosService {
    constructor(private api: ApiService) { }

    /**
     * This method gets the todo/s, if the id is sent as an parameter, than the method will only return one 
     * todo-object, if no id is specified, than this method will send all todos.
     * It returns a TodoInterface.
     * 
     * @param id The id of todo
     */
    public get(id: string = null): Observable<TodoInterface> {
      if (id === null) {
        return this.api.get('/todos');
      } else {
        const httpParams: HttpParams = new HttpParams();
        httpParams.append('id', id);
        return this.api.get('/todos', httpParams);
      }
    }

    /**
     * This method saves a todo object into the database and returns the newly inserted todo as
     * TodoInterface.
     * 
     * @param todo The todo object, which should get saved
     */
    public save(todo: TodoInterface): Observable<TodoInterface> {
      return this.api.post('/todos', todo);
    }

    /**
     * This method updates a todo object and than returns the newly updated todo as TodoInterface.
     * 
     * @param todo The todo object, which should get updated
     */
    public update(todo: TodoInterface): Observable<TodoInterface> {
      return this.api.put('/todos', todo);
    }

    /**
     * This method deletes an todo object depending on the id which is given. The result is the id of the 
     * deleted todo if it succeeds.
     * 
     * @param id The id of the todo which has to get deleted
     */
    public delete(id: string): Observable<number> {
      const httpParams: HttpParams = new HttpParams();
      httpParams.append('id', id);
      return this.api.delete('/todos', httpParams);
    }


}
