import React, { memo } from 'react'
import Svg from 'renderer/components/UI/svg'
import queryClosest from 'renderer/utils/queryClosest'
import styles from './Sidebar.module.scss'

const Sidebar = ({ tabState = {}, changeTab = () => {}, extraItems = [], position }) => {
	const handleClick = ({ target }) => {
		let btnTab = queryClosest(target, '.tab')
		let btnAction = queryClosest(target, '.action')

		if (!btnTab && !btnAction) return

		if (btnTab) {
			const reqTab = tabState.tabArray.find(([tab]) => tab === btnTab.dataset.tab)
			changeTab(reqTab)
		}

		if (btnAction) {
			const reqAction = extraItems.find(item => item.text === btnAction.dataset.action)
			reqAction.action()
		}
	}

	return (
		<aside className={`${styles.sidebar} ${styles[`${position}`]}`} onClick={handleClick}>
			<ul className={styles.list}>
				{tabState.tabArray?.map(([tab]) => {
					const currentTab = tabState.activeTab[0]

					return (
						<li key={tab} className={styles.item}>
							<button
								data-tab={tab}
								className={`${styles.action} tab btn-reset ${
									tab === currentTab ? styles.isCurrent : ''
								}`}
							>
								<Svg width="30px" height="30px" id={`${tab.toLowerCase()}`} />
							</button>
						</li>
					)
				})}
				{extraItems.map(extraItem => (
					<li key={extraItem.text} className={styles.item}>
						<button
							data-action={extraItem.text}
							className={`${styles.action} ${
								extraItem.accent ? styles.accent : ''
							} action btn-reset`}
						>
							{extraItem.icon}
						</button>
					</li>
				))}
			</ul>
		</aside>
	)
}

export default memo(Sidebar)
