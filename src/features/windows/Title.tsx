
import styles from './Title.module.css'

export interface TitleProps {
    title? : string | undefined;

}

export function Title(props : TitleProps ){

    const title = props.title
    return (
        <div className={`${styles.title} draggable_handle`}>
            {`${title}`}
            <ul>
                <li className={styles.btn_close}></li>
            </ul>
        </div>
    );
}