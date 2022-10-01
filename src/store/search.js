// search 模块仓库
import Vue from 'vue'
import Vuex from 'vuex'
import { reqSearchList } from '@/api'

Vue.use(Vuex)
// 核心概念 state actions mutations getters
const state = {
	// 搜索列表
	searchList: {},
}

const actions = {
	// 请求 搜索列表 数据
	async getSearchList({ commit }, params = {}) {
		let result = await reqSearchList(params)
		if (result.code == 200) {
			commit('updateSearchList', result.data)
		}
	},
}

const mutations = {
	// 更新 搜索列表 数据
	updateSearchList(state, searchList) {
		state.searchList = searchList
	},
}

// 计算属性，为了简化数据
const getters = {
	// state 是当前仓库的 state 不是全局的 state
	goodsList(state) {
		return state.searchList.goodsList || []
	},
	attrsList(state) {
		return state.searchList.attrsList || []
	},
	trademarkList(state) {
		return state.searchList.trademarkList || []
	},
	total(state) {
		return state.searchList.total || 0
	},
}

// 向外共享 vuex 实例
export default {
	state,
	actions,
	mutations,
	getters,
}
