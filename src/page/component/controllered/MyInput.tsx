import * as React from "react";

const MyInput = ({value = '', onChange}) => (
    //目标 input 的值完全由 value 属性决定
    <input onChange={onChange} value={value}/>
);

export default MyInput;