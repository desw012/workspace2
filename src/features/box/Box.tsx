import Draggable, {DraggableBounds, DraggableData, DraggableEvent, DraggableEventHandler} from "react-draggable";
import React, {useState} from "react";
import styles from './Box.module.css'
import {Resizable, ResizableBox} from "react-resizable";

export function Box(){
    const [position, setPosition] = useState({x: 0, y: 0});
    const [size, setSize] = useState({width:200, height:200});
    const [bounds, setBounds] = useState<DraggableBounds | string | false >(false);

    const nodeRef = React.useRef<HTMLDivElement> (null);

    const trackPos = (data : { x:number, y:number }) => {
        setPosition({ x: data.x, y: data.y });
    };

    const handleStart = (e: DraggableEvent, data: DraggableData) => {
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
        }
    }

    const handleStop = (e: DraggableEvent, data: DraggableData) => {
        setBounds(false);
    }


    return(
        <Draggable onDrag={ (e, data) => trackPos(data)}
                   nodeRef={nodeRef}
                   onStart={handleStart}
                   onStop={handleStop}
                   bounds={bounds}
                   >
                <div ref={nodeRef} >
                    <ResizableBox width={200} height={200} resizeHandles={['s' , 'w' , 'e' , 'n' , 'sw' , 'nw' , 'se' , 'ne']}
                    >
                        <div>
                            <h1 className={"draggable_handle"}>TEST</h1>
                            <div>
                        Drag
                            </div>
                        </div>
                    </ResizableBox>
                </div>
        </Draggable>
        /*
           <div>
               <ResizableBox width={200} height={200} resizeHandles={['s' , 'w' , 'e' , 'n' , 'sw' , 'nw' , 'se' , 'ne']}>
                   <div
                       style={{ backgroundColor: 'green', width: '100%', height: '100%' }}
                   >
                       <div>BOX</div>
                       <div>BOX</div>
                       <div>BOX</div>

                       <div>BOX</div>
                       <div>x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}</div>
                   </div>
               </ResizableBox>
           </div>
           */
    )
}