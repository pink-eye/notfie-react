import { useContext } from 'react'
import { Context } from 'renderer/App'

const useCardArray = () => {
	const [cardArray, setCardArray] = useContext(Context)

	const focusFirstCard = () => {
		if (document.activeElement.classList.contains('card')) return

		let firstCard = document.querySelector('.card')

		firstCard?.focus()

		firstCard = null
	}

	const add = card =>
		setCardArray(prevCardArray => [{ ...card, birth: Date.now() }, ...prevCardArray])

	const update = card => {
		const newCardArray = cardArray.filter(item => item.id !== card.id)
		setCardArray(() => [{ ...card, birth: Date.now() }, ...newCardArray])
	}

	const remove = id => {
		const newCardArray = cardArray.filter(item => item.id !== id)
		setCardArray(() => [...newCardArray])
	}

	const updateArray = card => {
		if (!card.id) return

		const reqCard = cardArray.find(item => item.id === card.id)
		const hasContent = card.title.length > 0 || card.description.length > 0

		if (!reqCard && hasContent) {
			add(card)
			return
		}

		const isChanged =
			reqCard?.title !== card?.title || reqCard?.description !== card?.description

		if (reqCard && isChanged) update(card)
	}

	return [cardArray, setCardArray, updateArray, remove, focusFirstCard]
}

export default useCardArray
