export default {
    namespace: 'puzzlecards',
    state: {
        data: [
            {
                id: 1,
                setup: 'Did you hear about the two silk worms in a race?',
                punchline: 'It ended in a tie',
            }, {
                id: 2,
                setup: 'What happens to a frog\'s car when it breaks down?',
                punchline: 'It gets toad away',
            }
        ],
        counter: 100,
    },

    /**
     * FIXME DVA 的 reducers & effects & subscription 具体使用方法<br/>
     * reducers 的成员用来响应 action 并改变当前 model 的 state 数据<br/>
     * 使用 action.type 来进行唯一匹配<br/>
     * 返回值被 dva 使用作为新的 state；state 的改变随后会被 connect 注入到组件中，触发视图改变<br/>
     * reducer 应该是一个纯函数<br/>
     * dva 会注入旧的 state 和 action 中的 payload<br/>
     * 返回值必须是一个新构造的对象<br/>
     * TODO 决不能把 旧 state 的引用返回<br/>
     * reducer 干的事情和 React 中 setState(prevState => { ... }) 很像，都要返回一个新构造的对象，但区别是：reducer 的返回值会 整个取代 (Replace) 老的 state，而 setState 中回调函数的返回值是会 融合(Merge) 到老的 state 中去
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

    effects: {},

    subscription: {}
}