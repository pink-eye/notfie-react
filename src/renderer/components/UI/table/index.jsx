import React from 'react'
import styles from './Table.module.scss'

const Table = ({ info }) => {
	return (
		<dl>
			{info.map(([dt, dd]) => (
				<div className={styles.row} key={dd.content}>
					<dt className={styles.cell}>{dt.content}</dt>
					<dd className={styles.cell}>{dd.content}</dd>
				</div>
			))}
		</dl>
	)
}

export default Table
