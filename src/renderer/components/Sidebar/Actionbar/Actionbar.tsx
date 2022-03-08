import React, { FC, memo, useEffect, ReactElement, ReactNode } from 'react'
import queryClosest from 'renderer/utils/queryClosest'
import Dropdown from 'renderer/components/UI/dropdown/Dropdown'
import sidebarStyles from '../Sidebar.module.scss'
import actionbarStyles from './Actionbar.module.scss'
import { KeyboardEvent } from 'renderer/types'

interface IActionbarItem {
	accent?: boolean
	active?: string
	dropdownItems?: string[]
	icon: ReactNode | ReactElement
	text: string
	type?: string
	action: () => void
	changeState?: (arg: string) => void
}

interface ActionbarProps {
	items: IActionbarItem[]
}

const Actionbar: FC<ActionbarProps> = ({ items }) => {
	const handleClick = ({ target }: React.MouseEvent) => {
		if (target instanceof HTMLElement) {
			let btnAction = queryClosest(target, '.action')

			if (!btnAction) return

			const reqAction = items.find(item => item.text === btnAction.dataset.action)
			reqAction.action()
			btnAction = null
		}
	}

	const handleKeyDown = (event: KeyboardEvent) => {
		// CTRL + SHIFT + A
		if (event.ctrlKey && event.shiftKey && event.keyCode === 65) {
			let actionBar = document.querySelector(`.${actionbarStyles.actionbar}`)
			let firstSidebarBtn: HTMLElement = actionBar.querySelector(`.${sidebarStyles.action}`)

			firstSidebarBtn.focus()

			firstSidebarBtn = null
			actionBar = null
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [])

	return (
		<aside
			className={`${sidebarStyles.sidebar} ${actionbarStyles.actionbar}`}
			onClick={handleClick}
		>
			<ul className={`${sidebarStyles.list} ${actionbarStyles.list}`}>
				{items.map(item =>
					!item.hasOwnProperty('type') ? (
						<li key={item.text} className={sidebarStyles.item}>
							<button
								data-action={item.text}
								className={`${sidebarStyles.action} ${
									item.accent ? sidebarStyles.accent : ''
								} action accent btn-reset`}
							>
								{item.icon}
							</button>
						</li>
					) : (
						<li key={item.text} className={sidebarStyles.item}>
							<Dropdown
								changeState={item.changeState}
								active={item.active}
								headContent={item.icon}
								items={item.dropdownItems}
								option="sort"
								classHead={sidebarStyles.action}
								hasArrow={false}
							/>
						</li>
					)
				)}
			</ul>
		</aside>
	)
}

export default memo(Actionbar)
