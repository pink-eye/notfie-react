import React, { FC } from 'react'
import styles from './Switch.module.scss'

interface SwitchProps {
	text: string
	option: string
	checked: boolean
}

const Switch: FC<SwitchProps> = ({ text, option, checked }) => (
	<label htmlFor={option} className={styles.switch}>
		{text}
		<input type="checkbox" role="switch" id={option} defaultChecked={checked}></input>
	</label>
)

export default Switch
