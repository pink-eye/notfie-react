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
	packagerConfig: {},
	makers: [
		{
			name: '@electron-forge/maker-squirrel',
			config: {
				iconUrl: 'https://i.imgur.com/yCUm713.png',
			},
		},
		{
			name: '@electron-forge/maker-zip',
			platforms: ['darwin'],
		},
		{
			name: '@electron-forge/maker-deb',
			config: {},
		},
		{
			name: '@electron-forge/maker-rpm',
			config: {},
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
