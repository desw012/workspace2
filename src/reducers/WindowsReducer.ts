import {initialState} from "./CntReducer";


export interface WindowsState{
    idx : number
    windows : Array<WindowProps>
}

export interface WindowProps{
    idx : number
}

interface Action {
    type: string,
    payload : any
}

export const WindowsReducerInitialState = {
    idx : 0,
    windows : []
};

export function WindowsReducer(state : WindowsState, action : Action ) : WindowsState{
    switch (action.type){
        case 'create':
            const idx = state.idx + 1;
            const windows : WindowProps = {
                idx : idx
            }
            return {
                idx : idx, windows : [...state.windows, windows]
            }
        case 'close':
            const windows2 = state.windows.filter( window => window.idx !== action.payload.idx )
            return {
                idx : state.idx, windows : windows2
            }
        default:
    }
    return state;
}

