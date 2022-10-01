//当前模块，API进行统一管理，即对请求接口统一管理
import requests from '@/api/request'
import mockRequest from '@/api/mockRequest'

//首页三级分类接口
export const reqCateGoryList = () => {
	return requests({
		url: '/product/getBaseCategoryList',
		method: 'GET',
	})
}

// 请求轮播图数据
export const reqBannerList = () => {
	return mockRequest({
		url: '/banner',
		method: 'GET',
	})
}

// 请求 floor 数据
// export const reqFloorList = () => {
//     return mockRequest({
//         url: '/floor',
//         method: 'GET'
//     })
// }
export const reqFloorList = () => mockRequest.get('/floor')

// 请求搜索列表数据
export const reqSearchList = (params) => requests.post('/list', params)

// 请求商品详情数据
export const reqGoodInfo = (goodsId) => requests.get(`/item/${goodsId}`)

// 添加或更新购物车
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpadteShopCart = (skuId, skuNum) =>
	requests.post(`/cart/addToCart/${skuId}/${skuNum}`)

// 请求 购物车 数据
export const repCartList = () => requests.get('/cart/cartList')

// 删除 购物车 数据
// /api/cart/deleteCart/{skuId}
export const reqDelCartById = (skuId) =>
	requests.delete(`/cart/deleteCart/${skuId}`)

// 修改商品 选中 状态
// /api/cart/checkCart/{skuID}/{isChecked}
export const reqChangeChecked = (skuID, isChecked) =>
	requests.get(`/cart/checkCart/${skuID}/${isChecked}`)

// 获取验证码
// /api/user/passport/sendCode/{phone}
export const reqGetcode = (phone) =>
	requests.get(`/user/passport/sendCode/${phone}`)

// 用户 注册
// /api/user/passport/register
export const reqRegister = (data) =>
	requests.post('/user/passport/register', data)

// 用户 登录
// /api/api/user/passport/login
export const reqLogin = (data) => requests.post('/user/passport/login', data)

// 获取用户信息
// http://182.92.128.115/api/user/passport/auth/getUserInfo
export const reqUserInfo = () => requests.get('/user/passport/auth/getUserInfo')

// 请求退出登录
// /api/user/passport/logout
export const reqLogout = () => requests.get('/user/passport/logout')

// 获取用户地址
// /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () =>
	requests.get('/user/userAddress/auth/findUserAddressList')

// 获取用户订单信息
// /api/order/auth/trade
export const reqOrderInfo = () => requests.get('/order/auth/trade')

// 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) =>
	requests.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data)

// 获取交易订单信息
// /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) =>
	requests.get(`/payment/weixin/createNative/${orderId}`)

// 获取订单交付状态
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) =>
	requests.get(`/payment/weixin/queryPayStatus/${orderId}`)

// 获取订单信息
// /api/order/auth/{page}/{limit}
export const reqMyOrderInfo = (page, limit) =>
	requests.get(`/order/auth/${page}/${limit}`)
