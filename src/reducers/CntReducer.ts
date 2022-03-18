
export const initialState  = 0

export function CntReducer(state : number, action : any) {
    switch (action.type) {
        case 'increment':
            return state + 1;
        default:
            return state
    }
}