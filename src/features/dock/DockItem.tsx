import {useEffect} from "react";

import styles from './DockBar.module.css'

export interface DockItemInfo {
    id : number,
    name : string,
    actionType : 'message' | string
    actionValue : string
}

export interface DockItemProps {
    dockItemInfo : DockItemInfo
}

export function DockItem (props : DockItemProps){
    const { name, actionType, actionValue } = props.dockItemInfo;

    const click = () => {
        if( actionType === 'message' ){
            const jsonObj = JSON.parse(actionValue);
            window.postMessage(jsonObj, window.location.origin);
        }
    }

    return (
        <div className={styles.DockItem}>
            <span onClick={click}>{name}</span>
        </div>
    )
}