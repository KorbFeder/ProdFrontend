import { createAction, props } from '@ngrx/store';
import { TodoInterface } from '../core/models/todo-interface';

/** The single load action triggered when a get requests only gets 1 todo */
export const LOADSINGLE = createAction('[todo] loadsingle', props<{todo: TodoInterface}>());

/** The load action gets triggered when there is a get request that fetches multiple todos */
export const LOAD = createAction('[todo] load', props<{todos: TodoInterface[]}>());

/** The add action gets triggered when  */
export const ADD = createAction('[todo] add', props<{todo: TodoInterface}>());

/** The edit action gets triggered when a patch/put/update happens, it will update one todo */
export const EDIT = createAction('[todo] edit', props<{todo: TodoInterface}>());

/** The remove action gets triggered if one todo gets delete, it will send the the id of the delete todo */
export const REMOVE = createAction('[todo] remove', props<{id: number}>());
