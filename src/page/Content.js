import * as React from "react";
import ShoppingList from "./ShoppingList";

class Content extends React.Component {

    render() {
        return (
            //引用定义好的组件
            <ShoppingList name={'张三'}/>
        );
    }
}

export default Content;