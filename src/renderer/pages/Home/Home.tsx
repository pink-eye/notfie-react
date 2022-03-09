import React, { useEffect, useRef, Suspense, lazy, useState, FC } from 'react'
import useCardArray from 'renderer/hooks/useCardArray'
import Actionbar from 'renderer/components/Sidebar/Actionbar'
import Grid from 'renderer/components/Grid'
import Svg from 'renderer/components/UI/svg'
import Modal from 'renderer/components/Modal/Modal'
import Preloader from 'renderer/components/Preloader/Preloader'
import SearchBar from 'renderer/components/SearchBar'
import { ICard, KeyboardEvent } from 'renderer/types'

const OpenedCard = lazy(() => import('renderer/components/OpenedCard/OpenedCard'))

const Home: FC = () => {
	const [cardArray, _, updateCardArray, removeCard] = useCardArray()
	const [cardArrayClone, setCardArrayClone] = useState<ICard[]>()
	const [sortType, setSortType] = useState('Newest')

	useEffect(() => setCardArrayClone(cardArray), [cardArray])

	const modalRef = useRef(null)
	const searchBarRef = useRef(null)
	const openedCardRef = useRef(null)

	const openModal = () => modalRef.current?.open()
	const closeModal = () => modalRef.current?.close()
	const toggleSearchBar = () => searchBarRef.current?.toggle()
	const closeSearchBar = () => searchBarRef.current?.close()

	const handleCloseModal = () => {
		const openedCard = openedCardRef.current?.get()

		openedCard && updateCardArray(openedCard)

		openedCardRef.current?.reset()
	}

	const removeCardAnimated = (id: string) => {
		let card = document.activeElement
		let gridItem = card.parentElement

		gridItem.addEventListener('transitionend', () => removeCard(id), { once: true })

		import('renderer/components/Grid/Grid.module.scss')
			.then(({ default: stylesGrid }) => {
				gridItem.classList.add(`${stylesGrid.onDeleting}`)

				card = null
				gridItem = null
			})
			.catch(console.error)
	}

	const handleKeyDown = ({ ctrlKey, keyCode }: KeyboardEvent) => {
		const isOpenModal = modalRef.current?.getState()

		if (!isOpenModal && ctrlKey) {
			// CTRL + N
			if (keyCode === 78) handleClickAdd()
			// CTRL + F
			if (keyCode === 70) toggleSearchBar()
			// CTRL + K
			if (keyCode === 75) {
				let { activeElement } = document

				if (activeElement instanceof HTMLElement) {
					const { id } = activeElement.dataset

					if (id) removeCardAnimated(id)
				}

				activeElement = null
			}
		}
		// ESC
		if (keyCode === 27) {
			!isOpenModal && focusFirstCard()
			closeSearchBar()
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)

		return () => document.removeEventListener('keydown', handleKeyDown)
	})

	const openCard = (card: ICard) => {
		openedCardRef.current?.set(card)
		openModal()
	}

	const copyCard = (id: string) =>
		import('renderer/utils/copyToClipboard')
			.then(({ default: copyToClipboard }) => {
				const reqCard = cardArray.find((item: ICard) => item.id === id)
				copyToClipboard(`Title: ${reqCard.title}, Description: ${reqCard.description}`)
			})
			.catch(console.error)

	const handleClickAdd = () =>
		import('uuid')
			.then(({ v4: uuidV4 }) => {
				const newCard = { title: '', description: '', id: uuidV4(), birth: Date.now() }
				openCard(newCard)
			})
			.catch(console.error)

	const handleClickRemove = (cardID: string) => {
		closeModal()
		removeCardAnimated(cardID)
	}

	const handleChangeSearchBar = (text: string) =>
		import('renderer/utils/filterCardArray')
			.then(({ default: filterCardArray }) => {
				if (!cardArray?.length) return

				if (!text.length) {
					setCardArrayClone(cardArray)
					return
				}

				const filteredCardArray = filterCardArray(cardArray, text.toLowerCase())
				setCardArrayClone(filteredCardArray)
			})
			.catch(console.error)

	const sortCardArray = (type: string) =>
		import('renderer/utils/sortCardArray')
			.then(({ default: sortCardArrayByType }) => {
				if (!cardArray?.length) return

				const sortedCardArray = sortCardArrayByType(cardArray, type)
				setCardArrayClone(sortedCardArray)

				setSortType(type)
			})
			.catch(console.error)

	const focusFirstCard = () => {
		if (document.activeElement.classList.contains('card')) return

		let firstCard: HTMLElement = document.querySelector('.card')

		firstCard?.focus()

		firstCard = null
	}

	const actionBarItems = [
		{
			accent: true,
			text: 'add',
			action: handleClickAdd,
			icon: <Svg width="40px" height="40px" id="plus" />,
		},
		{
			text: 'search',
			action: toggleSearchBar,
			icon: <Svg width="26px" height="26px" id="search" />,
		},
		{
			text: 'sort',
			action: () => {},
			icon: <Svg width="26px" height="26px" id="sort" />,
			type: 'dropdown',
			active: sortType,
			changeState: sortCardArray,
			dropdownItems: ['Newest', 'Older', 'Max content length', 'Min content length'],
		},
	]

	return (
		<>
			<Actionbar items={actionBarItems} />
			<Grid
				cardArray={cardArrayClone}
				openCard={openCard}
				removeCard={removeCardAnimated}
				copyCard={copyCard}
			/>
			<SearchBar ref={searchBarRef} handleChange={handleChangeSearchBar} />
			<Modal ref={modalRef} handleClose={handleCloseModal}>
				{isOpenModal => (
					<Suspense fallback={<Preloader />}>
						<OpenedCard
							ref={openedCardRef}
							remove={handleClickRemove}
							copy={copyCard}
							isOpen={isOpenModal}
						/>
					</Suspense>
				)}
			</Modal>
		</>
	)
}

export default Home
