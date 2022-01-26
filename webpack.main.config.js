const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ASSETS_DIR = 'assets'

module.exports = {
	entry: './src/main',
	module: {
		rules: require('./webpack.rules'),
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, ASSETS_DIR),
					to({ context, absoluteFilename }) {
						return `assets/${path.relative(context, absoluteFilename)}`
					},
				},
			],
		}),
	],
}
