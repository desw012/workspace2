import React from "react";

const defaultValue = { }

export interface WorkSpaceContextProps{
    children?: React.ReactNode
}

export const WorkSpaceContext = React.createContext(defaultValue);

export function WorkSpaceContextComponent(props: WorkSpaceContextProps){

    return (
        <WorkSpaceContext.Provider value={{}}>
            {props.children}
        </WorkSpaceContext.Provider>
    )
}