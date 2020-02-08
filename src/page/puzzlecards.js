import React, {Component} from "react";
import {Button, Card} from "antd";
import {connect} from "dva";

const namespace = 'puzzlecards';

/**
 * mapStateToProps 这个函数的入参 state 其实是 dva 中所有 state 的总合<br/>
 * (包含了所有 namespace 下的 state，我们自己定义的 dva model state 就是以 namespace 为 key 的 state 成员)<br/>
 * dva 期待 mapStateToProps 函数返回一个 对象，这个对象会被 dva 并入到当前组件的 props 中<br/>
 */
const mapStateToProps = (state) => {
    const cardList = state[namespace].data;
    // 不是直接返回 cardList 本身，而是一个包含了 cardList 的对象
    return {cardList};
};

/**
 * mapDispatchToProps 以 dispatch 为入参，返回一个挂着函数的对象，这个对象上的函数会被 dva 并入 props，注入给当前组件使用<br/>
 * dispatch 函数就是组件和 dva model 打交道的唯一途径<br/>
 * <br/>
 * <br/>
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onClickAdd: (newCard) => {
            const action = {
                // action.type 可以被 dva model 的 effect(优先)||reducer 捕获并处理
                type: `${namespace}/addNewCard`,
                payload: newCard
            };
            // TODO 必须包含 type 字段，用来告诉 dva 我们想要干什么
            dispatch(action);
        },
        onDidMount: () => {
            dispatch({
                type: `${namespace}/queryInitCards`
            });
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)
class PuzzleCardsPage extends Component {

    componentDidMount() {
        this.props.onDidMount();
    }

    render() {
        return (
            <div>
                {
                    this.props.cardList.map(card => {
                        return (
                            <Card key={card.id}>
                                <div>Q:{card.setup}</div>
                                <div>
                                    <strong>A:{card.punchline}</strong>
                                </div>
                            </Card>
                        );
                    })
                }
                <div>
                    <Button onClick={
                        //使用回调函数而不是直接调用函数
                        () => {
                            this.props.onClickAdd({
                                setup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                                punchline: 'here we use dva',
                            })
                        }
                    }>
                        添加卡片
                    </Button>
                </div>
            </div>
        );
    }
}

export default PuzzleCardsPage;