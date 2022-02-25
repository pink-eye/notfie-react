const queryClosest = (target, selector) =>
	target.matches(selector) ? target : target.closest(selector)

export default queryClosest
