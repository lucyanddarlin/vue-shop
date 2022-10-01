// 配置路由的入口
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '@/store'

// 使用插件
Vue.use(VueRouter)

// 解决 NavigationDuplicated 的警告错误
// 重写 push 和 replace 方法
// 先备份原来的 push 方法
let originPush = VueRouter.prototype.push

VueRouter.prototype.push = function (location, resolve, reject) {
	// 重写原型方式 push 时，要使用 call 或 apply 重定向上下文
	// call 与 apply 相同点
	// 都可以调用函数一次，都可以篡改函数的上下文一次
	// 不同点
	// call 与 apply 传递函数不同，call 传递的参数用逗号隔开，apply 传递参数使用数组的形式
	if (resolve && reject) {
		originPush.call(this, location, resolve, reject)
	} else {
		originPush.call(
			this,
			location,
			() => {},
			() => {}
		)
	}
}

// 配置路由
let router = new VueRouter({
	// 配置路由
	routes,
	//滚动行为
	scrollBehavior() {
		//返回的这个y=0，代表的滚动条在最上方
		return { y: 0 }
	},
})

// 配置路由前置守卫
router.beforeEach(async (to, from, next) => {
	let token = store.state.user.token
	let name = store.state.user.userinfo.name
	// 如果登录了，就不允许跳转到 login

	if (token) {
		if (to.path == '/login') {
			// 登录的情况下 跳转 login （不允许）
			next('/home')
		} else {
			// 登录的情况下 跳转到其他页面
			// 判断用户信息是否存在
			if (name) {
				next()
			} else {
				// 用户信息不存在，重新派发 action 获取用户信息后再放行
				// 获取用户信息
				try {
					await store.dispatch('getUserInfo')
					next()
				} catch (error) {
					// 此处获取用户信息错误的原因是 token 过期
					// 需要清除用户信息，跳转到 login
					try {
						await store.dispatch('userLogout')
						next('/login')
					} catch (error) {
						alert(error)
					}
				}
			}
		}
	} else {
		// 未登录情况，不能跳转到交易相关的 trade pay paysuccess center
		let toPath = to.path
		// console.log(toPath)
		// next()
		if (
			toPath.indexOf('pay') != -1 ||
			toPath.indexOf('trade') != -1 ||
			toPath.indexOf('center') != -1 ||
			toPath.indexOf('shopcart') != -1
		) {
			next('/login?redirect=' + toPath)
		} else {
			next()
		}
	}
})
export default router
