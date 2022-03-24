import Draggable, {DraggableBounds, DraggableData, DraggableEvent, DraggableEventHandler} from "react-draggable";
import React, {SyntheticEvent, useContext, useState} from "react";
import styles from './Box.module.css'
import {Resizable, ResizableBox, ResizeCallbackData} from "react-resizable";
import {WorkSpaceContext} from "../../context/WorkSpaceContext";

let g_zIndex = 0;

export interface BoxProps {
    children?: React.ReactNode
    size: { width: number, height: number }
    position: { x: number, y: number }
    setSize: (width: number, height: number) => void
    setPosition: (x: number, y: number) => void
}

export function Box(props: BoxProps){
    const { position, setPosition, size, setSize } = props;

    const [bounds, setBounds] = useState<DraggableBounds | string | false >(false);
    const [zIndex, setZIndex] = useState(g_zIndex);

    const nodeRef = React.useRef<HTMLDivElement> (null);

    const { setContentDim } = useContext(WorkSpaceContext);

    const trackPos = (data : { x:number, y:number }) => {
        setPosition(data.x, data.y);
    };

    const incZIndex = () => {
        setZIndex(++g_zIndex);
    }

    const handleStart = (e: DraggableEvent, data: DraggableData) => {
        incZIndex();

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
    }

    const handleResizeStart = (e: SyntheticEvent, data: ResizeCallbackData) => {
        setContentDim(true);
    }

    const handleResizeStop = (e: SyntheticEvent, data: ResizeCallbackData) => {
        setSize(data.size.width, data.size.height);
        setContentDim(false);
    }

    return(
        <Draggable onDrag={ (e, data) => trackPos(data)}
                   nodeRef={nodeRef}
                   onStart={handleStart}
                   onStop={handleStop}
                   bounds={bounds}
                   >
                <div ref={nodeRef} style={{zIndex : zIndex, transform: `translate(${position.x}px, ${position.y}px)`}} >
                    <ResizableBox
                        width={size.width}
                        height={size.height}
                        resizeHandles={['s' , 'w' , 'e' , 'n' , 'sw' , 'nw' , 'se' , 'ne']}
                        onResizeStart={handleResizeStart}
                        onResizeStop={handleResizeStop}
                    >
                        <div className={styles.box} >
                            {props.children}
                            <WorkSpaceContext.Consumer>
                                { value => (
                                    value.isContentDim && <div className={styles.dim}></div>
                                )}
                            </WorkSpaceContext.Consumer>
                        </div>
                    </ResizableBox>
                </div>
        </Draggable>
    )
}