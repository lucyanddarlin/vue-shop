<template>
	<div class="pagination">
		<button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
			上一页
		</button>

		<button
			v-if="startNumandendNum.start > 1"
			@click="$emit('getPageNo', 1)"
			:class="{ active: pageNo == 1 }"
		>
			1
		</button>
		<button v-if="startNumandendNum.start > 2">···</button>
		<span v-for="(page, index) in startNumandendNum.end" :key="index">
			<button
				v-if="page > startNumandendNum.start - 1"
				@click="$emit('getPageNo', page)"
				:class="{ active: pageNo == page }"
			>
				{{ page }}
			</button>
		</span>

		<button v-if="startNumandendNum.end < totalPage - 1">···</button>
		<button
			v-if="startNumandendNum.end < totalPage"
			@click="$emit('getPageNo', totalPage)"
			:class="{ active: pageNo == totalPage }"
		>
			{{ totalPage }}
		</button>

		<button
			:disabled="pageNo == totalPage"
			@click="$emit('getPageNo', pageNo + 1)"
		>
			下一页
		</button>

		<button style="margin-left: 30px">共 {{ total }} 条</button>
	</div>
</template>

<script>
export default {
	name: 'Pagination',
	props: ['pageNo', 'pageSize', 'total', 'contiunes'],
	computed: {
		totalPage() {
			return Math.ceil(this.total / this.pageSize)
		},

		startNumandendNum() {
			let start = this.pageNo - parseInt(this.contiunes / 2)
			let end = this.pageNo + parseInt(this.contiunes / 2)
			// 如果 连续页码大于总页码 发生错误
			if (this.contiunes > this.totalPage) {
				start = 1
				end = this.totalPage
			} else {
				// 正常情况
				// 当 start 为 0 或者负数时
				if (start < 1) {
					start = 1
					end = this.contiunes
				}
				// 当 end 超过总页码时
				if (end > this.totalPage) {
					end = this.totalPage
					start = this.totalPage - this.contiunes + 1
				}
			}

			return { start, end }
		},
	},
}
</script>

<style lang="less" scoped>
.pagination {
	text-align: center;

	button {
		margin: 0 5px;
		background-color: #f4f4f5;
		color: #606266;
		outline: none;
		border-radius: 2px;
		padding: 0 4px;
		vertical-align: top;
		display: inline-block;
		font-size: 13px;
		min-width: 35.5px;
		height: 28px;
		line-height: 28px;
		cursor: pointer;
		box-sizing: border-box;
		text-align: center;
		border: 0;

		&[disabled] {
			color: #c0c4cc;
			cursor: not-allowed;
		}

		&.active {
			cursor: not-allowed;
			background-color: #409eff;
			color: #fff;
		}
	}
}
</style>
