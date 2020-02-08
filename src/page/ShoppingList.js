import React from 'react';

/**
 * 自定义组件必须继承 React.Component ，必须实现 render() 方法，必须 export 组件
 */
class ShoppingList extends React.Component {

    render() {
        return (
            <div className={'shopping-list'}>
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        );
    }
}

//如果要对外暴露，就必须 export 出去
export default ShoppingList;