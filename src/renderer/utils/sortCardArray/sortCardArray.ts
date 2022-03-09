import { ICard } from 'renderer/types'

const byOlder = (cardArray: ICard[]): ICard[] => cardArray?.sort((a, b) => a.birth - b.birth)

const byNewest = (cardArray: ICard[]): ICard[] => cardArray?.sort((a, b) => b.birth - a.birth)

const sumContent = (card: ICard) => card.title.length + card.description.length

const byMaxContentLength = (cardArray: ICard[]): ICard[] =>
	cardArray?.sort((a, b) => sumContent(b) - sumContent(a))

const byMinContentLength = (cardArray: ICard[]): ICard[] =>
	cardArray?.sort((a, b) => sumContent(a) - sumContent(b))

const sortCardArrayByType = (cardArray: ICard[], type: string): ICard[] => {
	if (!cardArray.length) return cardArray

	switch (type) {
		case 'Newest':
			return byNewest(cardArray)

		case 'Older':
			return byOlder(cardArray)

		case 'Max content length':
			return byMaxContentLength(cardArray)

		case 'Min content length':
			return byMinContentLength(cardArray)
	}
}

export default sortCardArrayByType
