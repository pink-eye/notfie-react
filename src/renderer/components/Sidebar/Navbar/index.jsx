import React, { memo, useEffect } from 'react'
import getCloseElement from 'renderer/utils/getCloseElement'
import Svg from 'renderer/components/UI/svg'
import sidebarStyles from '../Sidebar.module.scss'
import navbarStyles from './Navbar.module.scss'

const Navbar = ({ tabState = {}, changeTab = () => {} }) => {
	const handleClick = ({ target }) => {
		let btnTab = getCloseElement(target, 'tab')

		if (!btnTab) return

		const reqTab = tabState.tabArray.find(([tab]) => tab === btnTab.dataset.tab)
		changeTab(reqTab)
	}

	const handleKeyDown = event => {
		// CTRL + SHIFT + E
		if (event.ctrlKey && event.shiftKey && event.keyCode === 69) {
			let firstSidebarBtn = document.querySelector(`.${sidebarStyles.action}`)
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
