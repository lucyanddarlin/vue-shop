import { repCartList, reqDelCartById, reqChangeChecked } from '@/api/index'

const state = {
	cartList: [],
}

const actions = {
	// 获取购物车商品数据
	async getCartList({ commit }) {
		let result = await repCartList()
		if (result.code == 200) {
			commit('updateCartList', result.data)
		}
	},
	// 删除购物车商品
	async delCartList({ commit }, skuId) {
		let result = await reqDelCartById(skuId)
		if (result.code == 200) {
			return 'ok'
		} else {
			console.log(commit)
			return Promise.reject(new Error('failed'))
		}
	},
	// 更改购物车商品选中状态
	async changeChecked({ commit }, { skuId, isChecked }) {
		let result = await reqChangeChecked(skuId, isChecked)
		if (result.code == 200) {
			return 'ok'
		} else {
			console.log(commit)
			return Promise.reject(new Error('failed'))
		}
	},
	// 删除 购物车 所有商品
	delAllCart({ getters, dispatch }) {
		let PromiseAll = []
		getters.cartlist.cartInfoList.forEach((cart) => {
			let promise =
				cart.isChecked == 1 ? dispatch('delCartList', cart.skuId) : ''
			PromiseAll.push(promise)
		})
		// Promise.all 参数是一个数组，数组里面每个对象都是 promise
		// 当数组中的所有为成功时，Promise.all 返回 成功
		return Promise.all(PromiseAll)
	},
}

const mutations = {
	updateCartList(state, cartList) {
		state.cartList = cartList
	},
}

const getters = {
	cartlist(state) {
		return state.cartList[0] || {}
	},
}

export default {
	state,
	actions,
	mutations,
	getters,
}
