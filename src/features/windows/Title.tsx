import styles from './Title.module.css'

export interface TitleProps {
    title? : string | undefined;
    closeFn? : Function;
    minimumFn? : Function
}

export function Title(props : TitleProps ){
    //const {title} = props;
    const title = 'asdfasdfdsjkfhdksljfdsjfkljdsklfjdslkjfalksdfjalksd';
    return (
        <div className={`${styles.title} draggable_handle`}>
            <span className={[styles.btn_title, styles.color_red].join(' ')} onClick={ ()=>{ props.closeFn && props.closeFn() } }></span>
            <span className={[styles.btn_title, styles.color_yellow].join(' ')} onClick={ ()=>{ props.minimumFn && props.minimumFn() } }></span>
            <span className={[styles.btn_title, styles.color_green].join(' ')} onClick={ ()=>{ props.closeFn && props.closeFn() } }></span>
            <span className={styles.title_name}>
                {title}
            </span>
        </div>
    );
}