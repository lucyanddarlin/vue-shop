import { reqAddressInfo, reqOrderInfo } from '@/api/index'
const state = {
	addressInfo: [],
	orderInfo: {},
}
const actions = {
	async getAddressInfo({ commit }) {
		let result = await reqAddressInfo()
		if (result.code == 200) {
			commit('updateAddressInfo', result.data)
		}
	},
	async getOrderInfo({ commit }) {
		let result = await reqOrderInfo()
		if (result.code == 200) {
			commit('updateOrderInfo', result.data)
		}
	},
}
const mutations = {
	updateAddressInfo(state, addressInfo) {
		state.addressInfo = addressInfo
	},
	updateOrderInfo(state, orderInfo) {
		state.orderInfo = orderInfo
	},
}
const getters = {}

export default {
	state,
	actions,
	mutations,
	getters,
}
