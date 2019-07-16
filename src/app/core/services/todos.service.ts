import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoInterface } from '../models/todo-interface';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { LOAD, LOADSINGLE, ADD, EDIT, REMOVE } from 'src/app/store/todo.actions';

/**
 * This is a wrapper service for api service, so i can be switched out by any other database/service
 */
@Injectable({
  providedIn: 'root'
})
export class TodosService {
    constructor(private api: ApiService,
                private store: Store<{todos: TodoInterface[]}>) { }

    /**
     * This method gets the todo/s, if the id is sent as an parameter, than the method will only return one 
     * todo-object, if no id is specified, than this method will send all todos.
     * It returns a TodoInterface.
     * 
     * @param id The id of todo
     */
    public get(id: string = null): Observable<TodoInterface[]> {
      if (id === null) {
        return this.api.get('/todos').pipe(
          tap((result: TodoInterface[]) => this.store.dispatch(LOAD({todos: result})))
        );
      } else {
        const httpParams: HttpParams = new HttpParams();
        return this.api.get(`/todos/${id}`).pipe(
          tap((result: TodoInterface[]) => this.store.dispatch(LOADSINGLE({todo: result[0]})))
        );
      }
    }

    /**
     * This method saves a todo object into the database and returns the newly inserted todo as
     * TodoInterface.
     * 
     * @param todo The todo object, which should get saved
     */
    public save(todo: TodoInterface): Observable<TodoInterface[]> {
      return this.api.post('/todos', todo).pipe(
        tap((result: TodoInterface[]) => this.store.dispatch(ADD({todo: result[0]})))
      );
    }

    /**
     * This method updates a todo object and than returns the newly updated todo as TodoInterface.
     * 
     * @param todo The todo object, which should get updated
     */
    public update(todo: TodoInterface): Observable<TodoInterface[]> {
      return this.api.put('/todos', todo).pipe(
        tap((result: TodoInterface[]) => this.store.dispatch(EDIT({todo: result[0]})))
      );
    }

    /**
     * This method deletes an todo object depending on the id which is given. The result is the id of the 
     * deleted todo if it succeeds.
     * 
     * @param id The id of the todo which has to get deleted
     */
    public delete(id: string): Observable<number> {
      if (!id) {
        throw new Error(`The delete method needs an id: ${id}`);
      }
      return this.api.delete(`/todos/${id}`).pipe(
        tap((result) => this.store.dispatch(REMOVE({id: result.body})))
      );
    }


}
