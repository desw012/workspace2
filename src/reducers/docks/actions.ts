import {DockItemInfo} from "./reducer";

interface Action {
    type: string,
    payload : number
}

export interface UpdateDefaultDockItemsAction {
    type: 'update-default-dock-item-action',
    payload : {
        dockItems : Array<DockItemInfo>
    }
}
export type DockActions = Action | UpdateDefaultDockItemsAction;

export const updateDefaultDockItems = ( dockItems : Array<DockItemInfo>) : UpdateDefaultDockItemsAction => {
    return {
        type : 'update-default-dock-item-action',
        payload : {
            dockItems : dockItems
        }
    }
}