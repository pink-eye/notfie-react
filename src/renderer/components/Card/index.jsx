import React from 'react'
import styles from './Card.module.scss'
import Svg from 'renderer/components/UI/svg'
import makeFriendlyDate from 'renderer/utils/makeFriendlyDate'

const Card = ({ card }) => {
	return (
		<button data-id={card.id} className={`${styles.card} card btn-reset`}>
			<div className={styles.frontSide}>
				<h3 className={`${styles.title}`}>{card.title}</h3>
				<textarea
					className={`${styles.description}`}
					disabled
					rows="3"
					value={card.description}
				></textarea>
				<time className={`${styles.birth}`}>
					<aside>
						<Svg width="13px" height="13px" id="date" />
					</aside>
					{makeFriendlyDate(card.birth)}
				</time>
			</div>
			<div className={styles.backSide}>
				<div className={styles.actions}>
					<aside data-action="copy" className="actionBackSide">
						<Svg width="27px" height="27px" id="copy" />
					</aside>
					<aside data-action="remove" className="actionBackSide">
						<Svg width="25px" height="25px" id="trash" />
					</aside>
				</div>
			</div>
		</button>
	)
}

export default Card
