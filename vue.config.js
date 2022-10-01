module.exports = {
	productionSourceMap: false,
	devServer: {
		proxy: {
			'/api': {
				target: 'http://gmall-h5-api.atguigu.cn',
				// pathRewrite: { '^/api': '' },
			},
		},
	},
	configureWebpack: (config) => {
		config.module.rules.push({
			test: /\.md$/,
			use: [
				{
					loader: 'text-loader',
					options: {
						prefix: false,
					},
				},
			],
		})
	},
}
