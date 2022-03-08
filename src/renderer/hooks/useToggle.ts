import { useState, useCallback } from 'react'

const useToggle = (initialState: boolean = false): [boolean, any, any, any] => {
	const [value, setValue] = useState<boolean>(initialState)

	const toggle = useCallback((): void => setValue(previousValue => !previousValue), [value])

	const makeTrue = () => {
		!value && toggle()
	}

	const makeFalse = () => {
		value && toggle()
	}

	return [value, toggle, makeTrue, makeFalse]
}

export default useToggle
