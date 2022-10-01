import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button, MessageBox } from 'element-ui'
// import { reqSearchList } from './api'

// 引入仓库
import store from '@/store'

// 使用 mock
import '@/mock/mock'
// 引入 swiper css
import 'swiper/css/swiper.css'

// 统一管理 API
import * as API from '@/api'
Vue.config.productionTip = false
// 注册全局组件：三级联动组件
Vue.component(TypeNav.name, TypeNav)
// 注册全局轮播图组件
Vue.component(Carousel.name, Carousel)
// 注册全局分页器组件
Vue.component(Pagination.name, Pagination)

// 按需导入 element ui
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

//引入表单验证组件
import '@/plugins/valadiate'

new Vue({
	render: (h) => h(App),
	// 配置全局事件总线
	beforeCreate() {
		Vue.prototype.$bus = this
		Vue.prototype.$API = API
	},
	// 注册路由
	router,
	// 注册仓库: 组件实例的身上会多一个属性 $store
	store,
}).$mount('#app')
