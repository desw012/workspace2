import {useEffect, useState} from "react";
import {DockItem, DockItemInfo} from "./DockItem";

import styles from './DockBar.module.css'

export function DockBar(){
    const [dockItems, setDockItems] = useState<Array<DockItemInfo>>([{
        id : 0,
        name : 'asd',
        actionType : 'message',
        actionValue: `{"type":"window.create","url":"http://localhost:8081/xclick_dev/org/admin/company/list"}`
    },{
        id : 2,
        name : 'asdfasdfasdfasdfasdfasd',
        actionType : 'message',
        actionValue: `{"type":"window.create","url":"http://localhost:8081/xclick_dev/org/admin/company/list"}`
    },{
        id : 3,
        name : 'fasdfasdfasdfasd',
        actionType : 'message',
        actionValue: `{"type":"window.create","url":"http://localhost:8081/xclick_dev/org/admin/company/list"}`
    }]);


    return (
        <div className={styles.DockBar}>
            {dockItems.map( item => <DockItem key={item.id} dockItemInfo={item} /> )}
        </div>
    )
}