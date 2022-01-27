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
	},
	makers: [
		{
			name: '@electron-forge/maker-squirrel',
			config: {
				iconUrl:
					'https://raw.githubusercontent.com/pink-eye/notfie-react/master/assets/icon.ico',
			},
		},
		{
			name: '@electron-forge/maker-dmg',
			config: {
				icon: './assets/icon.icns',
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
					icon: './assets/icon.png',
					homepage: 'https://github.com/pink-eye/notfie-react',
				},
			},
		},
		{
			name: '@electron-forge/maker-rpm',
			config: {
				options: {
					icon: './assets/icon.png',
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
