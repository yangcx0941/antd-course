import React, {Component} from 'react';
//引入自定义样式文件
import myStyles from './index.css';

class Index extends Component {
    render() {
        return (
            //编译后的 class 为 style__hello__<hash数值>
            <div className={myStyles.hello}>
                Hello World
            </div>
        );
    }
}

export default Index;