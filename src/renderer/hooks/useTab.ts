import { useState } from 'react'
import { ITabState, ITab } from 'renderer/types'

const useTab = (initialState: ITabState): [ITabState, any, any] => {
	const [tabState, setTabState] = useState<ITabState>(initialState)

	const change = (tab: ITab): void =>
		setTabState(previousState => ({ ...previousState, activeTab: tab }))

	return [tabState, setTabState, change]
}

export default useTab
