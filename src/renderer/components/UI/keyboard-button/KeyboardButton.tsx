import React, { FC } from 'react'
import styles from './KeyboardButton.module.scss'

const KeyboardButton: FC = ({ children }) => (
	<button className={styles.keyboardBtn}>{children}</button>
)

export default KeyboardButton
