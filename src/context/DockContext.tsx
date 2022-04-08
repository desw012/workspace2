import React, {useEffect, useReducer} from "react";
import {DockBar} from "../features/dock/DockBar";
import {DockItemInfo, DockReducer, DockState, updateDefaultDockItems} from "../reducers/docks";
import {closeWindow, createWindow, focusWindow} from "../reducers/WindowsReducer";

const defaultDockApiValue = {
    addDock : () => { },
    removeDock : () => { }
}

const defaultDockStateValue = {
    defaultDockItems : [],
    dockItems : []
}

export interface DockContextComponentProps{
    children?: React.ReactNode
}

export const DockApiContext = React.createContext(defaultDockApiValue)
export const DockStateContext = React.createContext<{
    defaultDockItems : Array<DockItemInfo>,
    dockItems : Array<DockItemInfo>
}>(defaultDockStateValue)

const ReducerInitialState : DockState = {
    defaultDockItems : [],
    dockItems : []
}

export function DockContextComponent(props: DockContextComponentProps){
    const [dockState, dispatch] = useReducer(DockReducer, ReducerInitialState);

    useEffect(()=>{
        fetch('workspace/dock/api/docks')
            .then(value => value.json())
            .then((value : Array<DockItemInfo>) =>{
                dispatch(updateDefaultDockItems(value));
            });
    }, []);

    useEffect(()=>{
        const messageHandler = (e : any)=>{
            if (e.origin === window.location.origin && e.data) {
                switch (e.data.type ){
                    case 'dashboard.show' :
                        console.log(e.data);
                        break;
                }
            }
        }

        window.addEventListener('message', messageHandler)
        return ()=>{window.removeEventListener('message', messageHandler);}
    }, [])

    const addDock = () => {

    }

    const removeDock = () => {

    }

    return (
        <DockApiContext.Provider value={{
            addDock: addDock
            ,removeDock: removeDock
        }} >
            <DockStateContext.Provider value={{
                defaultDockItems: dockState.defaultDockItems,
                dockItems: dockState.dockItems
            }}>
                <DockBar></DockBar>
            </DockStateContext.Provider>
            {props.children}
        </DockApiContext.Provider>
    )
}