// 导入
import Vue from 'vue'
import Vuex from 'vuex'

// 引入小仓库模块
import home from './home'
import search from './search'
import goodinfo from './goodinfo'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'
Vue.use(Vuex)

// 向外共享 vuex 实例
export default new Vuex.Store({
	modules: {
		home,
		search,
		goodinfo,
		shopcart,
		user,
		trade,
	},
})
