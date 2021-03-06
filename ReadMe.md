## AntDesign相关记录
### 1、package.json，它是 NodeJs 约定的用来存放项目的信息和配置等信息的文件
### 2、配置文件被约定为 config/config.js
    在 umi 中，也可以简单的使用 .umirc.js 来作为配置文件（和 config/config.js 是二选一的）
    配置文件修改后一定要重启
### 3、package.json 中 scripts 中定义的命令，可以在项目根目录中通过 [c]npm run [ScriptName] 来运行
### 4、自定义组件必须继承 React.Component ，必须实现 render() 方法，必须 export 组件
### 5、React 组件接受外部消息：this.props对象有一个非常特殊的参数（这货是一个数组），表示当前组件“包裹”的所有内容
### 6、组件内部不同的状态：记录在 this.state 这个对象上面；更新this.state对象每次执行以后，会自动调用render方法，导致 UI 更新
### 7、"受控"与"非受控"：区别在于这个组件的状态是否可以被外部修改（一个设计得当的组件应该同时支持受控与非受控两个形式）
    开发时，应该避免一个组件成为一个半受控组件
### 8、默认的文件名 index.js|index.ts|index.tsx 路由等书写可以省略文件名称
### 9、umi 中，应用都是单页应用
### 10、config.js|.umirc.js 中的路由配置：path-表示浏览器访问路径；component-相对于 page[s] 的路径
    path 不区分大小写
### 11、代理配置
### 12、Mock 数据：设置模拟数据时需要在工程根目录下的 mock 子目录中的建立文件。
#### 12.1、整个文件需要 export 出一个 js 对象，对象的 key 由 <Http_verb> <Resource_uri> 构成，值是 function；
#### 12.2、利用 res.status 也可以模拟 http 请求出错
    
---
### 归根结底，props 是用来传导数据的，而 state 是数据改变的源泉
  
---
## DVA相关

### 1、前端代码结构
#### 1.1 Page[s] 负责与用户直接打交道：渲染页面、接受用户的操作输入，侧重于展示型交互性逻辑
#### 1.2 Model[s] 负责处理业务逻辑，为 Page[s] 做数据、状态的读写、变换、暂存等
#### 1.3 Service[s] 负责与 HTTP 接口对接，进行纯粹的数据读写

### 2、DVA 的 model 对象说明
#### 2.1 model 的命名空间，只能用字符串。一个大型应用可能包含多个 model，通过 namespace 区分
#### 2.2 当前 model 状态的初始值，表示当前状态
#### 2.3 用于处理同步操作，可以修改 state，由 action 触发。reducer 是一个纯函数，它接受当前的 state 及一个 action 对象。action 对象里面可以包含数据体（payload）作为入参，需要返回一个新的 state
#### 2.4 用于处理异步操作（例如：与服务端交互）和业务逻辑，也是由 action 触发。但是，它不可以修改 state，要通过触发 action 调用 reducer 实现对 state 的间接操作
#### 2.5 action 是 reducers 及 effects 的触发器，一般是一个对象，形如{ type: 'add', payload: todo }，通过 type 属性可以匹配到具体某个 reducer 或者 effect，payload 属性则是数据体，用于传送给 reducer 或 effect
#### 2.6、一个基本的 dva model 最少具备两个成员：namespace（model唯一标识） 和 state（该 model 管理的数据）
```javascript
// dva 中一个典型的 reducer 的写法
someReducer(state /* old state */, { payload }) {
  // ... do calculation
  return {
    // ... build a new object as next state and return it
  };
}
```
```javascript
// dva 中一个典型的 effect 的写法
getData: function* ({ payload }, { call, put }) {
  const data = yield call(SomeService.getEndpointData, payload, 'maybeSomeOtherParams');
  yield put({ type: 'getData_success', payload: data });
}
/**
 *call 其实是一个函数，和 yield 关键字配合使用处理异步逻辑，call 第一个参数是一个函数，要求函数返回 Promise，之后的参数是该函数调用时的入参。yield call 调用后就阻塞了，Promise 被解析后，得到异步调用的结果，存储到 data 中，然后程序才能继续进行。
 *put 也是一个函数，put 和 yield 配合使用，用来派发一个 action，和 dispatch 的功能 一模一样！只不过是在 effect 函数中使用而已
 **/
```
#### 2.7、connect 是连接 dva 和 React 两个平行世界的关键
##### 2.7.1、让组件获取到两样东西：model 中的数据；驱动 model 改变的方法
##### 2.7.2、本质上只是一个 javascript 函数，通过 @ 装饰器语法使用，放置在组件定义的上方
##### 2.7.3、可以接受入参。第一个参数最常用，是一个函数，mapStateToProps，顾名思义就是把 dva model 中的 state 通过组件的 props 注入给组件。通过实现这个函数就能把 dva model 的 state 注入给组件
#### 2.8、connect 常用参数说明
##### 2.8.1、mapStateToProps 这个函数的入参 state 其实是 dva 中所有 state 的总合(包含了所有 namespace 下的 state，我们自己定义的 dva model state 就是以 namespace 为 key 的 state 成员)；dva 期待 mapStateToProps 函数返回一个 对象，这个对象会被 dva 并入到当前组件的 props 中
##### 2.8.2、mapDispatchToProps 以 dispatch 为入参，返回一个挂着函数的对象，这个对象上的函数会被 dva 并入 props，注入给当前组件使用；dispatch 函数就是组件和 dva model 打交道的唯一途径
### 3、DVA 可以帮助我们把 state 上提到所有 React组件 之上
- 页面通过调用 dispatch 函数来驱动 dva model state 的改变；
- 改变后的 dva model state通过 connect 方法注入页面。

     
	 组件不再负责管理数据，组件只是通过 connect 向 dva 声明所需数据 
### 4、实际开发中我们希望把数据逻辑和视图逻辑分开管理在不同的模块中（必要时数据可以提供给不同的组件使用，即数据共享）
### 5、React 有一个基本哲学：数据映射到视图。无论什么操作，本质都是去触发 state 的改变，state 的改变再映射回视图
### 6、在 umi 中我们默认开启了 CSS modules 特性，这使得 class 名需要通过变量属性去引用
    如果一个 CSS 文件仅仅是作用在某个局部的话，我们称这样一个 CSS 文件为 CSS module
    CSS modules 是从工具层面给出的一套生成局部 CSS 的规范，本质还是生成全局唯一的 CSS 定义。webpack 实现了这套规范。umi 依赖 webpack，默认开启了 CSS modules 特性
    很多 CSS 选择器是不会被 CSS Modules 处理的，比如 body、div 、a 这样的 HTML 标签名就不会。我们推荐如果要定义局部 css 样式/动画， 只使用 class 或 @keyframe
    在工具的支持下，一个 Less 文件首先会经过 CSS modules 的编译，把类名全局唯一化，然后才被 Less preprocessor 编译成为 CSS 文件。正因此，Less 文件可以和 CSS modules 无缝联合使用
    
    在w3c 规范中，CSS 始终是「全局的」；
    编译后实际的 class 名称为 style__hello__<hash数值>，确保全局唯一  ==> 变相的使 CSS 成为非全局的
    全局唯一带来的特性就是样式不会被覆盖（如果需要被覆盖：global 语法，允许声明一个 class 名称不可被改写）
    
```javascript
// global 语法使用
:global(.ant-btn) {
  // ...
}

/**
 * global 不应该被滥用
 * 若想在某个文件中覆盖 antd 样式，请加上一个类似 .override-ant-btn 的类包裹住 global 修饰的名称，以避免全局样式声明分散在项目各处
 **/
```

### 7、更换 antd 主题：批量修改，依赖于 less 的 modifyVars 机制，在配置文件 config/config.js|.umirc.js 中配置对应的 theme；支持修改的 antd 变量可参考 [这里](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)
### 8、更改全局样式：umi 有一个专门的文件 global.less 来自定义全局样式，这个文件不会被 CSS modules 处理
    全局性地定义 HTML 标签的样式
    全局性地覆盖第三方库的样式