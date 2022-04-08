import {useContext, useEffect, useState} from "react";
import {DockItem, DockItemInfo} from "./DockItem";

import styles from './DockBar.module.css'
import {DockStateContext} from "../../context/DockContext";
import {WindowsApiContext, WindowsStateContext} from "../../context/WindowContext";
import {focusWindow} from "../../reducers/WindowsReducer";

export function DockBar(){
    const { defaultDockItems, dockItems } = useContext(DockStateContext);
    const { windows } = useContext(WindowsStateContext);
    const { dispatch } = useContext(WindowsApiContext);

    /*
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
*/


    return (
        <div className={styles.DockBar}>
            { defaultDockItems.map( item => <DockItem key={item.id} dockItemInfo={item} /> )}
            { windows.length > 0 && <div className={styles.SplitItem}></div>}
            { windows.map( window =>
                !window.isClose && <DockItem key={window.id} dockItemInfo={{
                id: window.id,
                name: '',
                actionType: 'function',
                actionFn: () => { dispatch(focusWindow(window.id)) }
            }} /> )}
        </div>
    )
}