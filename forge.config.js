const path = require('path')

module.exports = {
	publishers: [
		{
			name: '@electron-forge/publisher-github',
			config: {
				repository: {
					owner: 'pink-eye',
					name: 'notfie-react',
				},
			},
		},
	],
	packagerConfig: {
		name: 'notfie',
		icon: path.resolve(__dirname, 'assets/icon'),
		platform: 'all',
	},
	makers: [
		{
			name: '@electron-forge/maker-squirrel',
			config: {
				loadingGif: path.join(__dirname, 'assets/loading.gif'),
				iconUrl:
					'https://raw.githubusercontent.com/pink-eye/notfie-react/master/assets/icon.ico',
			},
		},
		{
			name: '@electron-forge/maker-dmg',
			config: {
				icon: path.resolve(__dirname, 'assets/icon.icns'),
			},
		},
		{
			name: '@electron-forge/maker-zip',
			platforms: ['darwin'],
		},
		{
			name: '@electron-forge/maker-deb',
			config: {
				options: {
					icon: path.resolve(__dirname, 'assets/icon.png'),
					homepage: 'https://github.com/pink-eye/notfie-react',
				},
			},
		},
		{
			name: '@electron-forge/maker-rpm',
			config: {
				options: {
					icon: path.resolve(__dirname, 'assets/icon.png'),
					homepage: 'https://github.com/pink-eye/notfie-react',
				},
			},
		},
	],
	plugins: [
		[
			'@electron-forge/plugin-webpack',
			{
				devServer: {
					liveReload: false,
					hot: false,
				},
				mainConfig: './webpack.main.config.js',
				renderer: {
					config: './webpack.renderer.config.js',
					entryPoints: [
						{
							html: './src/renderer/index.html',
							js: './src/renderer',
							name: 'main_window',
							preload: {
								js: './src/main/preload.js',
							},
						},
					],
				},
			},
		],
	],
}
