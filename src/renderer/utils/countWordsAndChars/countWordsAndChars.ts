const countWordsAndChars = (text: string): string => {
	if (typeof text === 'string') {
		const string = text.trim().replace(/(\r\n|\n|\r)/gm, '') // remove line breaks
		const chars = string.length
		const words = string
			.replace(
				/-|,|`|~|&|#|%|_|=|@|"|'|:|!|№|;|\.|\^|\?|\(|\)|\+|\{|\}|\[|\]|\>|\<|\||\\|\//gm,
				''
			) // remove single special char
			.split(' ')
			.filter(el => el !== '').length

		return `${words} words, ${chars} chars`
	} else return text
}

export default countWordsAndChars
