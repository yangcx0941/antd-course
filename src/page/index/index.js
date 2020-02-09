import React, {Component} from 'react';
//引入自定义样式文件
import myStyles from './index.css';
import {DatePicker, LocaleProvider} from "antd";
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {
    FormattedMessage,
    IntlProvider,
    addLocaleData,
} from 'react-intl';
import zhData from 'react-intl/locale-data/zh';

const messages = {
    'helloWorld': '你好',
};

//是用于指定 react-intl 中的一些非特殊场景的国际化资源的
addLocaleData(zhData);

//获取当前上下文的语言环境
let language = window.navigator.language;

class Index extends Component {
    render() {

        //显示内容的国际化
        const helloWorld = language === 'en-US' ? 'hello world' : "你好啊";

        return (
            <div>
                <div>
                    <FormattedMessage id={'localeHelloWorld'}/>
                </div>
                <br/>
                <div className={myStyles.hello}>
                    {helloWorld}
                </div>
                <br/>
                {/*
                    antd 提供了一系列的内置的语言资源在 antd/lib/locale-provider/*；
                    内嵌组件可以直接使用它们作为 LocaleProvider 的 locale 属性即可实现 antd 内嵌组件（包括子组件）的国际化
                */}
                <LocaleProvider locale={zhCN}>
                    <DatePicker/>
                </LocaleProvider>
                <br/>
                <br/>
                {/*
                    业务组件（自定义组件推荐使用）react-intl 实现
                */}
                {/*locale属性：用于指定 react-intl 中的一些非特殊场景的国际化资源的*/}
                <IntlProvider locale="zh" messages={messages}>
                    <LocaleProvider locale={zhCN}>
                        <div>
                            <DatePicker/>
                            {/*以 id 为 key 从 message 中查找符合条件的显示值*/}
                            <FormattedMessage id="helloWorld"/>
                        </div>
                    </LocaleProvider>
                </IntlProvider>
            </div>
            //编译后的 class 为 style__hello__<hash数值>
        );
    }
}

export default Index;