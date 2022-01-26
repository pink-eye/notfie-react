const getCloseElement = (target, className) =>
	target.classList.contains(`${className}`) ? target : target.closest(`.${className}`)

export default getCloseElement
