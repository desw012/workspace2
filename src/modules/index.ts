import { combineReducers } from 'redux';
import docks from './docks';
import windows from './windows';

const rootReducer = combineReducers({
	docks
	,windows
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;