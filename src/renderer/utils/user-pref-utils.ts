export const switchTheme = (theme: string, isDarkPrefer: boolean = null): void => {
	switch (theme) {
		case 'System default':
			isDarkPrefer ? switchTheme('dark') : switchTheme('light')
			break
		default:
			document.body.removeAttribute('class')
			document.body.classList.add(theme.toLowerCase())
			break
	}
}

export const toggleTransition = (isDisabled: boolean): void => {
	!isDisabled
		? document.body.removeAttribute('style')
		: document.body.style.setProperty('--trns', '0')
}
