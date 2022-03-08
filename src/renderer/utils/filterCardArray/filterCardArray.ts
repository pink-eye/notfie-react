import { ICard } from 'renderer/types'

const filterCardArray = (cardArray: ICard[], text: string): ICard[] =>
	cardArray.filter(
		item =>
			item.title.toLowerCase().includes(text) ||
			item.description.toLowerCase().includes(text) ||
			item.birth.toString().includes(text)
	)

export default filterCardArray
