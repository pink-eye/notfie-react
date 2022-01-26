import React from 'react'
import Card from 'renderer/components/Card'
import getCloseElement from 'renderer/utils/getCloseElement'
import styles from './Grid.module.scss'
import cardStyles from 'renderer/components/Card/Card.module.scss'

const Grid = ({ cardArray, openCard, removeCard, copyCard }) => {
	const flipBackEachCard = () => {
		let grid = document.querySelector('.grid')
		let flippedCardAll = grid.querySelectorAll(`.card.${cardStyles.isFlipped}`)

		if (flippedCardAll.length === 0) return

		for (let index = 0, { length } = flippedCardAll; index < length; index++) {
			const flippedCard = flippedCardAll[index]
			let gridItem = flippedCard.closest(`.${styles.item}`)
			flippedCard.classList.remove(`${cardStyles.isFlipped}`)
			gridItem.classList.remove(`${styles.isFlipped}`)
			gridItem = null
		}

		flippedCardAll = null
		grid = null
	}

	const handleClick = ({ target }) => {
		let actionBackSide = getCloseElement(target, 'actionBackSide')
		let card = getCloseElement(target, 'card')

		flipBackEachCard()

		if (actionBackSide?.dataset?.action) {
			const { action } = actionBackSide.dataset

			switch (action) {
				case 'remove':
					removeCard(card.dataset.id)
					return
				case 'copy':
					copyCard(card.dataset.id)
					return
			}
		}

		if (!card?.dataset?.id) {
			card = null
			return
		}

		const reqCard = cardArray.find(item => item.id === card.dataset.id)

		openCard(reqCard)

		flipBackEachCard()
		card = null
	}

	const handleContextMenu = ({ target }) => {
		let card = getCloseElement(target, 'card')

		if (!card?.dataset?.id) {
			card = null
			return
		}

		let gridItem = getCloseElement(card, `${styles.item}`)

		gridItem.classList.toggle(`${styles.isFlipped}`)
		card.classList.toggle(`${cardStyles.isFlipped}`)

		card = null
	}

	return (
		<section
			className="grid tab-content"
			onClick={handleClick}
			onContextMenu={handleContextMenu}
		>
			<h2 className="visually-hidden">Your list of tasks</h2>
			<div className="grid__container _container">
				<ul className={`${styles.list} list-reset`}>
					{cardArray?.length > 0 &&
						cardArray.map(card => (
							<li key={card.id} className={styles.item}>
								<Card card={card} openCard={openCard} />
							</li>
						))}
				</ul>
			</div>
		</section>
	)
}

export default Grid
