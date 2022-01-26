import React from 'react'
import styles from './Switch.module.scss'

const Switch = ({ text, option, checked }) => (
	<label htmlFor={option} className={styles.switch}>
		{text}
		<input type="checkbox" role="switch" id={option} defaultChecked={checked}></input>
	</label>
)

export default Switch
