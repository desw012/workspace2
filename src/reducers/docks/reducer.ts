import {DockActions, UpdateDefaultDockItemsAction} from "./actions";

export interface DockItemInfo {
    id : number,
    name : string,
    actionType : 'message' | 'script'
    actionValue : string
}

export interface DockState {
    defaultDockItems : Array<DockItemInfo>,
    dockItems : Array<DockItemInfo>
}

export function DockReducer(state : DockState, action : DockActions ) : DockState{
    switch (action.type){
        case 'update-default-dock-item-action':
            return doUpdateDefaultDockItem(state, action as UpdateDefaultDockItemsAction);
    }
    return state;
}

const doUpdateDefaultDockItem = (state : DockState, action : UpdateDefaultDockItemsAction) => {

    return {...state, defaultDockItems : action.payload.dockItems};
}
