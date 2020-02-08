import * as React from 'react';
import MyInput from "./MyInput";
import {Button} from "antd";

class Demo extends React.Component {

    state = {
        text: ''
    };

    onTextChange = (event) => {
        this.setState({
            text: event.target.value
        });
    };

    onTextReset = () => {
        this.setState({
            text: ''
        })
    };

    render() {
        return (
            <div>
                <MyInput onChange={this.onTextChange}
                         value={this.state.text}/>
                <Button onClick={this.onTextReset}/>
            </div>
        );
    }
}

export default Demo;