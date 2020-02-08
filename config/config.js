//约定配置文件
export default {
    //使用单数来作为约定目录，受影响目录包括：page component model service
    singular: true,
    //插件
    plugins: [
        ['umi-plugin-react', {
            //这里暂时还没有添加配置，该插件还不会有作用
            dva: true,
            antd: true
        }]
    ],
    //配置式路由 - 当有了 routes 的配置之后 umi 就不会再执行约定式对应的路由逻辑了，而是直接使用通过配置声明的路由
    routes: [
        {
            /*当需要一个 layout 作为展示，可以将 layout 设置为顶级路由，需要 layout 效果的继续下挂*/
            /*TODO 通过此种路由设置，可避免在代码中使用 BasicLayout 进行代码嵌套*/
            //访问 / 下面的路由时，使用 page 文件夹下的 ../layout 布局文件进行渲染页面，默认展示 HelloWorld 组件
            //并将对应组件渲染到 layout 文件中的 children 部分
            path: '/',
            component: "../layout",
            routes: [
                {
                    path: 'puzzlecards',
                    component: './puzzlecards'
                }, {
                    path: '/',
                    component: './HelloWorld',
                }, {
                    path: '/HelloWorld',
                    component: './HelloWorld'
                }, {
                    path: '/dashboard',
                    routes: [
                        {
                            path: '/dashboard/analysis',
                            component: './Dashboard/Analysis'
                        }, {
                            path: '/dashboard/monitor',
                            component: './Dashboard/Monitor'
                        }, {
                            path: '/dashboard/workplace',
                            component: './Dashboard/Workplace'
                        }
                    ]
                }
            ]
        },
        // {
        //     //浏览器访问路径 TODO 不区分大小写？？？
        //     path: '/',
        //     //相对于 page 目录的相对路径
        //     component: './HelloWorld'
        // }
    ]
};