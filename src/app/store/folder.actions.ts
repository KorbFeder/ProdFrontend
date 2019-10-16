import { createAction, props } from '@ngrx/store';
import { FolderInterface } from '../core/models/folder-interface';

/** The single load action triggered when a get requests only gets 1  */
export const LOADSINGLE = createAction('[folder] loadsingle', props<{folder: FolderInterface}>());

/** The load action gets triggered when there is a get request that fetches multiple */
export const LOAD = createAction('[folder] load', props<{folders: FolderInterface[]}>());

/** The add action gets triggered when  */
export const ADD = createAction('[folder] add', props<{folder: FolderInterface}>());

/** The edit action gets triggered when a patch/put/update happens, it will update one */
export const EDIT = createAction('[folder] edit', props<{folder: FolderInterface}>());

/** The remove action gets triggered if one todo gets delete, it will send the the id of the delete */
export const REMOVE = createAction('[folder] remove', props<{id: number}>());

