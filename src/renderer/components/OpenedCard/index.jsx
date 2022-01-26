import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import styles from './OpenedCard.module.scss'
import Svg from 'renderer/components/UI/svg'
import makeFriendlyDate from 'renderer/utils/makeFriendlyDate'
import TextareaAutosize from 'react-textarea-autosize'

const openedCardInitialValue = { id: null, title: null, description: null, birth: null }

const OpenedCard = ({ isOpen, remove, copy }, ref) => {
	const [openedCard, setOpenedCard] = useState(openedCardInitialValue)

	let titleRef = null
	let descriptionRef = null

	const fillFields = card => {
		if (titleRef && descriptionRef) {
			titleRef.value = card.title
			descriptionRef.value = card.description
		}
	}

	const clearFields = () => {
		if (titleRef && descriptionRef) {
			titleRef.value = ''
			descriptionRef.value = ''
		}
	}

	const reset = () => {
		setOpenedCard(() => openedCardInitialValue)
		setTimeout(clearFields, 300)
	}

	useImperativeHandle(ref, () => ({
		get: () => openedCard,
		set: card => {
			fillFields(card)
			setOpenedCard(() => card)
		},
		reset,
	}))

	useEffect(() => {
		isOpen && document.addEventListener('keydown', handleKeyDown)

		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [isOpen])

	function handleKeyDown({ ctrlKey, keyCode }) {
		// CTRL + K
		if (ctrlKey && keyCode === 75) remove(openedCard.id)
	}

	return (
		<div data-id={openedCard.id} className={`${styles.openedCard}`}>
			<TextareaAutosize
				ref={tag => (titleRef = tag)}
				className={styles.title}
				placeholder="Title"
				minRows="1"
				onChange={({ target }) =>
					setOpenedCard(previousState => ({ ...previousState, title: target.value }))
				}
			/>
			<TextareaAutosize
				ref={tag => (descriptionRef = tag)}
				minRows="5"
				className={styles.description}
				placeholder="Description"
				onChange={({ target }) =>
					setOpenedCard(previousState => ({
						...previousState,
						description: target.value,
					}))
				}
			/>
			<div className={styles.bottom}>
				<time className={styles.birth}>
					<aside>
						<Svg width="18px" height="18px" id="date" />
					</aside>
					{makeFriendlyDate(openedCard.birth)}
				</time>
				<div className={styles.actions}>
					<button
						className={`${styles.action} btn-reset`}
						aria-label="Copy the content of card"
						onClick={() => copy(openedCard.id)}
					>
						<Svg width="30px" height="30px" id="copy" />
					</button>
					<button
						className={`${styles.action} btn-reset`}
						aria-label="Delete the card"
						onClick={() => remove(openedCard.id)}
					>
						<Svg width="30px" height="30px" id="trash" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default forwardRef(OpenedCard)
