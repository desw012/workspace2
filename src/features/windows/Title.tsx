import styles from './Title.module.css'
import {useContext} from "react";
import {WindowApiContext} from "../../context/WindowContext";
import {WindowInfo} from "../../reducers/WindowsReducer";

export interface TitleProps {
    windowInfo : WindowInfo
}

export function Title(props : TitleProps ){
    const { windowInfo } = props;
    const title = 'asdfasdfdsjkfhdksljfdsjfkljdsklfjdslkjfalksdfjalksd';

    const { close, resizeMax, resizeRestore } = useContext(WindowApiContext);

    return (
        <div className={`${styles.title} draggable_handle`} onDoubleClick={ windowInfo.boxStyles.resizeMode ? resizeRestore : resizeMax }>
            <span className={[styles.btn_title, styles.color_red].join(' ')} onClick={ close }></span>
            <span className={[styles.btn_title, styles.color_yellow].join(' ')} onClick={ ()=>{ } }></span>
            <span className={[styles.btn_title, styles.color_green].join(' ')} onClick={ windowInfo.boxStyles.resizeMode ? resizeRestore : resizeMax }></span>
            <span className={styles.title_name}>
                {title}
            </span>
        </div>
    );
}