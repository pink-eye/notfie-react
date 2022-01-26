import { useContext } from 'react'
import { Context } from 'renderer/App'

const useSettings = () => {
	const [n, s, settings, setSettings] = useContext(Context)

	const changeOption = (option, value) => {
		const updatedSettings = { ...settings }
		updatedSettings[`${option}`] = value
		setSettings(() => updatedSettings)
	}

	return [settings, changeOption]
}

export default useSettings
