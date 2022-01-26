import React from 'react'
import styles from './Form.module.scss'

const Form = props => {
	const disableDefaultSubmit = event => {
		event.preventDefault()
		return false
	}

	return (
		<form onSubmit={disableDefaultSubmit}>
			<fieldset className={`${styles.form}`}>
				<legend className={`${styles.legend}`}>{props.legend}</legend>
				<ul className={`${styles.list}`}>
					{props.children.length
						? props.children.map((children, index) => (
								<li key={index} className={`${styles.item}`}>
									{children}
								</li>
						  ))
						: props.children}
				</ul>
			</fieldset>
		</form>
	)
}

export default Form
