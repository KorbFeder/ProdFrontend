import {createReducer, on, Action} from '@ngrx/store';
import {LOAD, EDIT, REMOVE, ADD, LOADSINGLE} from 'src/app/store/todo.actions';
import { TodoInterface } from '../core/models/todo-interface';
import * as _ from 'lodash';

interface iState {
    todos: TodoInterface[];
}

export const initialState: iState = {
    todos: []
};

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
        console.log(idContainer.id);
        newState.todos = newState.todos.filter((todo) => todo.id !== idContainer.id);
        console.log(newState.todos);
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
