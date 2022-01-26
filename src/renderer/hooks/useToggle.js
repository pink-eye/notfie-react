import { useState, useCallback } from 'react'

const useToggle = initialState => {
	const [value, setValue] = useState(initialState)

	const makeTrue = () => !value && toggle()

	const makeFalse = () => value && toggle()

	const toggle = useCallback(() => setValue(previousValue => !previousValue), [value])

	return [value, toggle, makeTrue, makeFalse]
}

export default useToggle
