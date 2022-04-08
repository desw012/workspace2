import Draggable, {DraggableBounds, DraggableData, DraggableEvent, DraggableEventHandler} from "react-draggable";
import React, {RefObject, SyntheticEvent, useContext, useEffect, useState} from "react";
import styles from './Box.module.css'
import {Resizable, ResizableBox, ResizeCallbackData} from "react-resizable";
import {WorkSpaceContext} from "../../context/WorkSpaceContext";
import {WindowsApiContext, WindowsStateContext} from "../../context/WindowContext";
import {Rectangle} from "./Rect";

let g_zIndex = 0;
const g_zIndexMap = new Map<number, number>();

export type ResizeMode = 'minimum' | 'maximum' | 'dock' | undefined | null;

export interface BoxProps {
    children?: React.ReactNode
    id: number
    boxStyles: BoxStyles
    update: ( rect: Rectangle, resizeMode?: ResizeMode ) => void
    focus: () => void
    rootRef? : React.RefObject<HTMLDivElement>
}

export interface BoxStyles {
    zIndex : number,
    rect : Rectangle,
    prevRect? : Rectangle,
    resizeMode? : ResizeMode
}

export const defaultBoxStyles : BoxStyles = {
    zIndex : 0,
    rect : {
        x: 0,
        y: 0,
        w: 500,
        h: 500
    }
}

export function Box(props: BoxProps){
    const { update, focus, boxStyles, rootRef } = props;
    const { zIndex, rect } = boxStyles;

    const [bounds, setBounds] = useState<DraggableBounds | string | false >(false);
    const [extendsGuide, setExtendsGuide] = useState<null | 'left' | 'right' | 'full' >(null);
    const [left, setLeft ] = useState<number>(0);
    const [resized, setResized] = useState<boolean>(false);


    const nodeRef = React.useRef<HTMLDivElement> (null);
    const extendsGuideRef = React.useRef<HTMLDivElement> (null);

    const { setContentDim } = useContext(WindowsApiContext);

    const trackPos = (e: DraggableEvent, data : DraggableData) => {
        if(rootRef?.current && "clientX" in e) {
            const rootRect = rootRef?.current?.getBoundingClientRect();

            if (!resized && e.clientX < rootRect.left + 30) {
                setExtendsGuide('left');
            } else if (!resized && e.clientX > (rootRect.right - 30)) {
                setExtendsGuide('right');
            } else if(e.clientY < rootRect.top){
                setExtendsGuide('full');
            } else {
                setExtendsGuide(null);
            }

            if(!resized && boxStyles.resizeMode && boxStyles.prevRect){
                const margin = e.clientX - rootRect.left - rect.x  - boxStyles.prevRect.w / 2;
                setLeft(margin);
            }
        }
        if( !resized && boxStyles.resizeMode && boxStyles.prevRect){
            update({x: data.x, y: data.y, w: boxStyles.prevRect.w, h: boxStyles.prevRect.h});
        }else {
            update({x: data.x, y: data.y, w: rect.w, h: rect.h});
        }
    };

    const handleStart = (e: DraggableEvent, data: DraggableData) => {
        focus();

        if(e.target && (e.target as HTMLElement).classList.contains('react-resizable-handle')){
            let resizeClassName = '';
            (e.target as HTMLElement).classList.forEach((className)=>{
                if(className.startsWith('react-resizable-handle-')){
                    resizeClassName = className;
                }
            });

            const h = nodeRef.current?.clientHeight || 0;
            const w = nodeRef.current?.clientWidth || 0;
            let bounds : DraggableBounds = {
                left : undefined,
                right : undefined,
                top : undefined,
                bottom : undefined
            }
            switch (resizeClassName){
                case 'react-resizable-handle-n':
                    bounds.top = 0;
                    bounds.left = data.lastX;
                    bounds.right = data.lastX;
                    bounds.bottom = data.lastY + h;
                    break
                case 'react-resizable-handle-w':
                    bounds.top = data.lastY;
                    bounds.left = 0;
                    bounds.right = data.lastX+w;
                    bounds.bottom = data.lastY;
                    break;
                case 'react-resizable-handle-e':
                case 'react-resizable-handle-s':
                case 'react-resizable-handle-se':
                    return false;
                case 'react-resizable-handle-nw':
                    bounds.top = 0;
                    bounds.left = 0;
                    bounds.right = data.lastX + w;
                    bounds.bottom = data.lastY + h;
                    break;
                case 'react-resizable-handle-ne':
                    bounds.top = 0;
                    bounds.left = data.lastX;
                    bounds.right = data.lastX;
                    bounds.bottom = data.lastY + h;
                    break;
                case 'react-resizable-handle-sw':
                    bounds.top = data.lastY;
                    bounds.left = 0;
                    bounds.right = data.lastX + w;
                    bounds.bottom = data.lastY;
                    break;
            }


            setBounds(bounds);
        } else if(e.target && (e.target as HTMLElement).closest('.draggable_handle')) {

        } else {
            return false;
        }
        setContentDim(true);
    }

    const handleStop = (e: DraggableEvent, data: DraggableData) => {
        setBounds(false);
        setContentDim(false);

        if (extendsGuide) {
            const guideRect = extendsGuideRef.current?.getBoundingClientRect()
            if (guideRect) {
                update({x: guideRect.x, y: guideRect.y, w: guideRect.width, h: guideRect.height}, extendsGuide === 'full' ? 'maximum' : 'dock');
            }
        }else if(left !== 0){
            console.log(left + rect.x);
            update({x: left + rect.x, y: rect.y, w: rect.w, h: rect.h});
        }

        setExtendsGuide(null);
        setLeft(0);

    }

    const handleResizeStart = (e: SyntheticEvent, data: ResizeCallbackData) => {
        setContentDim(true);
        setResized(true);
    }

    const handleResizeStop = (e: SyntheticEvent, data: ResizeCallbackData) => {
        if (resized) {
            update({x: rect.x, y: rect.y, w: data.size.width, h: data.size.height});
            setResized(false);
        }
        setContentDim(false);
    }

    return(
        <>
            {
                extendsGuide &&
                <div ref={extendsGuideRef}
                    style={{
                        position: "absolute",
                        height: "100%",
                        width: extendsGuide === 'full' ? '100vw' : "50vw",
                        zIndex: zIndex,
                        right: extendsGuide === 'right' ? '0' : 'initial',
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        borderRadius: "12px"
                    }}>
                </div>
            }
            <Draggable onDrag={ (e, data) => trackPos(e, data)}
                       nodeRef={nodeRef}
                       onStart={handleStart}
                       onStop={handleStop}
                       bounds={bounds}
                       position={{x: rect.x, y: rect.y}}
                       offsetParent={rootRef?.current as HTMLElement}
                       >
                    <div ref={nodeRef} style={{zIndex : zIndex, marginLeft:`${left}px` }} >
                        <ResizableBox
                            width={ rect.w }
                            height={ rect.h }
                            resizeHandles={['s' , 'w' , 'e' , 'n' , 'sw' , 'nw' , 'se' , 'ne']}
                            onResizeStart={handleResizeStart}
                            onResizeStop={handleResizeStop}
                        >
                            <div className={styles.box} >
                                {props.children}
                            </div>
                        </ResizableBox>
                    </div>
            </Draggable>

        </>
    )
}