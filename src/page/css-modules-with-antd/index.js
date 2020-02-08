import styles from './styles.less';
import {Button} from 'antd';
import React from "react";

export default () => {
    return (
        <div>
            <p>
        <span className={styles['override-ant-btn']}>
            {/*<span className={styles.overrideAntBtn}>*/}
            <Button type={"primary"}>圆角样式按妞</Button>
        </span>
            </p>
            <p>
                <Button type={"primary"}>Ant Design 原始按钮</Button>
            </p>
        </div>
    );
};