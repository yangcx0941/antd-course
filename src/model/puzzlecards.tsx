import request from '../util/request';

//延时请求
const delay = (milliseconds) => {
    return new Promise((resolve => {
        setTimeout(resolve, milliseconds);
    }))
};

export default {
    namespace: 'puzzlecards',
    state: {
        data: [
            // {
            //     id: 1,
            //     setup: 'Did you hear about the two silk worms in a race?',
            //     punchline: 'It ended in a tie',
            // }, {
            //     id: 2,
            //     setup: 'What happens to a frog\'s car when it breaks down?',
            //     punchline: 'It gets toad away',
            // }
        ],
        counter: 100,
    },

    /**
     * FIXME DVA 的 reducers & effects & subscription 具体使用方法 <br/>
     * action.type 可以被 dva model 的 effect(优先)||reducer 捕获并处理 <br/>
     * TODO 无论如何，最终处理逻辑的终点都将是 reducer <br/>
     */

    /**
     * 所有的 reducer 方法应该都是一个个非常纯粹的处理数据的方法 ==> FIXME 从 WEB 端请求获取数据就变成了副作用？？
     * reducers 的成员可以用来响应 action 并改变当前 model 的 state 数据<br/>
     * 使用 action.type 来进行唯一匹配<br/>
     * 返回值被 dva 使用作为新的 state；state 的改变随后会被 connect 注入到组件中，触发视图改变<br/>
     * reducer 应该是一个纯函数<br/>
     * dva 会注入旧的 state 和 action 中的 payload<br/>
     * 返回值必须是一个新构造的对象<br/>
     * TODO 决不能把 旧 state 的引用返回<br/>
     * reducer 干的事情和 React 中 setState(prevState => { ... }) 很像，都要返回一个新构造的对象，
     *  区别是：reducer 的返回值会 整个取代 (Replace) 老的 state，而 setState 中回调函数的返回值是会 融合(Merge) 到老的 state 中去
     */
    reducers: {
        /**
         * 静态 model 可以直接通过 dispatch 请求到，而不用走 effects
         * @param oldState 当前 state
         * @param newCard 新的卡片数据
         */
        addNewCard(oldState, {payload: newCard}) {
            const nextCounter = oldState.counter + 1;
            const newCardWithId = {...newCard, id: nextCounter};
            const nextData = oldState.data.concat(newCardWithId);
            return {
                data: nextData,
                counter: nextCounter
            };
        }
    },

    /**
     * effect 充当了一个中间层，当 action 被 dispatch 之后，会先到达 effect 处理副作用，
     * 然后 effect 最终会促使新的 action 发送出去，这个新的 action 可能被其他 effect 捕获继续处理，也可能被 reducer 捕获并结束<br/>
     * TODO 无论如何，最终处理逻辑的终点都将是 reducer <br/>
     */
    effects: {
        * queryInitCards(_, sagaEffects) {
            // FIXME sagaEffects 是 dva 的规范参数？？？
            const {call, put} = sagaEffects;
            const endPointURI = 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke';

            const puzzle = yield call(request, endPointURI);
            yield put({type: 'addNewCard', payload: puzzle});

            // 暂停3秒钟
            yield call(delay, 3000);

            const puzzle2 = yield call(request, endPointURI);
            yield put({type: 'addNewCard', payload: puzzle2});
        }
    },

    subscription: {}
}