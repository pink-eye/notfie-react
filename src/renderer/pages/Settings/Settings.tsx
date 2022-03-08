import React, { FC, MouseEvent } from 'react'
import Dropdown from 'renderer/components/UI/dropdown/Dropdown'
import Switch from 'renderer/components/UI/switch'
import Form from 'renderer/components/Form'
import DragNDrop from 'renderer/components/UI/dragndrop'
import styles from './Settings.module.scss'
import useSettings from 'renderer/hooks/useSettings'

const Settings: FC = () => {
	const [settings, changeOption] = useSettings()

	const themeDropdownItems: string[] = ['System default', 'Light', 'Dark']

	const handleChangeCheckbox = ({ target }: MouseEvent) => {
		if (target instanceof HTMLInputElement) {
			if (!target.id) return

			const option = target.id
			const value = target.checked

			changeOption(option, value)
		}
	}

	const handleClickThemeDropdown = (theme: string) => {
		changeOption('theme', theme)
	}

	return (
		<section className="tab-content" onClick={handleChangeCheckbox}>
			<div className="content-wrapper">
				<h1 className="visually-hidden">Here you can edit options</h1>
				<ul className={`${styles.settingsList}`}>
					<li className={`${styles.settingsItem}`}>
						<Form legend="Appearance">
							<div className={`${styles.option}`}>
								<h4 className={`${styles.optionTitle}`}>Theme</h4>
								<Dropdown
									changeState={handleClickThemeDropdown}
									active={settings.theme}
									headContent={settings.theme}
									items={themeDropdownItems}
									option="theme"
								/>
							</div>
							<div className={`${styles.option}`}>
								<Switch
									text="Disable transition"
									option="disableTransition"
									checked={settings.disableTransition}
								/>
							</div>
						</Form>
					</li>
					<li className={`${styles.settingsItem}`}>
						<Form legend="Behavior">
							<div className={`${styles.option}`}>
								<Switch
									text="Launch app when system starts"
									option="launchAppWhenSystemStarts"
									checked={settings.launchAppWhenSystemStarts}
								/>
							</div>
							<div className={`${styles.option}`}>
								<Switch
									text="Launch minimized"
									option="launchMinimized"
									checked={settings.launchMinimized}
								/>
							</div>
						</Form>
					</li>
					<li className={`${styles.settingsItem}`}>
						<Form legend="Import and export">
							<DragNDrop />
						</Form>
					</li>
				</ul>
			</div>
		</section>
	)
}

export default Settings
