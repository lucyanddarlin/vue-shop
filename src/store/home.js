// home 模块仓库
import Vue from 'vue'
import Vuex from 'vuex'

// 导入 api
import { reqCateGoryList, reqBannerList, reqFloorList } from '@/api'
Vue.use(Vuex)
// 核心概念 state actions mutations getters
const state = {
	// 创建三级联动菜单数组
	CateGoryList: [],
	// 轮播图数据
	bannerList: [],
	// floor 数组
	floorList: [],
}

const actions = {
	// 发送请求获取 菜单数组
	async getCateGoryList({ commit }) {
		const result = await reqCateGoryList()
		if (result.code === 200) {
			commit('updateCateGoryList', result.data.slice(0, 16))
		}
	},
	// 发送请求获取 轮播图数据
	async getBannerList({ commit }) {
		const result = await reqBannerList()
		commit('updateBannerList', result.data)
	},
	// 发送请求获取 floor 数据
	async getFloorList({ commit }) {
		const result = await reqFloorList()
		if (result.code == 200) {
			commit('updateFloorList', result.data)
		}
	},
}

const mutations = {
	// 更新 菜单数组
	updateCateGoryList(state, CateGoryList) {
		state.CateGoryList = CateGoryList
	},
	// 更新 轮播图数组
	updateBannerList(state, bannerList) {
		state.bannerList = bannerList
	},
	// 更新 floor 数组
	updateFloorList(state, floorList) {
		state.floorList = floorList
	},
}

const getters = {}

// 向外共享 vuex 实例
export default {
	// namespaced: true,
	state,
	actions,
	mutations,
	getters,
}
