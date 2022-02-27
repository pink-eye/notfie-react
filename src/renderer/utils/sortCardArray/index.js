const byOlder = cardArray => cardArray?.sort((a, b) => a.birth - b.birth)

const byNewest = cardArray => cardArray?.sort((a, b) => b.birth - a.birth)

const sumContent = card => card.title.length + card.description.length

const byMaxContentLength = cardArray => cardArray?.sort((a, b) => sumContent(b) - sumContent(a))

const byMinContentLength = cardArray => cardArray?.sort((a, b) => sumContent(a) - sumContent(b))

const sortCardArrayByType = (cardArray, type) => {
	if (!type || cardArray.length === 0) return cardArray

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
