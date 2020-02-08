import * as React from 'react';
import MyInput from "./MyInput";

class Demo extends React.Component {

    onTextChange = (event) => {
        console.log(event.target.value);
    };

    onTextReset = (value) => {
        // TODO 拿不到 MyInput 的值 ==> 非受控组件
    };

    render() {
        return (
            <div>
                <MyInput onChange={this.onTextChange}/>
                <button onClick={this.onTextReset}>Reset</button>
            </div>
        );
    }
}

export default Demo;