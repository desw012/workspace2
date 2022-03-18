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
    payload : object
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
        default:
    }
    return state;
}

