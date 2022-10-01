/* eslint-disable vue/no-parsing-error */
<template>
	<div>
		<TypeNav />
		<div class="main">
			<div class="py-container">
				<!--bread-->
				<div class="bread">
					<ul class="fl sui-breadcrumb">
						<li>
							<a href="#">全部结果</a>
						</li>
					</ul>
					<ul class="fl sui-tag">
						<li class="with-x" v-show="searchParams.categoryName">
							{{ searchParams.categoryName
							}}<i @click="delCate">×</i>
						</li>
						<li class="with-x" v-show="searchParams.keyword">
							{{ searchParams.keyword
							}}<i @click="delKeyword">×</i>
						</li>
						<li class="with-x" v-show="searchParams.trademark">
							{{ searchParams.trademark.split(':')[1]
							}}<i @click="delTrade">×</i>
						</li>
						<li
							class="with-x"
							v-show="searchParams.props.length"
							v-for="(props, index) in searchParams.props"
							:key="index"
						>
							{{ props.split(':')[1]
							}}<i @click="delAttr(index)">×</i>
						</li>
					</ul>
				</div>

				<!--selector-->
				<SearchSelector @tradeInfo="tradeInfo" @attrInfon="attrInfon" />

				<!--details-->
				<div class="details clearfix">
					<div class="sui-navbar">
						<div class="navbar-inner filter">
							<ul class="sui-nav">
								<li
									:class="{ active: isOrder }"
									@click="changeOrder('1')"
								>
									<a>
										综合
										<span
											v-show="isOrder"
											class="iconfont"
											:class="{
												'icon-long-arrow-down': isDesc,
												'icon-long-arrow-up': isAsc,
											}"
										></span>
									</a>
								</li>
								<li
									:class="{ active: isPrice }"
									@click="changeOrder('2')"
								>
									<a>
										价格
										<span
											v-show="isPrice"
											class="iconfont"
											:class="{
												'icon-long-arrow-down': isDesc,
												'icon-long-arrow-up': isAsc,
											}"
										></span>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="goods-list">
						<ul class="yui3-g">
							<li
								class="yui3-u-1-5"
								v-for="goods in goodsList"
								:key="goods.id"
							>
								<div class="list-wrap">
									<div class="p-img">
										<router-link :to="`/detail/${goods.id}`"
											><img :src="goods.defaultImg"
										/></router-link>
									</div>
									<div class="price">
										<strong>
											<em>¥</em>
											<i>{{ goods.price }}.00</i>
										</strong>
									</div>
									<div class="attr">
										<a
											target="_blank"
											href="item.html"
											title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
											>{{ goods.title }}</a
										>
									</div>
									<div class="commit">
										<i class="command"
											>已有<span>2000</span>人评价</i
										>
									</div>
									<div class="operate">
										<a
											href="success-cart.html"
											target="_blank"
											class="sui-btn btn-bordered btn-danger"
											>加入购物车</a
										>
										<a
											href="javascript:void(0);"
											class="sui-btn btn-bordered"
											>收藏</a
										>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<Pagination
						:pageNo="searchParams.pageNo"
						:total="total"
						:contiunes="5"
						:pageSize="searchParams.pageSize"
						@getPageNo="getPageNo"
					></Pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters } from 'vuex'
export default {
	name: 'Search',
	data() {
		return {
			// 将请求搜索的参数 放在 data 便于修改
			searchParams: {
				//产品相应的id
				category1Id: '',
				category2Id: '',
				category3Id: '',
				//产品的名字
				categoryName: '',
				//搜索的关键字
				keyword: '',
				//排序:初始状态应该是综合且降序
				order: '1:desc',
				//第几页
				pageNo: 1,
				//每一页展示条数
				pageSize: 10,
				//平台属性的操作
				props: [],
				//品牌
				trademark: '',
			},
		}
	},

	components: {
		SearchSelector,
	},
	beforeMount() {
		// 在组件挂载之前（在发送搜索请求之前）修改搜索的参数
		// Object.assign
		Object.assign(this.searchParams, this.$route.query, this.$route.params)
	},
	mounted() {
		this.getSearch(this.searchParams)
	},
	computed: {
		...mapGetters(['goodsList', 'attrsList', 'trademarkList', 'total']),

		// 设置计算属性，用于判断排序
		isOrder() {
			return this.searchParams.order.indexOf('1') == 0
		},
		isPrice() {
			return this.searchParams.order.indexOf('2') == 0
		},
		isAsc() {
			return this.searchParams.order.indexOf('asc') != -1
		},
		isDesc() {
			return this.searchParams.order.indexOf('desc') != -1
		},
	},
	methods: {
		// 搜索方法
		getSearch() {
			this.$store.dispatch('getSearchList', this.searchParams)
		},
		// 删除分类 面包屑
		delCate() {
			// this.searchParams.categoryName = undefined | this.searchParams.categoryName = ‘’
			// 当写成 undefined 时，发送请求的就不携带这参数，有利于降低服务器压力
			this.searchParams.categoryName = undefined
			this.searchParams.category1Id = undefined
			this.searchParams.category2Id = undefined
			this.searchParams.category3Id = undefined
			this.getSearch()
			this.$router.push({ name: 'search', params: this.$route.params })
		},
		delKeyword() {
			this.searchParams.keyword = undefined
			this.getSearch()
			this.$bus.$emit('clear')
			this.$router.push({ name: 'search', query: this.$route.query })
		},
		delTrade() {
			this.searchParams.trademark = ''
			this.getSearch()
			this.$router.push({
				name: 'search',
				params: this.$route.params,
				query: this.$route.query,
			})
		},
		delAttr(index) {
			this.searchParams.props.splice(index, 1)
			this.getSearch()
		},
		// 接收子组件传递过来的参数
		tradeInfo(value) {
			// this.searchParams.trademark = value.tmId + ':' + value.tmName
			this.searchParams.trademark = `${value.tmId}:${value.tmName}`
			this.getSearch()
		},
		attrInfon(attr, attrValue) {
			// console.log(attr, attrValue)
			// 处理 属性函数
			let porps = `${attr.attrId}:${attrValue}:${attr.attrName}`
			// 数组去重

			if (this.searchParams.props.indexOf(porps) == -1) {
				this.searchParams.props.push(porps)
			}
			this.getSearch()
		},
		// 接收分页器传递过来的当前页码
		getPageNo(pageNo) {
			this.searchParams.pageNo = pageNo
			this.getSearch()
		},
		// 修改排序方式
		changeOrder(flag) {
			// 设置初始值，便于后续判断
			const originFlag = this.searchParams.order.split(':')[0]
			const originSort = this.searchParams.order.split(':')[1]
			let newOrder = ''
			if (originFlag == flag) {
				console.log('点击了综合')
				newOrder = `${flag}:${originSort == 'desc' ? 'asc' : 'desc'}`
			} else {
				console.log('点击了排序')
				newOrder = `${flag}:${'desc'}`
			}
			this.searchParams.order = newOrder
			this.getSearch()
		},
	},
	watch: {
		// 监听路由的变化 来发送请求
		$route() {
			Object.assign(
				this.searchParams,
				this.$route.query,
				this.$route.params
			)
			this.getSearch()
			// 在发送完请求后，要将分类 id 置空
			this.searchParams.category1Id = undefined
			this.searchParams.category2Id = undefined
			this.searchParams.category3Id = undefined
		},
	},
}
</script>

<style lang="less" scoped>
.main {
	margin: 10px 0;

	.py-container {
		width: 1200px;
		margin: 0 auto;

		.bread {
			margin-bottom: 5px;
			overflow: hidden;

			.sui-breadcrumb {
				padding: 3px 15px;
				margin: 0;
				font-weight: 400;
				border-radius: 3px;
				float: left;

				li {
					display: inline-block;
					line-height: 18px;

					a {
						color: #666;
						text-decoration: none;

						&:hover {
							color: #4cb9fc;
						}
					}
				}
			}

			.sui-tag {
				margin-top: -5px;
				list-style: none;
				font-size: 0;
				line-height: 0;
				padding: 5px 0 0;
				margin-bottom: 18px;
				float: left;

				.with-x {
					font-size: 12px;
					margin: 0 5px 5px 0;
					display: inline-block;
					overflow: hidden;
					color: #000;
					background: #f7f7f7;
					padding: 0 7px;
					height: 20px;
					line-height: 20px;
					border: 1px solid #dedede;
					white-space: nowrap;
					transition: color 400ms;
					cursor: pointer;

					i {
						margin-left: 10px;
						cursor: pointer;
						font: 400 14px tahoma;
						display: inline-block;
						height: 100%;
						vertical-align: middle;
					}

					&:hover {
						color: #28a3ef;
					}
				}
			}
		}

		.details {
			margin-bottom: 5px;

			.sui-navbar {
				overflow: visible;
				margin-bottom: 0;

				.filter {
					min-height: 40px;
					padding-right: 20px;
					background: #fbfbfb;
					border: 1px solid #e2e2e2;
					padding-left: 0;
					border-radius: 0;
					box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

					.sui-nav {
						position: relative;
						left: 0;
						display: block;
						float: left;
						margin: 0 10px 0 0;

						li {
							float: left;
							line-height: 18px;

							a {
								display: block;
								cursor: pointer;
								padding: 11px 15px;
								color: #777;
								text-decoration: none;
							}

							&.active {
								a {
									background: #e1251b;
									color: #fff;
								}
							}
						}
					}
				}
			}

			.goods-list {
				margin: 20px 0;

				ul {
					display: flex;
					flex-wrap: wrap;

					li {
						height: 100%;
						width: 20%;
						margin-top: 10px;
						line-height: 28px;

						.list-wrap {
							.p-img {
								padding-left: 15px;
								width: 215px;
								height: 255px;

								a {
									color: #666;

									img {
										max-width: 100%;
										height: auto;
										vertical-align: middle;
									}
								}
							}

							.price {
								padding-left: 15px;
								font-size: 18px;
								color: #c81623;

								strong {
									font-weight: 700;

									i {
										margin-left: 0;
									}
								}
							}

							.attr {
								padding-left: 15px;
								width: 85%;
								overflow: hidden;
								margin-bottom: 8px;
								min-height: 38px;
								cursor: pointer;
								line-height: 1.8;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;

								a {
									color: #333;
									text-decoration: none;
								}
							}

							.commit {
								padding-left: 15px;
								height: 22px;
								font-size: 13px;
								color: #a7a7a7;

								span {
									font-weight: 700;
									color: #646fb0;
								}
							}

							.operate {
								padding: 12px 15px;

								.sui-btn {
									display: inline-block;
									padding: 2px 14px;
									box-sizing: border-box;
									margin-bottom: 0;
									font-size: 12px;
									line-height: 18px;
									text-align: center;
									vertical-align: middle;
									cursor: pointer;
									border-radius: 0;
									background-color: transparent;
									margin-right: 15px;
								}

								.btn-bordered {
									min-width: 85px;
									background-color: transparent;
									border: 1px solid #8c8c8c;
									color: #8c8c8c;

									&:hover {
										border: 1px solid #666;
										color: #fff !important;
										background-color: #666;
										text-decoration: none;
									}
								}

								.btn-danger {
									border: 1px solid #e1251b;
									color: #e1251b;

									&:hover {
										border: 1px solid #e1251b;
										background-color: #e1251b;
										color: white !important;
										text-decoration: none;
									}
								}
							}
						}
					}
				}
			}

			.page {
				width: 733px;
				height: 66px;
				overflow: hidden;
				float: right;

				.sui-pagination {
					margin: 18px 0;

					ul {
						margin-left: 0;
						margin-bottom: 0;
						vertical-align: middle;
						width: 490px;
						float: left;

						li {
							line-height: 18px;
							display: inline-block;

							a {
								position: relative;
								float: left;
								line-height: 18px;
								text-decoration: none;
								background-color: #fff;
								border: 1px solid #e0e9ee;
								margin-left: -1px;
								font-size: 14px;
								padding: 9px 18px;
								color: #333;
							}

							&.active {
								background-color: #e1251b;
								a {
									background-color: #fff;
									color: #e1251b;
									border-color: #fff;
									cursor: default;
								}
							}

							&.prev {
								a {
									background-color: #fafafa;
								}
							}

							&.disabled {
								a {
									color: #999;
									cursor: default;
								}
							}

							&.dotted {
								span {
									margin-left: -1px;
									position: relative;
									float: left;
									line-height: 18px;
									text-decoration: none;
									background-color: #fff;
									font-size: 14px;
									border: 0;
									padding: 9px 18px;
									color: #333;
								}
							}

							&.next {
								a {
									background-color: #fafafa;
								}
							}
						}
					}

					div {
						color: #333;
						font-size: 14px;
						float: right;
						width: 241px;
					}
				}
			}
		}
	}
}
</style>
