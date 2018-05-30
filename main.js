
// 导入Vue
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import App from './app.vue';
import Layout from './views/layout.vue';
import Index from './views/index.vue';
import About from './views/about.vue';
import User from './views/user.vue';
import Table from './views/table.vue';
import Page2 from './views/page2.vue';
import Page3 from './views/page3.vue';
import Page4 from './views/page4.vue';
import Page5 from './views/page5.vue';
import Page6 from './views/page6.vue';

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(VueRouter);

const Routers = [
    {
        path: '/',
        component: Layout,
        name: '导航一',
        iconCls: 'el-icon-message',
        children: [
            {path: '/main', component: Index, name: '主页'},
            {path: '/about', component: About, name: '关于'},
            {path: '/table', component: Table, name: '表格'},
        ] 
    },
    {
    	path: '/',
        component: Layout,
        name: '导航二',
        iconCls: 'el-icon-menu',
        children: [
            {path: '/page2', component: Page2, name: '选项2-1'},
            {path: '/page3', component: Page3, name: '选项2-2'},
            {path: '/page4', component: Page4, name: '选项2-3'},
        ] 
    },
    {
    	path: '/',
        component: Layout,
        name: '导航三',
        iconCls: 'el-icon-setting',
        children: [
            {path: '/page5', component: Page5, name: '选项3-1'},
            {path: '/page6', component: Page6, name: '选项3-2'},
        ] 
    },
    /*
	{
		path: '/index',
		meta: {
			title: '首页'
		},
		component: (resolve) => require(['./views/index.vue'], resolve)
	},
	{
		path: '/about',
		meta: {
			title: '关于'
		},
		component: (resolve) => require(['./views/about.vue'], resolve)
	},
	{
		path: '/user/:id',
		meta: {
			title: '个人主页'
		},
		component: (resolve) => require(['./views/user.vue'], resolve)
	},
	{
		path: '*',
		redirect: '/index'
	}
    */
];

const RouterConfig = {
	// 使用HTML5的Histroy路由模式
	//mode: 'history',
	routes: Routers
}

const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
	window.document.title = to.meta.title;
	next();
})

// 创建Vue根实例
new Vue({
	el: '#app',
	router: router,
	render: h => h(App)
});
