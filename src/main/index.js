const { app, BrowserWindow, globalShortcut, Tray, Menu, shell } = require('electron')
const path = require('path')

if (require('electron-squirrel-startup')) app.quit()

const APP_NAME = 'Notfie'
const URL_HOMEPAGE = 'https://github.com/pink-eye/notfie-react'
let mainWindow = null
let tray = null
let icon = ''
let isAppQuitting = false

const isDevelopment = process.env.NODE_ENV === 'development'

const createTray = () => {
	if (!tray) {
		tray = new Tray(icon)

		tray.setToolTip(APP_NAME)
		tray.on('click', () =>
			mainWindow.isMinimized() ? mainWindow.show() : mainWindow.minimize()
		)

		const contextMenu = Menu.buildFromTemplate([
			{ label: `Open ${APP_NAME}`, click: () => mainWindow.show() },
			{ label: 'Help', click: () => shell.openExternal(URL_HOMEPAGE) },
			{ type: 'separator' },
			{ label: `Quit ${APP_NAME}`, click: () => app.exit() },
		])

		tray.setContextMenu(contextMenu)
	}
}

const handleReadyToShow = () => {
	mainWindow.show()
	mainWindow.focus()
}

const chooseIconByPlatform = platform => {
	switch (platform) {
		case 'win32':
			return path.resolve(__dirname, 'assets', 'icon.ico')

		case 'darwin':
			return path.resolve(__dirname, 'assets', 'icon.icns')

		case 'linux':
			return path.resolve(__dirname, 'assets', 'icon.png')
	}
}

const createWindow = () => {
	icon = chooseIconByPlatform(process.platform)

	mainWindow = new BrowserWindow({
		frame: false,
		fullscreen: true,
		offscreen: false,
		contextIsolation: true,
		backgroundColor: '#0c1b31',
		show: false,
		enableRemoteModule: false,
		minWidth: 320,
		icon,
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	})

	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

	createTray()

	mainWindow.on('ready-to-show', handleReadyToShow)

	mainWindow.on('show', () => mainWindow.setSkipTaskbar(false))

	mainWindow.on('minimize', () => mainWindow.setSkipTaskbar(true))

	mainWindow.on('close', event => {
		if (isAppQuitting) return

		event.preventDefault()
		mainWindow.minimize()
	})

	mainWindow.on('closed', () => (mainWindow = null))
}

const installExtensions = () => {
	const installer = require('electron-devtools-installer')
	const extensions = ['REACT_DEVELOPER_TOOLS']

	return installer
		.default(extensions.map(name => installer[name]))
		.then(name => console.log(`Added Extension:  ${name}`))
		.catch(err => console.log('An error occurred: ', err))
}

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})

app.on('before-quit', () => (isAppQuitting = true))

app.on('ready', () => globalShortcut.register('CmdOrCtrl + Alt + T', () => mainWindow.show()))

app.whenReady()
	.then(() => {
		isDevelopment && installExtensions()

		createWindow()

		app.on('activate', () => mainWindow === null && createWindow())
	})
	.catch(console.log)
