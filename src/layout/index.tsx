import * as React from 'react';
import {Component} from 'react';
import {Icon, Layout, Menu} from "antd";
import Link from 'umi/link';

// Header, Footer, Sider, Content组件在Layout组件模块下
const {Header, Footer, Sider, Content} = Layout;

// 引入子菜单组件
const SubMenu = Menu.SubMenu;

class BasicLayout extends Component {
    render() {
        return (
            /*全页布局*/
            <Layout>
                {/*左侧菜单*/}
                <Sider width={256}
                       style={{minHeight: '100vh'}}>
                    {/*LOGO*/}
                    <div style={{height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
                    {/*菜单*/}
                    <Menu theme={"dark"}
                          mode={"inline"}
                          defaultSelectedKeys={['1']}>
                        {/*顶级菜单*/}
                        <Menu.Item key={'1'}>
                            <Icon type={"pie-chart"}/>
                            <span>HelloWorld</span>
                        </Menu.Item>
                        {/*包含下级菜单的顶级菜单*/}
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="dashboard"/>
                                    <span>Dashboard</span>
                                </span>
                            }
                        >
                            <Menu.Item key="2">
                                {/*使用 Link 组件实现路由跳转，相当于 <a>*/}
                                <Link to={'/dashboard/analysis'}>分析页</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to={'/dashboard/monitor'}>监控页</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to={'/dashboard/workplace'}>工作台</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                {/*右侧布局*/}
                <Layout>
                    {/*右侧顶部内容*/}
                    <Header style={{background: '#fff', textAlign: 'center', padding: 0}}>
                        Header
                    </Header>
                    {/*右侧内容*/}
                    <Content style={{margin: '24px 16px 0'}}>
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                            {this.props.children}
                        </div>
                    </Content>
                    {/*右侧页脚*/}
                    <Footer style={{textAlign: 'center'}}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default BasicLayout;