import { useContext } from 'react'
import { Context } from 'renderer/App'
import { ICard } from 'renderer/types'

const useCardArray = (): [ICard[], any, any, any] => {
	const [cardArray, setCardArray] = useContext(Context)

	const add = (card: ICard) =>
		setCardArray((prevCardArray: ICard[]) => [{ ...card, birth: Date.now() }, ...prevCardArray])

	const update = (card: ICard) => {
		const newCardArray = cardArray.filter((item: ICard) => item.id !== card.id)
		setCardArray(() => [{ ...card, birth: Date.now() }, ...newCardArray])
	}

	const remove = (id: string) => {
		const newCardArray = cardArray.filter((item: ICard) => item.id !== id)
		setCardArray(() => [...newCardArray])
	}

	const updateArray = (card: ICard) => {
		if (!card.id) return

		const reqCard = cardArray.find((item: ICard) => item.id === card.id)
		const hasContent = card.title.length > 0 || card.description.length > 0

		if (!reqCard && hasContent) {
			add(card)
			return
		}

		const isChanged =
			reqCard?.title !== card?.title || reqCard?.description !== card?.description

		if (reqCard && isChanged) update(card)
	}

	return [cardArray, setCardArray, updateArray, remove]
}

export default useCardArray
