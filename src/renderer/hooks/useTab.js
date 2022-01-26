import { useState } from 'react'

const useTab = initialState => {
	const [tabState, setTabState] = useState(initialState)

	const change = tab => setTabState(previousState => ({ ...previousState, activeTab: tab }))

	return [tabState, setTabState, change]
}

export default useTab
