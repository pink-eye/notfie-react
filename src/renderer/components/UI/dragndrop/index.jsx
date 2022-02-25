import React, { useEffect, useRef } from 'react'
import useClickOutside from 'renderer/hooks/useClickOutside'
import AppStorage from 'renderer/utils/AppStorage'
import styles from './DragNDrop.module.scss'

const DragNDrop = () => {
	const inputRef = useRef(null)
	const dragNDropRef = useRef(null)

	useClickOutside(dragNDropRef, resetImport)

	const changeTip = text => {
		let dragNDropTip = document.querySelector(`.${styles.dragNDropTip}`)

		dragNDropTip.textContent = text

		dragNDropTip = null
	}

	function resetImport() {
		let field = document.querySelector(`.${styles.dragNDrop}`)

		field.classList.remove(`${styles.valid}`)
		field.classList.remove(`${styles.invalid}`)

		changeTip('Drag your files here or click in this area.')

		field = null
	}

	const resultImport = (className, text) => {
		let field = document.querySelector(`.${styles.dragNDrop}`)

		if (field.classList.contains(className)) {
			field = null
			return
		}

		field.classList.add(className)
		changeTip(text)

		field = null
	}

	const validImport = () => resultImport(`${styles.valid}`, 'Successfully! Wait for refresh...')
	const invalidImport = (text = 'Fail... :(') => resultImport(`${styles.invalid}`, text)

	const readInputFile = () => {
		let reader = new FileReader()

		reader.readAsText(inputRef.current?.files[0])

		reader.addEventListener(
			'load',
			() => {
				const data = JSON.parse(reader.result)

				if (!data.cardArray && !data.settings)
					invalidImport(
						'Sorry, this file either does not contain required data or has errors :('
					)
				else {
					validImport()

					const appStorage = new AppStorage()

					appStorage.update('cardArray', data.cardArray)
					appStorage.update('settings', data.settings)

					setTimeout(() => location.reload(), 3000)
				}
			},
			{ once: true }
		)
	}

	const validateFile = () => {
		if (inputRef.current?.files.length === 0) {
			invalidImport('Firstly, you must import something')
			return
		}

		const isJSON = /\.(json)$/i.test(inputRef.current?.files[0].name)

		if (inputRef.current?.value === '' || !isJSON) invalidImport()
		else {
			validImport()
			readInputFile()
		}
	}

	const handleFile = ({ target }) => {
		let field = document.querySelector(`.${styles.dragNDrop}`)

		field.classList.remove(`${styles.valid}`)
		field.classList.remove(`${styles.invalid}`)

		changeTip(`I've got a '${target.files[0].name}'. You can press 'Import' now`)

		field = null
	}

	useEffect(() => {
		inputRef.current?.addEventListener('change', handleFile)

		return () => inputRef.current?.removeEventListener('change', handleFile)
	})

	return (
		<div ref={dragNDropRef}>
			<div className={`${styles.dragNDrop}`}>
				<p className={`${styles.dragNDropTip}`}>
					Drag your files here or click in this area.
				</p>
				<input
					ref={inputRef}
					type="file"
					accept=".json"
					className={styles.dragNDropField}
				></input>
			</div>
			<div className={`${styles.dragNDropActions}`}>
				<a href="storage.json" download className="btn-primary btn-reset">
					Export
				</a>
				<button className="btn-accent btn-reset" onClick={validateFile}>
					Import
				</button>
			</div>
		</div>
	)
}

export default DragNDrop
