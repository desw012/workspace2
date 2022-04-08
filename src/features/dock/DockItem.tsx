import {useEffect} from "react";

import styles from './DockBar.module.css'

export interface DockItemInfo {
    id: number,
    name: string,
    actionType: 'message' | string
    actionValue?: string
    actionFn?: () => void
}


export interface DockItemProps {
    dockItemInfo : DockItemInfo
}

export function DockItem (props : DockItemProps){
    const { name, actionType, actionValue, actionFn } = props.dockItemInfo;

    const click = () => {
        if( actionType === 'message' && typeof actionValue === "string" ){
            const jsonObj = JSON.parse(actionValue);
            window.postMessage(jsonObj, window.location.origin);
        } else if(actionFn){
            actionFn()
        }
    }

    return (
        <div className={styles.DockItem} onClick={click}>
            <span >{name}</span>
            <span className={[styles.dot, styles.active].join(' ')}></span>
        </div>
    )
}