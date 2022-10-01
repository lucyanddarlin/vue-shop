<template>
	<div>
		<header class="header">
			<!-- 头部的第一行 -->
			<div class="top">
				<div class="container">
					<div class="loginList">
						<p>尚品汇欢迎您！</p>
						<p v-if="!username">
							<span>请</span>
							<!-- 声明式导航 -->
							<router-link to="/login">登录</router-link>
							<router-link to="/register" class="register"
								>免费注册</router-link
							>
						</p>
						<p v-else>
							<span>{{ username }}</span>
							<a class="register" @click="userLogout">
								退出登录</a
							>
						</p>
					</div>
					<div class="typeList">
						<router-link to="/center/myorder">我的订单</router-link>
						<router-link to="/shopcart">我的购物车</router-link>
						<a href="###">我的尚品汇</a>
						<a href="###">尚品汇会员</a>
						<a href="###">企业采购</a>
						<a href="###">关注尚品汇</a>
						<a href="###">合作招商</a>
						<a href="###">商家后台</a>
					</div>
				</div>
			</div>
			<!--头部第二行 搜索区域-->
			<div class="bottom">
				<h1 class="logoArea">
					<div class="logo">
						<router-link to="/home">
							<img src="./images/logo.png" alt="" />
						</router-link>
					</div>
				</h1>
				<div class="searchArea">
					<form action="###" class="searchForm">
						<input
							type="text"
							id="autocomplete"
							class="input-error input-xxlarge"
							v-model="keyword"
						/>
						<button
							class="sui-btn btn-xlarge btn-danger"
							type="button"
							@click="toSearch"
						>
							搜索
						</button>
					</form>
				</div>
			</div>
		</header>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			keyword: '',
		}
	},
	mounted() {
		// 在这里 $on 的回调函数要使用箭头函数的形式
		// 因为在这里 this 要指向当前实例
		// 如果不是箭头函数的话，this 会指向实例 $bus
		this.$bus.$on('clear', () => {
			this.keyword = ''
		})
	},
	computed: {
		...mapState({
			userinfo: (state) => state.user.userinfo,
		}),
		username() {
			return this.userinfo.name
		},
	},
	methods: {
		toSearch() {
			// 编程式导航
			// 字符串传参
			// this.$router.push('/search/' + this.keyword + '?k=' + this.keyword)

			// 模板字符传参
			// this.$router.push(`/search/${this.keyword}?k=${this.keyword}`)
			// 对象传参 用的最多
			// this.$router.push({name: 'search', params: {keyword: this.keyword}, query: {k: this.keyword}})

			// 路由传递参数（对象写法）path 是否可以结合 parmas 参数一起使用
			// 不可以

			// 如何指定 parmas 参数可传可不传
			// 在路由占位符后加 ? ，表示 parmas 参数可传可不传
			// this.$router.push({name: 'search', query: {k: this.keyword}})

			// parmas 参数可以传递也可以不传递，但是如果传递是空串，如何解决
			//  使用 || 判断 parmas 是否为空串，为空串就替代为 undefined
			// this.$router.push({name: 'search', params: {keyword: '' || undefined}, query: {k: this.keyword}})

			// 路由组件能不能传递 props 数据
			// 可以
			// this.$router.push({name: 'search', params: {keyword: this.keyword}, query: {k: this.keyword}}, ()=>{}, (err)=>{console.log(err)})

			// NavigationDuplicated 的警告错误 解决方法
			// 给 push 函数传入相应的成功与失败回调
			// this.$router.push({name: 'search', params: {keyword: this.keyword}, query: {k: this.keyword}}, ()=>{}, (err)=>{console.log(err)})
			// 重写 push | replace 方法
			let localtion = {
				name: 'search',
				params: { keyword: this.keyword || undefined },
			}
			localtion.query = this.$route.query
			this.$router.push(localtion)
		},
		// 用户退出登录
		async userLogout() {
			try {
				await this.$store.dispatch('userLogout')
				this.$router.push('/home')
			} catch (error) {
				alert(error)
			}
		},
	},
}
</script>

<style scoped lang="less">
.header {
	& > .top {
		background-color: #eaeaea;
		height: 30px;
		line-height: 30px;

		.container {
			width: 1200px;
			margin: 0 auto;
			overflow: hidden;

			.loginList {
				float: left;

				p {
					float: left;
					margin-right: 10px;

					.register {
						border-left: 1px solid #b3aeae;
						padding: 0 5px;
						margin-left: 5px;
					}
				}
			}

			.typeList {
				float: right;

				a {
					padding: 0 10px;

					& + a {
						border-left: 1px solid #b3aeae;
					}
				}
			}
		}
	}

	& > .bottom {
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;

		.logoArea {
			float: left;

			.logo {
				img {
					width: 175px;
					margin: 25px 45px;
				}
			}
		}

		.searchArea {
			float: right;
			margin-top: 35px;

			.searchForm {
				overflow: hidden;

				input {
					box-sizing: border-box;
					width: 490px;
					height: 32px;
					padding: 0px 4px;
					border: 2px solid #ea4a36;
					float: left;

					&:focus {
						outline: none;
					}
				}

				button {
					height: 32px;
					width: 68px;
					background-color: #ea4a36;
					border: none;
					color: #fff;
					float: left;
					cursor: pointer;

					&:focus {
						outline: none;
					}
				}
			}
		}
	}
}
</style>
