import React from 'react';
import G2 from '@antv/g2';

class SampleChart extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        this.chart = new G2.Chart({
            container: this.containerRef.current,
            width: 450,
            height: 300
        });
        this.refreshChart();
    }

    componentDidUpdate(prevProps) {
        //当前的 data 没有变化我们图表当然不需要重新绘制
        if (prevProps.data !== this.props.data) {
            this.refreshChart();
        }
    }

    componentWillUnmount() {
        if (this.chart) {
            //如果这个组件不再被使用，那么初始化的图表也应该随着组件一并被销毁
            this.chart.destroy();
        }
    }

    refreshChart = () => {
        this.chart.source(this.props.data);
        this.chart.interval().position('genre*sold').color('genre');
        this.chart.render();
    };

    render() {
        return (
            <div ref={this.containerRef}/>
        );
    }
}

export default SampleChart;