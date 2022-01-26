import React, { Suspense, lazy, useState, createContext, useEffect } from 'react'
import Preloader from 'renderer/components/Preloader'
import './styles/themes.scss'
import useMedia from 'renderer/hooks/useMedia'
import Navbar from 'renderer/components/Sidebar/Navbar'
import Home from 'renderer/pages/Home'
import useTab from 'renderer/hooks/useTab'
import AppStorage from 'renderer/utils/AppStorage'
import useToggle from 'renderer/hooks/useToggle'
import { switchTheme, toggleTransition } from 'renderer/utils/user-pref-utils'

const LoadSettings = lazy(() => import('renderer/pages/Settings'))
const LoadShortcuts = lazy(() => import('renderer/pages/Shortcuts'))

export const Context = createContext(null)

export default function App() {
	const [cardArray, setCardArray] = useState()
	const [settings, setSettings] = useState()
	const [isFirstTime, _, n, makeNotFirstTime] = useToggle(true)

	const appStorage = new AppStorage()

	const initStates = () => {
		appStorage.get(null, storage => {
			setCardArray(() => storage.cardArray)
			setSettings(() => storage.settings)
		})
	}

	const isDarkMode = useMedia(['(prefers-color-scheme: dark)'], [true], false)

	useEffect(initStates, [])

	useEffect(() => {
		if (!settings) return

		switchTheme(settings.theme, isDarkMode)
		toggleTransition(settings.disableTransition)
		API.toggleAutoLauncher(settings.launchAppWhenSystemStarts)
		API.toggleMinimizedLaunch(settings.launchMinimized)

		!isFirstTime && appStorage.update('settings', settings)

		makeNotFirstTime()
	}, [settings])

	useEffect(() => {
		if (!isFirstTime && cardArray) appStorage.update('cardArray', cardArray)

		makeNotFirstTime()
	}, [cardArray])

	const [tabState, setTabState, changeTab] = useTab({
		tabArray: [
			['Home', <Home />],
			['Settings', <LoadSettings />, { icon: { width: '33px', height: '33px' } }],
			['Shortcuts', <LoadShortcuts />, { icon: { width: '50px', height: '40px' } }],
		],
		activeTab: ['Home', <Home />],
	})

	const [tab, component] = tabState.activeTab

	return (
		<Context.Provider value={[cardArray, setCardArray, settings, setSettings]}>
			<Suspense fallback={<Preloader />}>
				<Preloader />
				<div className="page-wrapper">
					<Navbar tabState={tabState} changeTab={changeTab} />
					<main className="content">{component}</main>
				</div>
			</Suspense>
		</Context.Provider>
	)
}
