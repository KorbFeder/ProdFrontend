import { createAction, props } from '@ngrx/store';
import { SummariesInterface } from '../core/models/summaries-interface';

/** The single load action triggered when a get requests only gets 1 summary */
export const LOADSINGLE = createAction('[summaries] loadsingle', props<{summaries: SummariesInterface}>());

/** The load action gets triggered when there is a get request that fetches multiple summaries */
export const LOAD = createAction('[summaries] load', props<{summaries: SummariesInterface[]}>());

/** The add action gets triggered when  */
export const ADD = createAction('[summaries] add', props<{summaries: SummariesInterface}>());

/** The edit action gets triggered when a patch/put/update happens, it will update one */
export const EDIT = createAction('[summaries] edit', props<{summaries: SummariesInterface}>());

/** The remove action gets triggered if one todo gets delete, it will send the the id of the delete */
export const REMOVE = createAction('[summaries] remove', props<{id: number}>());

