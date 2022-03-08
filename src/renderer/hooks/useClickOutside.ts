import { useEffect } from 'react'

interface IRef {
	current: HTMLElement
}

const useClickOutside = (ref: IRef, handler: (event: Event) => void) => {
	const listener = (event: MouseEvent) => {
		let { target } = event

		if (target instanceof HTMLElement) {
			if (!ref.current || ref.current.contains(target)) return

			handler(event)
		}

		target = null
	}

	useEffect(() => {
		document.addEventListener('mousedown', listener)
		document.addEventListener('touchstart', listener)

		return () => {
			document.removeEventListener('mousedown', listener)
			document.removeEventListener('touchstart', listener)
		}
	}, [ref, handler])
}

export default useClickOutside
