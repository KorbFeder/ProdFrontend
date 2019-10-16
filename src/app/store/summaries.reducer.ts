import {createReducer, on, Action} from '@ngrx/store';
import {LOAD, EDIT, REMOVE, ADD, LOADSINGLE} from 'src/app/store/summaries.actions';
import * as _ from 'lodash';
import { SummariesInterface } from '../core/models/summaries-interface';

/**
 * Reducer Function for ngrx store.
 * This holds the current state of the applications
 */

interface iStateSum {
    summaries: SummariesInterface[];
}

export const initialState: iStateSum = {
    summaries: []
};

const summariesReducer = createReducer(initialState,
    on(LOADSINGLE, (state, loadedSummariesContainer) => {
        const newState = _.cloneDeep(state);
        const newSummaries = _.cloneDeep(loadedSummariesContainer.summaries);
        newState.summaries = [...newState.summaries, newSummaries];
        return newState;
    }),
    on(LOAD, (state, newState) => {
        return _.cloneDeep(newState);
    }),
    on(EDIT, (state, editedSummariesContainer) => {
        const summariesState: iStateSum = _.cloneDeep(state);
        const index = summariesState.summaries.findIndex(x => x.id === editedSummariesContainer.summaries.id);
        summariesState.summaries[index] = _.cloneDeep(editedSummariesContainer.summaries);
        return summariesState;
    }),
    on(REMOVE, (state, idContainer) => {
        const newState = _.cloneDeep(state);
        newState.summaries = newState.summaries.filter((summary) => summary.id !== idContainer.id);
        return newState;
    }),
    on(ADD, (state, addedSummariesContainer) => {
        const newSummarie: SummariesInterface = _.cloneDeep(addedSummariesContainer.summaries);
        const newState = _.cloneDeep(state);
        newState.summaries = [...newState.summaries, newSummarie];
        return newState;
    }),
);

export function reducer(currState: iStateSum | undefined, action: Action) {
    return summariesReducer(currState, action);
}

