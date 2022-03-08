import { useContext } from 'react'
import { Context } from 'renderer/App'
import { ISettings } from 'renderer/types'

const useSettings = (): [ISettings, any] => {
	const [cardArray, setCardArray, settings, setSettings] = useContext(Context)

	const changeOption = (option: string, value: string | boolean): void => {
		const updatedSettings = { ...settings }
		updatedSettings[`${option}`] = value
		setSettings(() => updatedSettings)
	}

	return [settings, changeOption]
}

export default useSettings
