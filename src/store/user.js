import {
	reqGetcode,
	reqRegister,
	reqLogin,
	reqUserInfo,
	reqLogout,
} from '@/api/index'
const state = {
	// 验证码
	code: '',
	token: localStorage.getItem('token') || '',
	userinfo: {},
}
const actions = {
	//获取验证码
	async getCode({ commit }, phone) {
		let result = await reqGetcode(phone)
		if (result.code == 200) {
			commit('updateCode', result.data)
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},
	// 用户注册
	async userRegister({ commit }, user) {
		let result = await reqRegister(user)
		if (result.code == 200) {
			console.log(result)
			return 'ok'
		} else {
			console.log(commit)
			return Promise.reject(new Error(`${result.message}`))
		}
	},
	// 用户登录
	async userLogin({ commit }, user) {
		let result = await reqLogin(user)
		console.log(result)
		if (result.code == 200) {
			commit('updateToken', result.data.token)
			return 'ok'
		} else {
			return Promise.reject(new Error(`${result.message}`))
		}
	},
	// 请求用户信息
	async getUserInfo({ commit }) {
		let result = await reqUserInfo()
		if (result.code == 200) {
			commit('updateUserInfo', result.data)
			return 'ok'
		} else {
			return Promise.reject(new Error(`${result.message}`))
		}
	},
	// 用户退出登录
	async userLogout({ commit }) {
		let result = await reqLogout()
		console.log(result)
		if (result.code == 200) {
			// 清楚用户信息
			commit('clearUser')
			return 'ok'
		} else {
			return Promise.reject(new Error(`${result.message}`))
		}
	},
}
const mutations = {
	// 更新 验证码
	updateCode(state, code) {
		state.code = code
	},
	// 更新 token
	updateToken(state, token) {
		state.token = token
		localStorage.setItem('token', token)
	},
	// 更新用户信息
	updateUserInfo(state, userinfo) {
		state.userinfo = userinfo
	},
	// 清除用户信息
	clearUser(state) {
		state.token = ''
		localStorage.setItem('token', '')
		state.userinfo = {}
	},
}
const getters = {}

export default {
	state,
	actions,
	mutations,
	getters,
}
