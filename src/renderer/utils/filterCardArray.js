const filterCardArray = (array, string) =>
	array.filter(
		item =>
			item.title.toLowerCase().includes(string) ||
			item.description.toLowerCase().includes(string) ||
			item.birth.toString().includes(string)
	)

export default filterCardArray
