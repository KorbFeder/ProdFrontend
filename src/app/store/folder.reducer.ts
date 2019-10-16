import {createReducer, on, Action} from '@ngrx/store';
import {LOAD, EDIT, REMOVE, ADD, LOADSINGLE} from 'src/app/store/folder.actions';
import * as _ from 'lodash';
import { FolderInterface } from '../core/models/folder-interface';

interface iStateFold {
    folders: FolderInterface[];
}

export const initialState: iStateFold = {
    folders: []
};

/**
 * The todoReducer function. This function reacts if a certain action gets dispatched.
 * It is a pure function and with the _.cloneDeep function, there will always be a new state.
 */
const folderReducer = createReducer(initialState,
    on(LOADSINGLE, (state, loadedFolderContainer) => {
        const newState = _.cloneDeep(state);
        const newFolder = _.cloneDeep(loadedFolderContainer.folder);
        newState.folders = [...newState.folders, newFolder];
        return newState;
    }),
    on(LOAD, (state, newState) => {
        return _.cloneDeep(newState);
    }),
    on(EDIT, (state, editedFolderContainer) => {
        const folderState: iStateFold = _.cloneDeep(state);
        const index = folderState.folders.findIndex(x => x.id === editedFolderContainer.folder.id);
        folderState.folders[index] = _.cloneDeep(editedFolderContainer.folder);
        return folderState;
    }),
    on(REMOVE, (state, idContainer) => {
        const newState = _.cloneDeep(state);
        newState.folders = newState.folders.filter((folder) => folder.id !== idContainer.id);
        return newState;
    }),
    on(ADD, (state, addedTodoContainer) => {
        const newFolder: FolderInterface = _.cloneDeep(addedTodoContainer.folder);
        const newState = _.cloneDeep(state);
        newState.folders = [...newState.folders, newFolder];
        return newState;
    }),
);

export function folderRed(currState: iStateFold | undefined, action: Action) {
    return folderReducer(currState, action);
}
