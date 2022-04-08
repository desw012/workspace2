import { createReducer } from 'typesafe-actions'
import {WindowsAction, WindowsState} from "./types";
import {CREATE_WINDOW} from "./actions";

const initialState: WindowsState = [];

const reducer = createReducer<WindowsState, WindowsAction>(initialState, {
	[CREATE_WINDOW] : (state, action) => {
		return {...state};
	},
});

export default reducer;