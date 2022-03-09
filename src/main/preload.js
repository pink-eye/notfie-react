const { contextBridge } = require('electron')
const fs = require('fs')
const path = require('path')
const AutoLaunch = require('auto-launch')

let isMinimizedLaunch = false

let AutoLauncher = new AutoLaunch({
	name: 'notfie-react',
	isHidden: isMinimizedLaunch,
})

const STORAGE_PATH = path.resolve(__dirname, 'storage.json')

contextBridge.exposeInMainWorld('API', {
	readStorage: () =>
		new Promise(resolve => {
			let readerStream = fs.createReadStream(STORAGE_PATH)

			readerStream.setEncoding('UTF8')
			readerStream.on('data', resolve)
		}),

	writeStorage: data => {
		let writerStream = fs.createWriteStream(STORAGE_PATH)

		writerStream.write(JSON.stringify(data))
		writerStream.end()

		writerStream = null
	},

	toggleAutoLauncher: option => {
		AutoLauncher.isEnabled()
			.then(isEnabled => {
				if (isEnabled && option) return

				if (isEnabled && !option) {
					AutoLauncher.disable()
					return
				}

				if (!isEnabled && option) {
					AutoLauncher.enable()
					return
				}
			})
			.catch(console.error)
	},

	toggleMinimizedLaunch: option => (isMinimizedLaunch = option),
})
