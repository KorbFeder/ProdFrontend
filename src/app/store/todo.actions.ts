import { createAction, props } from '@ngrx/store';
import { TodoInterface } from '../core/models/todo-interface';

export const LOADSINGLE = createAction('[todo] loadsingle', props<{todo: TodoInterface}>());
export const LOAD = createAction('[todo] load', props<{todos: TodoInterface[]}>());
export const ADD = createAction('[todo] add', props<{todo: TodoInterface}>());
export const EDIT = createAction('[todo] edit', props<{todo: TodoInterface}>());
export const REMOVE = createAction('[todo] remove', props<{id: number}>());
