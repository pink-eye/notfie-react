const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')
const path = require('path')

const extraRules = [
	{
		test: /\.s?css$/,
		use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
	},
	{
		test: /\.svg/,
		type: 'asset/resource',
	},
]

rules.push(...extraRules)

module.exports = {
	plugins,
	module: {
		rules,
	},
	resolve: {
		alias: {
			renderer: path.resolve(__dirname, 'src/renderer'),
			main: path.resolve(__dirname, 'src/main'),
		},
		extensions: ['.js', '.ts', '.jsx', '.tsx'],
		preferRelative: true,
	},
	experiments: {
		asyncWebAssembly: true,
	},
}
