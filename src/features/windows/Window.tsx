import {Box, BoxStyles} from "../box/Box";
import {Title} from "./Title";
import React, {useContext, useState} from "react";
import styles from './Window.module.css'
import {WindowApiContext, WindowsApiContext, WindowsStateContext} from "../../context/WindowContext";
import {WindowInfo} from "../../reducers/WindowsReducer";

export interface WindowProps {
    id : number,
    url? : string,
    windowInfo : WindowInfo,
    children?: React.ReactNode
}

export function Window(props: WindowProps){
    const { id, windowInfo } = props;
    const { updateRect, focus } = useContext(WindowApiContext)
    const { rootRef } = useContext(WindowsStateContext);
    const [src, setSrc] = useState(props.url);

    return (
    <Box
        id={id}
        boxStyles={ windowInfo.boxStyles }
        update={ updateRect }
        focus={ focus }
        rootRef={rootRef}
    >
        <Title windowInfo={windowInfo} />
        <div style={{position:"relative", height:"100%", width:"100%"}}>
            {
                src &&
                <>
                    <iframe name={`${id}`} className={styles.container} src={src} title={"asd"}></iframe>
                    <WindowsStateContext.Consumer>
                        { value => (
                            value.isContentDim && <div style={{position:"absolute", height:"100%", width:"100%", top:0}}></div>
                        )}
                    </WindowsStateContext.Consumer>
                </>
            }
            { props.children }
        </div>
    </Box>

    );
}