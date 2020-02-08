import React, {Component} from 'react';
import {Button, Form, Input, Modal, Table} from "antd";
import SampleChart from "../../SampleChart";
import {connect} from "dva";

const FormItem = Form.Item;

class List extends Component {

    state = {
        visible: false,
        statisticVisible: false,
        id: null,
    };

    columns = [
        {
            title: '名称',
            dataIndex: 'name'
        }, {
            title: '描述',
            dataIndex: 'desc'
        }, {
            title: '链接',
            dataIndex: 'url',
            render: (value => {
                return (<a href={{value}}>{value}</a>);
            })
        }, {
            title: '',
            dataIndex: 'statistic',
            render: (_, {id}) => {
                return (
                    <Button onClick={() => {
                        this.showStatistic(id);
                    }}>图表</Button>
                );
            }
        }
    ];

    componentDidMount() {
        this.props.dispatch({
            type: 'cards/queryList'
        });
    }

    showModal = () => {
        this.setState({visible: true});
    };

    handleOk = () => {
        //FIXME form: {validateFields} 获取方式
        const {dispatch, form: {validateFields}} = this.props;

        validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: 'cards/addOne',
                    payload: values
                });
                this.setState({
                    visible: false
                });
            }
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    handleStatisticCancel = () => {
        this.setState({
            statisticVisible: false,
        });
    };

    showStatistic = (id) => {
        this.props.dispatch({
            type: 'cards/getStatistic',
            payload: id
        }).then(() => {
            this.setState({
                id,
                statisticVisible: true
            });
        });
    };

    /**
     * getFieldDecorator 方法执行后会返回一个函数，那个函数接收一个输入组件作为参数（也可以支持自定义控件）；
     * 自定义控件必须满足以下条件：
     *  1、提供受控属性 value 或其他与 valuePropName 的值同名的属性
     *  2、提供 onChange 事件或 trigger 的值同名的事件
     *  3、不能是函数式组件
     */
    render() {
        const {visible, statisticVisible, id} = this.state;
        //FIXME form: {validateFields} 获取方式
        const {cardsList, cardsLoading, form: {getFieldDecorator}, statistic} = this.props;

        return (
            <div>
                <Table
                    columns={this.columns}
                    dataSource={cardsList}
                    loading={cardsLoading}
                    rowKey={'id'}
                />

                <Button onClick={this.showModal}>新建</Button>

                <Modal
                    title={'新建记录'}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <FormItem label={'名称'}>
                            {getFieldDecorator('name', {
                                rules: [{required: true}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label={'描述'}>
                            {getFieldDecorator('desc')(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label={'链接'}>
                            {getFieldDecorator('url', {
                                rules: [{type: 'url'}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>

                <Modal visible={statisticVisible}
                       footer={null}
                       onCancel={this.handleStatisticCancel}>
                    <SampleChart data={statistic[id]}/>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cardsList: state.cards.cardsList,
        //当用户 dispatch 对应 effect 时，dva 会自动注入对应 effect 的 loading 状态
        cardsLoading: state.loading.effects['cards/queryList'],
        statistic: state.cards.statistic
    };
}

//TODO Form 表单的导出方式
// 创建一个高阶组件，为页面组件 List 提供表单所需要的内容(this.props.form)
export default connect(mapStateToProps)(Form.create()(List));