import React from 'react'
import styles from './KeyboardButton.module.scss'

const KeyboardButton = ({ children }) => <button className={styles.keyboardBtn}>{children}</button>

export default KeyboardButton
