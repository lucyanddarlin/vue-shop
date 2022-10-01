import { reqGoodInfo, reqAddOrUpadteShopCart } from '@/api'
import { getUuid } from '@/utils/uuid_token'
const state = {
	// 存放商品信息
	goodInfo: {},
	// 用户临时 token
	uuid_token: getUuid(),
}

const actions = {
	// 发送请求获取 商品信息
	async getGoodInfo({ commit }, goodsid) {
		let result = await reqGoodInfo(goodsid)
		if (result.code == 200) {
			commit('updateGoodInfo', result.data)
		}
	},
	// 发送请求 添加或更新 购物车
	async AddOrUpdateShopCar({ commit }, { skuNum, skuId }) {
		let result = await reqAddOrUpadteShopCart(skuId, skuNum)
		// 当函数名加上 async 之后，返回值就是一个 Promise
		// 可以设置 成功 和 失败的回调
		if (result.code == 200) {
			// 成功的回调
			return 'ok'
		} else {
			console.log(commit)
			// 失败的回调
			return Promise.reject(new Error('failed'))
		}
	},
}

const mutations = {
	// 更新 商品信息 对象
	updateGoodInfo(state, goodInfo) {
		state.goodInfo = goodInfo
	},
}

const getters = {
	categoryView(state) {
		return state.goodInfo.categoryView || {}
	},
	skuInfo(state) {
		return state.goodInfo.skuInfo || {}
	},
	spuSaleAttrList(state) {
		return state.goodInfo.spuSaleAttrList || []
	},
}

export default {
	state,
	actions,
	mutations,
	getters,
}
