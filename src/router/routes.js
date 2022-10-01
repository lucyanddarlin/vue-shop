// 导入路由模块
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCardSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

// 引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default [
	{
		path: '/node_markdown',
		name: 'node_markdown',
		component: () => import('@/pages/markdown'),
		meta: {
			show: false,
			header: 1,
		},
	},
	{
		path: '/center',
		name: 'center',
		component: Center,
		meta: {
			show: true,
		},
		children: [
			{
				path: 'myorder',
				component: MyOrder,
			},
			{
				path: 'grouporder',
				component: GroupOrder,
			},
		],
	},
	{
		path: '/paysuccess',
		name: 'paysuccess',
		component: PaySuccess,
		meta: {
			show: true,
		},
	},
	{
		path: '/pay',
		name: 'pay',
		component: Pay,
		meta: {
			show: true,
		},
		beforeEnter: (to, from, next) => {
			if (from.path == '/trade') {
				next()
			} else {
				next(false)
			}
		},
	},
	{
		path: '/trade',
		name: 'trade',
		component: Trade,
		meta: {
			show: true,
		},
		beforeEnter: (to, from, next) => {
			if (from.path == '/shopcart') {
				next()
			} else {
				next(false)
			}
		},
	},
	{
		path: '/shopcart',
		name: 'shopcart',
		component: ShopCart,
		meta: {
			show: true,
		},
	},

	{
		path: '/addcardsuccess',
		name: 'addcardsuccess',
		component: AddCardSuccess,
		meta: {
			show: true,
		},
	},
	{
		path: '/detail/:goodsId',
		component: Detail,
		meta: {
			show: true,
		},
	},
	{
		path: '/home',
		component: Home,
		meta: {
			show: true,
		},
	},
	{
		path: '/login',
		component: Login,
		name: 'login',
		meta: {
			show: false,
		},
	},
	{
		path: '/search/:keyword?',
		component: Search,
		name: 'search',
		// 布尔值传递 props 只能传递 params 参数
		// props: true,
		// 对象传递
		// props: {a: 1, b: 2},
		// 函数传递
		props: ($router) => ({
			keyword: $router.params.keyword,
			k: $router.query.k,
		}),
		meta: {
			show: true,
		},
	},
	{
		path: '/register',
		component: Register,
		meta: {
			show: false,
		},
	},
	// 定义重定向路由
	{
		path: '*',
		redirect: '/home',
	},
]
