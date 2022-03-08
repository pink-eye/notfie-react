import React, {
	useImperativeHandle,
	forwardRef,
	useEffect,
	useRef,
	useState,
	ForwardRefRenderFunction,
	ReactNode,
	ReactElement,
} from 'react'
import useClickOutside from 'renderer/hooks/useClickOutside'
import useToggle from 'renderer/hooks/useToggle'
import styles from './Modal.module.scss'
import { KeyboardEvent } from 'renderer/types'

interface ModalAPI {
	open: () => void
	close: () => void
	getState: () => boolean
}

interface ModalProps {
	handleClose: () => void
	children: (isOpen: boolean) => ReactNode | ReactElement
}

const focusElements = [
	'a[href]',
	'input',
	'select',
	'textarea',
	'button',
	'iframe',
	'[contenteditable]',
	'[tabindex]:not([tabindex^="-"])',
]

const Modal: ForwardRefRenderFunction<ModalAPI, ModalProps> = (
	{ children, handleClose },
	ref
) => {
	const [isOpen, toggle, open, close] = useToggle()
	const [previousActiveEl, setPreviousActiveEl] = useState(null)

	const modalRef = useRef(null)

	useClickOutside(modalRef, close)

	useImperativeHandle(ref, () => ({
		open,
		close,
		getState: () => isOpen,
	}))

	const catchFocus = (event: KeyboardEvent) => {
		let nodes = modalRef?.current.querySelectorAll(focusElements)
		let nodesArray = [...nodes]
		const focusedItemIndex = nodesArray.indexOf(document.activeElement)

		if (event.shiftKey && focusedItemIndex === 0) {
			nodesArray.at(-1).focus()
			event.preventDefault()
		}

		if (!event.shiftKey && focusedItemIndex === nodesArray.length - 1) {
			nodesArray[0].focus()
			event.preventDefault()
		}

		nodes = null
		nodesArray = null
	}

	const setFocus = () => {
		let [firstNode] = modalRef?.current.querySelectorAll(focusElements)

		isOpen ? firstNode?.focus() : previousActiveEl?.focus()

		firstNode = null
	}

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.keyCode === 27) close()
		if (event.keyCode === 9) catchFocus(event)
	}

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown)

			let activeEl = document.activeElement
			setPreviousActiveEl(activeEl)

			activeEl = null
		} else handleClose()

		setFocus()

		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [isOpen])

	return (
		<div className={`${styles.modal} ${isOpen ? styles.onOpen : ''}`}>
			<div
				ref={modalRef}
				className={`${styles.container} ${isOpen ? `${styles.animateOpen}` : ''}`}
				role="dialog"
				aria-modal="true"
			>
				<div className={styles.content}>{children(isOpen)}</div>
			</div>
		</div>
	)
}

export default forwardRef(Modal)
