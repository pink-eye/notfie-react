export const countWordsAndChars = str => {
	if (typeof str === 'string') {
		const string = str.trim().replace(/(\r\n|\n|\r)/gm, '') // remove line breaks
		const chars = string.length
		const words = string
			.replace(
				/-|,|`|~|&|#|%|_|=|@|"|'|:|!|№|;|\.|\^|\?|\(|\)|\+|\{|\}|\[|\]|\>|\<|\||\\|\//gm,
				''
			) // remove single special char
			.split(' ')
			.filter(el => el !== '').length

		return `${words} words, ${chars} chars`
	} else return str
}
