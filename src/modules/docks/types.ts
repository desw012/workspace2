import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type DocksAction = ActionType<typeof actions>;

export type Dock = {
	id : number,
	name : string
}

export type DocksState = {
	docks : Dock[]
}