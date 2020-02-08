import * as React from "react";

class Picture extends React.Component {
    render() {
        return (
            <div>
                <img src={this.props.src} alt={this.props.alt}/>
                {this.props.children}
            </div>
        )
    }
}

export default Picture;