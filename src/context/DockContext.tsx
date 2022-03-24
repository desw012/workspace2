import React, {useReducer} from "react";

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
    const addDock = () => {

    }

    const removeDock = () => {

    }

    return (
        <DockContext.Provider value={{
            addDock: addDock
            ,removeDock: removeDock
        }} >
            {props.children}
        </DockContext.Provider>
    )
}