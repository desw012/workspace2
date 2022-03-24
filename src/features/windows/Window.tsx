import {Box} from "../box/Box";
import {Title} from "./Title";
import {WorkSpaceContext} from "../../context/WorkSpaceContext";
import {useContext, useState} from "react";
import styles from './Window.module.css'

export interface WindowProps {
    idx : number
}

export function Window(props: WindowProps){
    const { idx } = props
    const [position, setPosition] = useState<{x:number, y:number}>({x: 0, y: 0});
    const [size, setSize] = useState<{width:number, height:number}>({width:500, height:500});
    const [isShow, setShow] = useState<boolean>(true)
    const { closeWindow } = useContext(WorkSpaceContext);

    const closeFn = () => {
        closeWindow(idx);
    }

    const minimumFn = () => {
        setShow(false)
    }

    return (
        <>
        { isShow &&
            (<Box
                    size={size}
                    setSize={(width, height) => { setSize({width: width, height: height }) }}
                    position={position}
                    setPosition={(x, y) => { setPosition({x: x, y: y }) }}
                >
                <Title closeFn={closeFn} minimumFn={minimumFn}/>
                    <iframe name={`container${idx}`} className={styles.container} src={"http://localhost:8080/xclickr31_dev"}></iframe>
            </Box>
            )
        }
        </>
    );
}