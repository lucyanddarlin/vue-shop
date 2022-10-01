<template>
	<div>
		<Header v-show="$route.meta.header != 1"></Header>
		<router-view></router-view>
		<!-- v-show 显示或隐藏 footer -->
		<Footer v-show="$route.meta.show"></Footer>
	</div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
	mounted() {
		// 在组件挂载时，发送请求获取数据
		// 派发 actions
		this.$store.dispatch('getCateGoryList')
	},
	components: {
		Header,
		Footer,
	},
	data() {
		return {}
	},
}
</script>

<style lang="scss" scoped></style>
