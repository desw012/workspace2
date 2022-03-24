import React, {Component, useReducer, useState} from "react";
import {CntReducer, initialState} from "../reducers/CntReducer";
import {WindowsReducer, WindowsReducerInitialState} from "../reducers/WindowsReducer";
import {Window} from "../features/windows/Window";

const defaultValue = {
    createWindow : () => { }
    , closeWindow : ( idx : number ) => { }
    , isContentDim : false
    , setContentDim : ( isDim : boolean ) => { }
}

export interface WorkSpaceContextProps{
    children?: React.ReactNode
}

export const WorkSpaceContext = React.createContext(defaultValue);

export function WorkSpaceContextComponent(props: WorkSpaceContextProps){
    const [windowsState, dispatch] =  useReducer(WindowsReducer, WindowsReducerInitialState);
    const [isContentDim, setContentDim] = useState<boolean>(false);

    const createWindow = () => {
        dispatch({
            type: 'create',
            payload: { }
        });
    }

    const closeWindow = ( idx : number ) => {
        dispatch({
            type: 'close',
            payload: { idx : idx }
        });
    }

    return (
        <WorkSpaceContext.Provider value={{
            createWindow: createWindow
            , closeWindow : closeWindow
            , isContentDim : isContentDim
            , setContentDim : setContentDim
        }}>
            {
                windowsState.windows.map((props, idx)=>
                    <Window
                        idx={props.idx}
                        key={props.idx}
                    />)
            }
            {props.children}
        </WorkSpaceContext.Provider>
    )
}