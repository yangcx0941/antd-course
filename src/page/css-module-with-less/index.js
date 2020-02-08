import styles from './styles.less';
import React from "react";
import {Button} from "antd";

export default () => {
    return (
        <div className={styles.hello}>
            <span className={styles.deleted}>Hello World</span>
            <br/>
            <Button>Origin Ant Button</Button>
        </div>
    );
};