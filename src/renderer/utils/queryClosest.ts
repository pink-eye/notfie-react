const queryClosest = (target: HTMLElement, selector: string): HTMLElement =>
	target.matches(selector) ? target : target.closest(selector)

export default queryClosest
