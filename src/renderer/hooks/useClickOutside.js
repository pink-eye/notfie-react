import { useEffect } from 'react'

const useClickOutside = (ref, handler) => {
	const listener = event => {
		if (!ref.current || ref.current.contains(event.target)) return

		handler(event)
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
