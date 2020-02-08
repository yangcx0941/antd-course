import * as React from "react";
import Picture from "./Picture";

class Picture2 extends React.Component {
    render() {

        const picture = {
            src: 'https://cdn.nlark.com/yuque/0/2018/jpeg/84141/1536207007004-59352a41-4ad8-409b-a416-a4f324eb6d0b.jpeg',
            alt: 'template.jpg'
        };

        return (
            <div>
                <Picture src={picture.src}
                         alt={picture.alt}>
                    {/*这里的内容就是 props.children*/}
                </Picture>
            </div>
        );
    }
}

export default Picture2;