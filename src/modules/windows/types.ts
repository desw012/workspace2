import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type WindowsAction = ActionType<typeof actions>;

export type ResizeMode = 'minimum' | 'maximum' | 'dock' | undefined | null;

export type Rectangle = {
	x : number,
	y : number,
	w : number,
	h : number
}

export type WindowStyle = {
	zIndex : number
	rect : Rectangle,
	prevRect? : Rectangle,
	resizeMode : ResizeMode
}

export type Window = {
	id: number
	title? : string
	boxStyles?: WindowStyle
}

export type WindowsState = Window[];