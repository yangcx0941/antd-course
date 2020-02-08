import * as React from "react";

class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    //===========================不经常使用================================//

    /**
     * 每当this.props或this.state有变化，在render方法执行之前，就会调用这个方法。该方法返回一个布尔值，表示是否应该继续执行render方法，
     * 即如果返回false，UI 就不会更新，默认返回true。组件挂载时，render方法的第一次执行，不会调用这个方法
     * @param nextProps
     * @param nextState
     * @param nextContext
     */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
    }

    /**
     * 该方法在每次 DOM 更新之前调用，用来收集 DOM 信息。它返回的值，将作为参数传入componentDidUpdate()方法
     * @param prevProps
     * @param prevState
     */
    getSnapshotBeforeUpdate(prevProps, prevState) {
    }

//===========================不经常使用================================//

    /**
     * 在 UI 每次更新后调用（即组件挂载成功以后，每次调用 render 方法，都会触发这个方法）
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    /**
     * 在组件卸载前自动调用
     */
    componentWillUnmount() {
    }

    /**
     * 在组件挂载后自动调用
     */
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

export default Clock;