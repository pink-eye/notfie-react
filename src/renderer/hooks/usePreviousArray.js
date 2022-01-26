import React, { useState } from 'react'

const usePreviousArray = () => {
	const [previousArray, setPreviousArray] = useState([])

	const changeState = array => {
		if (previousArray.length > 0) return

		setPreviousArray(() => array)
	}

	const reset = () => setPreviousArray(() => [])

	return [previousArray, changeState, reset]
}

export default usePreviousArray
