import React, { FC } from 'react'
import Table from 'renderer/components/UI/table'
import KeyboardButton from 'renderer/components/UI/keyboard-button'
import styles from './Shortcuts.module.scss'

const Shortcuts: FC = () => {
	const dlInfo = [
		[
			{
				content: (
					<>
						<KeyboardButton>CTRL / CMD</KeyboardButton>
						<small className={styles.separator}> + </small>
						<KeyboardButton>N</KeyboardButton>
					</>
				),
			},
			{ content: 'Create a new note' },
		],
		[
			{
				content: (
					<>
						<KeyboardButton>CTRL / CMD</KeyboardButton>
						<small className={styles.separator}> + </small>
						<KeyboardButton>K</KeyboardButton>
					</>
				),
			},
			{ content: 'Delete a note' },
		],
		[
			{
				content: (
					<>
						<KeyboardButton>CTRL / CMD</KeyboardButton>
						<small className={styles.separator}> + </small>
						<KeyboardButton>F</KeyboardButton>
					</>
				),
			},
			{ content: 'Toggle a search bar' },
		],
		[
			{
				content: (
					<>
						<KeyboardButton>CTRL / CMD</KeyboardButton>
						<small className={styles.separator}> + </small>
						<KeyboardButton>W</KeyboardButton>
					</>
				),
			},
			{ content: 'Hide the window' },
		],
		[
			{ content: <KeyboardButton>ESC</KeyboardButton> },
			{ content: 'Close an opened note | close a search bar | focus first note' },
		],
		[
			{
				content: (
					<>
						<KeyboardButton>CTRL / CMD</KeyboardButton>
						<small className={styles.separator}> + </small>
						<KeyboardButton>SHIFT</KeyboardButton>
						<small className={styles.separator}> + </small>
						<KeyboardButton>E</KeyboardButton>
					</>
				),
			},
			{ content: 'Focus a left sidebar' },
		],
		[
			{
				content: (
					<>
						<KeyboardButton>CTRL / CMD</KeyboardButton>
						<small className={styles.separator}> + </small>
						<KeyboardButton>SHIFT</KeyboardButton>
						<small className={styles.separator}> + </small>
						<KeyboardButton>A</KeyboardButton>
					</>
				),
			},
			{ content: 'Focus an right sidebar' },
		],
	]

	return (
		<section className="tab-content">
			<div className="content-wrapper">
				<h1 className={`page-title ${styles.title}`}>Shortcut list</h1>
				<Table info={dlInfo} />
			</div>
		</section>
	)
}

export default Shortcuts
