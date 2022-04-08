import { DocksState, DocksAction } from "./types";
import { createReducer } from 'typesafe-actions'
import { ADD_DOCK } from './actions'

const initialState: DocksState = {
	docks : []
};

const reducer = createReducer<DocksState, DocksAction>(initialState, {
	[ADD_DOCK] : (state , action) => {
		console.log(action);
		return {...state};
	},
});

export default reducer;