import {Box} from "../box/Box";
import {Title} from "./Title";

export type CloseHandler = (idx : number) => void

export interface WindowProps {
    idx? : number
    closeFn? : CloseHandler
}

export function Window(props?: WindowProps){
    return (
        <Box>
            <Title />
            <h1>TEST</h1>
        </Box>
    );
}