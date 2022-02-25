export const copyToClipboard = string =>
	navigator.clipboard
		.writeText(string)
		.then(() => {})
		.catch(console.error)
