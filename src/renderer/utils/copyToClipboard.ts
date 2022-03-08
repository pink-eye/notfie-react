const copyToClipboard = (string: string): Promise<void> =>
	navigator.clipboard
		.writeText(string)
		.then(() => {})
		.catch(console.error)

export default copyToClipboard
