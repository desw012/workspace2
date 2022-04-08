import React, {RefObject, useEffect, useReducer, useState} from "react";
import {
    closeWindow,
    createWindow,
    focusWindow, updateWindowRect, WindowActions, WindowInfo,
    WindowsReducer,
    WindowsReducerInitialState
} from "../reducers/WindowsReducer";
import { Window } from "../features/windows/Window";
import {Rectangle} from "../features/box/Rect";
import {ResizeMode} from "../features/box/Box";

const defaultWindowsApiValue = {
    setContentDim : ( isDim : boolean) => {},
    dispatch : ( actions : WindowActions ) => {}
}

const defaultWindowsStateValue = {
    isContentDim : false,
    windows : []
}

const defaultWindowApiValue = {
    updateRect : (rect : Rectangle, resizeMode?: ResizeMode) => {},
    close : () => {},
    focus : () => {},
    resizeMax : () => {},
    resizeRestore : () => {}
}

export interface WindowContextComponentProps{
    children?: React.ReactNode
}



export const WindowsApiContext = React.createContext(defaultWindowsApiValue);
export const WindowsStateContext = React.createContext<{isContentDim: boolean, windows:Array<WindowInfo>, rootRef? : RefObject<HTMLDivElement> }>(defaultWindowsStateValue);
export const WindowApiContext = React.createContext(defaultWindowApiValue);
export const WindowStateContext = React.createContext<{window:WindowInfo}|null>(null);


export function WindowContextComponent(props: WindowContextComponentProps){
    const [windowsState, dispatch] = useReducer(WindowsReducer, WindowsReducerInitialState);
    const [isContentDim, setContentDim] = useState<boolean>(false);

    const nodeRef = React.useRef<HTMLDivElement> (null);

    useEffect(()=>{
        const messageHandler = (e : any)=>{
            if (e.origin === window.location.origin && e.data) {
                switch (e.data.type ){
                    case 'window.create' :
                        if(e.data.url) {
                            dispatch(createWindow(e.data.url));
                        }
                        break;
                    case 'window.close' :
                        if(e.data.id) {
                            dispatch(closeWindow(e.data.id));
                        }
                        break;
                    case 'window.focus' :
                        if(e.data.id) {
                            dispatch(focusWindow(e.data.id));
                        }
                        break;
                    default :
                        break;
                }
            }
        }
        window.addEventListener('message', messageHandler)
        return ()=>{window.removeEventListener('message', messageHandler);}
    }, []);

    const updateRect = (id: number, rect: Rectangle, resizeMode? : ResizeMode ) => {
        dispatch(updateWindowRect(id, rect, resizeMode));
    }

    const focus = (id: number) => {
        dispatch(focusWindow(id));
    }

    const close = (id: number) => {
        dispatch(closeWindow(id));
    }

    const resizeMax = (id: number) => {
        const rect = nodeRef.current?.getBoundingClientRect();
        if(rect){
            dispatch(updateWindowRect(id, {x: 0, y: 0, w: rect.width, h: rect.height}, 'maximum'));
        }
    }

    const resizeRestore = (id: number) => {
        const window = windowsState.find(window=>window && window.id === id);
        if(window?.boxStyles.prevRect){
            dispatch(updateWindowRect(id, window.boxStyles.prevRect));
        }
    }

    return (
        <WindowsApiContext.Provider value={{
            setContentDim : setContentDim,
            dispatch : dispatch
        }}>
            <WindowsStateContext.Provider value={{
                isContentDim:  isContentDim,
                windows : windowsState,
                rootRef : nodeRef
            }}>
                <div style={{zIndex:0, flex:1, position:"relative"}} ref={nodeRef} >
                {
                    windowsState.map((info, idx)=>
                        !info.isClose &&
                        <WindowApiContext.Provider
                            key={info.id}
                            value={{
                            updateRect : (rect, resizeMode)=>{ updateRect(info.id, rect, resizeMode ); },
                            focus : ()=>{ focus(info.id) },
                            close : ()=>{ close(info.id) },
                            resizeMax : ()=>{ resizeMax(info.id) },
                            resizeRestore : ()=>{ resizeRestore(info.id) }
                        }}>
                            <WindowStateContext.Provider value={{
                                window : info
                            }}>
                                <Window
                                    id={info.id}
                                    url={info.url}

                                    windowInfo={info}
                                />
                            </WindowStateContext.Provider>
                        </WindowApiContext.Provider>
                    )
                }
                </div>

                {props.children}
            </WindowsStateContext.Provider>
        </WindowsApiContext.Provider>

    )

}