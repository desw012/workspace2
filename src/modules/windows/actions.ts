import { createAction } from 'typesafe-actions';
import { Window } from './types';

export const CREATE_WINDOW = 'windows/CREATE_WINDOW';
export const CLOSE_WINDOW = 'windows/CLOSE_WINDOW';
export const FOCUS_WINDOW = 'windows/FOCUS_WINDOW';

let nextId = 1;

export const createWindow = createAction(CREATE_WINDOW)<Window>();

//export const removeWindow = createAction(CLOSE_WINDOW)<number>();

//export const focusWindow = createAction(FOCUS_WINDOW)<number>();