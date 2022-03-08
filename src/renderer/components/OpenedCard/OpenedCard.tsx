import React, {
	useState,
	useEffect,
	useImperativeHandle,
	forwardRef,
	ForwardRefRenderFunction,
} from 'react'
import styles from './OpenedCard.module.scss'
import Svg from 'renderer/components/UI/svg'
import makeFriendlyDate from 'renderer/utils/makeFriendlyDate'
import TextareaAutosize from 'react-textarea-autosize'
import countWordsAndChars from 'renderer/utils/countWordsAndChars/countWordsAndChars'
import { ICard, KeyboardEvent } from 'renderer/types'

const openedCardInitialValue: ICard = { id: null, title: null, description: null, birth: null }

type TTextareaRef = HTMLTextAreaElement | null

interface OpenedCardAPI {
	get: () => ICard
	set: (card: ICard) => void
	reset: () => void
}

interface OpenedCardProps {
	isOpen: boolean
	remove: (id: string) => void
	copy: (id: string) => void
}

const OpenedCard: ForwardRefRenderFunction<OpenedCardAPI, OpenedCardProps> = (
	{ isOpen, remove, copy },
	ref
) => {
	const [openedCard, setOpenedCard] = useState(openedCardInitialValue)

	let titleRef: TTextareaRef = null
	let descriptionRef: TTextareaRef = null

	const fillFields = (card: ICard) => {
		if (titleRef && descriptionRef) {
			titleRef.value = card.title
			descriptionRef.value = card.description
		}
	}

	const clearFields = () => {
		setOpenedCard(() => openedCardInitialValue)

		if (titleRef && descriptionRef) {
			titleRef.value = ''
			descriptionRef.value = ''
		}
	}

	useImperativeHandle(ref, () => ({
		get: () => openedCard,
		set: card => {
			fillFields(card)
			setOpenedCard(() => card)
		},
		reset: () => setTimeout(clearFields, 300),
	}))

	useEffect(() => {
		isOpen && document.addEventListener('keydown', handleKeyDown)

		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [isOpen])

	function handleKeyDown(event: KeyboardEvent) {
		// CTRL + K
		if (event.ctrlKey && event.keyCode === 75) remove(openedCard.id)
	}

	return (
		<div data-id={openedCard.id} className={`${styles.openedCard}`}>
			<TextareaAutosize
				ref={tag => (titleRef = tag)}
				className={styles.title}
				placeholder="Title"
				minRows={1}
				onChange={({ target }) =>
					setOpenedCard(previousState => ({ ...previousState, title: target.value }))
				}
			/>
			<TextareaAutosize
				ref={tag => (descriptionRef = tag)}
				minRows={5}
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
				<div className={styles.birth}>
					<aside>
						<Svg width="22px" height="22px" id="calc" />
					</aside>
					{countWordsAndChars(openedCard.description)}
				</div>
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
