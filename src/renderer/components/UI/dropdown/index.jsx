import React from 'react'
import useClickOutside from 'renderer/hooks/useClickOutside'
import useToggle from 'renderer/hooks/useToggle'
import queryClosest from 'renderer/utils/queryClosest'
import styles from './Dropdown.module.scss'

const Dropdown = ({
	active,
	items,
	option,
	changeState,
	classHead = null,
	headContent = active,
	hasArrow = true,
}) => {
	const [isOpen, toggle, _, close] = useToggle(false)

	const dropdownRef = React.useRef(null)

	useClickOutside(dropdownRef, close)

	const focusCurrentChoice = target => {
		let dropdown = queryClosest(target, '.dropdown')
		let dropdownBtnAll = dropdown.querySelectorAll(`.${styles.dropdownBtn}`)

		for (let index = 0, { length } = dropdownBtnAll; index < length; index++) {
			let dropdownBtn = dropdownBtnAll[index]

			if (dropdownBtn.textContent.trim() === active) {
				setTimeout(() => {
					dropdownBtn.focus()

					dropdownBtn = null
					dropdown = null
					dropdownBtnAll = null

					return
				}, 100)
			} else dropdownBtn = null
		}
	}

	const handleToggleDropdown = ({ target }) => {
		toggle()
		focusCurrentChoice(target)
	}

	const handleClickList = ({ target }) => {
		let dropdownBtn = queryClosest(target, `.${styles.btn}`)

		if (!dropdownBtn) {
			dropdownBtn = null
			return
		}

		const newChoice = dropdownBtn.textContent.trim()

		changeState(newChoice)
		focusCurrentChoice(target)

		dropdownBtn = null
	}

	return (
		<div
			ref={dropdownRef}
			id={option}
			className={`${styles.dropdown} ${isOpen ? styles.onOpen : ''} dropdown`}
		>
			<button
				className={`${classHead} ${styles.head} btn-reset`}
				onClick={handleToggleDropdown}
			>
				{headContent}
				{hasArrow && <span className={styles.arrow}></span>}
			</button>
			<ul className={styles.list} onClick={handleClickList}>
				{items.map(item => (
					<li key={item} className={styles.item}>
						<button
							className={`${styles.btn} ${
								active === item ? styles.isCurrent : ''
							} btn-reset`}
						>
							{item}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Dropdown
