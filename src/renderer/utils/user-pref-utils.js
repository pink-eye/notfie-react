export const switchTheme = (theme, userPreference = null) => {
	switch (theme) {
		case 'System default':
			userPreference ? switchTheme('dark') : switchTheme('light')
			break
		default:
			document.body.removeAttribute('class')
			document.body.classList.add(theme.toLowerCase())
			break
	}
}

export const toggleTransition = isDisabled =>
	!isDisabled ? document.body.removeAttribute('style') : document.body.style.setProperty('--trns', '0')
