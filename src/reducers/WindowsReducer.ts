import {BoxStyles, defaultBoxStyles, ResizeMode} from "../features/box/Box";
import {Rectangle} from "../features/box/Rect";

export interface WindowInfo {
    id : number,
    url : string,
    boxStyles : BoxStyles
}

export interface CreateWindowAction {
    type: 'create'
    payload : {
        url : string
    }
}

export interface UpdateRectAction {
    type: 'update-rect'
    payload : {
        id : number,
        rect : Rectangle,
        resizeMode : ResizeMode
    }
}

interface WindowAction {
    type: string,
    payload : number
}

export type WindowActions =  CreateWindowAction | WindowAction | UpdateRectAction;

export const WindowsReducerInitialState = []

let g_id = 0;
let g_zIndex = 0;

export function WindowsReducer(state : Array<WindowInfo>, action : WindowActions ) : Array<WindowInfo>{
    switch (action.type){
        case 'create':
            return doCreateWindow(state, action as CreateWindowAction);
        case 'close':
            return doCloseWindow(state, action as WindowAction);
        case 'focus':
            return doFocusWindow(state, action as WindowAction);
        case 'update-rect':
            return doUpdateWindowRect(state, action as UpdateRectAction)
        default:
    }
    return state;
}

const doCreateWindow = (state : Array<WindowInfo>, action : CreateWindowAction) => {
    const id = ++g_id;
    const url = action.payload.url;
    const windows : WindowInfo = {
        id : id,
        url : url,
        boxStyles : {...defaultBoxStyles, zIndex : ++g_zIndex}
    }

    return [...state, windows]
}

const doCloseWindow = (state : Array<WindowInfo>, action : WindowAction) => {
    return state.filter( window => window.id !== action.payload )
}

const doFocusWindow = (state : Array<WindowInfo>, action : WindowAction) : Array<WindowInfo> => {
    return state.map( window => {
        if(window.id === action.payload){
            return {
                ...window,
                boxStyles : {
                    ...window.boxStyles,
                    zIndex : ++g_zIndex
                }

            }
        }
        return window
    });
}

const doUpdateWindowRect = (state : Array<WindowInfo>, action : UpdateRectAction) : Array<WindowInfo> => {
    return state.map( window => {
        if(window.id === action.payload.id){
            return {
                ...window,
                boxStyles : {
                    ...window.boxStyles,
                    rect : action.payload.rect,
                    prevRect : {
                        ...window.boxStyles.rect,
                        x : window.boxStyles.rect.x > -1 ? window.boxStyles.rect.x : 0,
                        y : window.boxStyles.rect.y > -1 ? window.boxStyles.rect.y : 0
                    },
                    resizeMode : action.payload.resizeMode
                }

            }
        }
        return window
    });
}

export const createWindow = (url : string) : CreateWindowAction  => {
    return {
        type : 'create',
        payload : {
            url : url
        }
    }
}

export const closeWindow = (id : number) : WindowAction => {
    return {
        type : 'close',
        payload : id
    }
}

export const focusWindow = (id : number) : WindowAction => {
    return {
        type : 'focus',
        payload : id
    }
}

export const updateWindowRect = (id : number, rect: Rectangle, resizeMode? : ResizeMode) : UpdateRectAction => {
    return{
        type : 'update-rect',
        payload : {
            id : id,
            rect : rect,
            resizeMode : resizeMode
        }
    }
}
