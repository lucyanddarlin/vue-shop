<template>
	<div>
		<div class="markdown-body">
			<MarkdownItVue :content="content"></MarkdownItVue>
		</div>
	</div>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import md from './node_study.md'

export default {
	components: {
		MarkdownItVue,
	},
	data() {
		return {
			content: md,
		}
	},
}
</script>

<style lang="less" scoped>
.markdown-body {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin: 40px 100px;
}
</style>
