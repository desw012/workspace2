import React, {useEffect, useReducer} from "react";
import {DockBar} from "../features/dock/DockBar";

const defaultValue = {
    addDock : () => { },
    removeDock : () => { }
}

export interface DockContextComponentProps{
    children?: React.ReactNode
}

export const DockContext = React.createContext(defaultValue)

export function DockContextComponent(props: DockContextComponentProps){
    //const [dockState, dispatch] = useReducer();


    useEffect(()=>{

    })

    const addDock = () => {

    }

    const removeDock = () => {

    }

    return (
        <DockContext.Provider value={{
            addDock: addDock
            ,removeDock: removeDock
        }} >
            <DockBar></DockBar>
            {props.children}
        </DockContext.Provider>
    )
}