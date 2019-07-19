import {createReducer, on, Action} from '@ngrx/store';
import {LOAD, EDIT, REMOVE, ADD, LOADSINGLE} from 'src/app/store/todo.actions';
import { TodoInterface } from '../core/models/todo-interface';
import * as _ from 'lodash';

/**
 * Reducer Function for ngrx store.
 * This holds the current state of the applications todos
 */


 /**
  * The iState is the Object which is in the todo store, this will also be the Object which will be 
  * retrieved.
  */
interface iState {
    todos: TodoInterface[];
}

/**
 * The initial state, when the store gets started the first time, than the todo array is empty.
 * But it will be filled as soon as there is a action on the reducer.
 */
export const initialState: iState = {
    todos: []
};

/**
 * The todoReducer function. This function reacts if a certain action gets dispatched.
 * It is a pure function and with the _.cloneDeep function, there will always be a new state.
 */
const todoReducer = createReducer(initialState,
    on(LOADSINGLE, (state, loadedTodoContainer) => {
        const newState = _.cloneDeep(state);
        const newTodo = _.cloneDeep(loadedTodoContainer.todo);
        newState.todos = [...newState.todos, newTodo];
        return newState;
    }),
    on(LOAD, (state, newState) => {
        return _.cloneDeep(newState);
    }),
    on(EDIT, (state, editedTodoContainer) => {
        const todoState: iState = _.cloneDeep(state);
        todoState.todos.forEach((todo) => {
            if (todo.id === editedTodoContainer.todo.id) {
                return _.cloneDeep(editedTodoContainer.todo);
            }
        });
        return todoState;
    }),
    on(REMOVE, (state, idContainer) => {
        const newState = _.cloneDeep(state);
        newState.todos = newState.todos.filter((todo) => todo.id !== idContainer.id);
        return newState;
    }),
    on(ADD, (state, addedTodoContainer) => {
        const newTodo: TodoInterface = _.cloneDeep(addedTodoContainer.todo);
        const newState = _.cloneDeep(state);
        newState.todos = [...newState.todos, newTodo];
        return newState;
    }),
);

export function reducer(currState: iState | undefined, action: Action) {
    return todoReducer(currState, action);
}
