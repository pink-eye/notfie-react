import React, {
	useEffect,
	useRef,
	useImperativeHandle,
	forwardRef,
	useState,
	memo,
	ForwardRefRenderFunction,
} from 'react'
import useToggle from 'renderer/hooks/useToggle'
import useDebounce from 'renderer/hooks/useDebounce'
import styles from './SearchBar.module.scss'

type TFieldRef = HTMLInputElement | null

interface SearchBarAPI {
	toggle: () => void
	close: () => void
	getState: () => boolean
}

interface SearchBarProps {
	handleChange: (text: string) => void
}

const SearchBar: ForwardRefRenderFunction<SearchBarAPI, SearchBarProps> = (
	{ handleChange },
	ref
) => {
	const fieldRef = useRef<TFieldRef>(null)
	const [input, setInput] = useState('')
	const [isOpen, toggle, open, close] = useToggle()

	const debouncedInput = useDebounce(input, 300)

	useImperativeHandle(ref, () => ({
		toggle,
		close,
		getState: () => isOpen,
	}))

	useEffect(() => {
		isOpen && setTimeout(() => fieldRef.current?.focus(), 100)
	}, [isOpen])

	useEffect(() => {
		isOpen && handleChange(input.trim())
	}, [debouncedInput])

	return (
		<form className={`${styles.search} ${isOpen ? styles.onOpen : ''}`}>
			<input
				ref={fieldRef}
				className={styles.field}
				type="text"
				name="search"
				id="search"
				onChange={({ target }) => setInput(() => target.value)}
				placeholder="Search"
			></input>
		</form>
	)
}

export default memo(forwardRef(SearchBar))
