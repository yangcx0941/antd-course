import React, {Component} from "react";
import {Button, Card} from "antd";

const namespace = 'puzzlecards';

/**
 * 数据与组件绑定，不利于代码分层及数据复用；DVA 可以统一进行 state 管理（所有 React 组件之上）
 * FIXME 数据逻辑与视图逻辑未分离开，导致数据无法在各组件之间共享 -- 不推荐此种使用方式
 */
class PuzzleCardsPage extends Component {

    constructor(props) {
        super(props);
        /*还能直接设置局部变量*/
        this.counter = 100;
        this.state = {
            cardList: [
                {
                    id: 1,
                    setup: 'Did you hear about the two silk worms in a race?',
                    punchline: 'It ended in a tie',
                }, {
                    id: 2,
                    setup: 'What happens to a frog\'s car when it breaks down?',
                    punchline: 'It gets toad away',
                }
            ]
        };
    }

    /**
     * 添加卡片 TODO 方法的书写方法 写法跟已有的不一样
     */
    addNewCard = () => {
        this.setState(prevState => {
            const prevCardList = prevState.cardList;
            this.counter += 1;
            const card = {
                /*添加的 id 一定不能相同*/
                id: this.counter,
                setup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
                punchline: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            };
            return {
                cardList: prevCardList.concat(card)
            };
        })
    };

    render() {
        return (
            <div>
                {
                    this.state.cardList.map(card => {
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
                    <Button onClick={this.addNewCard}>添加卡片</Button>
                </div>
            </div>
        );
    }
}

export default PuzzleCardsPage;