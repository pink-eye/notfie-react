import React, { FC, FormEvent } from 'react'
import styles from './Form.module.scss'

interface FormProps {
	legend: string
	children: JSX.Element | JSX.Element[]
}

const Form: FC<FormProps> = props => {
	const disableDefaultSubmit = (event: FormEvent) => {
		event.preventDefault()
		return false
	}

	return (
		<form onSubmit={disableDefaultSubmit}>
			<fieldset className={`${styles.form}`}>
				<legend className={`${styles.legend}`}>{props.legend}</legend>
				<ul className={`${styles.list}`}>
					{props.children.hasOwnProperty('length')
						? (props.children as JSX.Element[]).map((children, index) => (
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
