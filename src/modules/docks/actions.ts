import { createAction } from 'typesafe-actions';
import {Dock} from "./types";


export const ADD_DOCK = 'todos/ADD_DOCK';
export const REMOVE_DOCK = 'todos/ADD_REMOVE';

let nextId = 1;

export const addDock = createAction(ADD_DOCK)<Dock>();