import React, { FC, memo, MouseEvent, useEffect } from 'react'
import queryClosest from 'renderer/utils/queryClosest'
import Svg from 'renderer/components/UI/svg'
import sidebarStyles from '../Sidebar.module.scss'
import navbarStyles from './Navbar.module.scss'
import { ITabState, ITab, KeyboardEvent } from 'renderer/types'

interface NavbarProps {
	tabState: ITabState
	changeTab: (tab: ITab) => void
}

const Navbar: FC<NavbarProps> = ({ tabState = {}, changeTab = () => {} }) => {
	const handleClick = ({ target }: MouseEvent) => {
		if (target instanceof HTMLElement) {
			let btnTab = queryClosest(target, '.tab')

			if (!btnTab) return

			const reqTab = tabState.tabArray.find(([tab]) => tab === btnTab.dataset.tab)
			changeTab(reqTab)
		}
	}

	const handleKeyDown = (event: KeyboardEvent) => {
		// CTRL + SHIFT + E
		if (event.ctrlKey && event.shiftKey && event.keyCode === 69) {
			let firstSidebarBtn: HTMLElement = document.querySelector(`.${sidebarStyles.action}`)

			firstSidebarBtn?.focus()

			firstSidebarBtn = null
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [])

	return (
		<aside className={`${sidebarStyles.sidebar} ${navbarStyles.navbar}`} onClick={handleClick}>
			<ul className={`${sidebarStyles.list} ${navbarStyles.list}`}>
				{tabState.tabArray?.map(([tab, component, options = null]) => {
					const currentTab = tabState.activeTab[0]

					let width = '30px'
					let height = '30px'

					if (options) {
						if (options.hasOwnProperty('icon')) {
							width = options.icon.width
							height = options.icon.height
						}
					}

					return (
						<li key={tab} className={`${sidebarStyles.item} ${navbarStyles.item}`}>
							<button
								data-tab={tab}
								className={`${sidebarStyles.action} tab btn-reset ${
									tab === currentTab ? sidebarStyles.isCurrent : ''
								}`}
							>
								<Svg width={width} height={height} id={`${tab.toLowerCase()}`} />
							</button>
						</li>
					)
				})}
			</ul>
		</aside>
	)
}

export default memo(Navbar)
