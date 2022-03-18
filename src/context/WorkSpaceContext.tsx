import React, {Component, useReducer} from "react";
import {CntReducer, initialState} from "../reducers/CntReducer";
import {WindowsReducer, WindowsReducerInitialState} from "../reducers/WindowsReducer";
import {Window} from "../features/windows/Window";

const defaultValue = {
    createWindow : () => { }
}

export interface WorkSpaceContextProps{
    children?: React.ReactNode
}

export const WorkSpaceContext = React.createContext(defaultValue);

export function WorkSpaceContextComponent(props: WorkSpaceContextProps){
    const [windowsState, dispatch] =  useReducer(WindowsReducer, WindowsReducerInitialState);

    const createWindow = () => {
        dispatch({
            type: 'create',
            payload: { }
        });
    }

    return (
        <WorkSpaceContext.Provider value={{
            createWindow: createWindow
        }}>
            {windowsState.windows.map((props, idx)=><Window idx={props.idx} key={props.idx} />) }
        </WorkSpaceContext.Provider>
    )
}