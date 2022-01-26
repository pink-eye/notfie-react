import React, { useEffect, useRef, memo } from 'react'
import useToggle from 'renderer/hooks/useToggle'
import styles from './Preloader.module.scss'

const Preloader = () => {
	const preloaderRef = useRef(null)
	const [isHidden, toggle, hide, show] = useToggle(false)

	const remove = () => {
		hide()
		setTimeout(() => preloaderRef.current?.remove(), 300)
	}

	useEffect(() => {
		window.addEventListener('load', remove)

		return () => window.removeEventListener('load', remove)
	})

	return (
		<div
			ref={preloaderRef}
			className={`${styles.preloader} ${isHidden ? styles.onHidden : ''}`}
		>
			<svg width="60" height="60" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
				<linearGradient x1="0%" y1="100%" y2="100%" id="loading-gradient">
					<stop stopColor="#fff" stopOpacity="0" offset="0%" />
					<stop stopColor="#fff" stopOpacity=".5" offset="40%" />
					<stop stopColor="#fff" offset="100%" />
				</linearGradient>
				<g fill="none" fillRule="evenodd">
					<path
						fill="inherit"
						d="M34 18c0-8.837-7.163-16-16-16-6.34 0-11.82 3.688-14.409 9"
						stroke="url(#loading-gradient)"
						strokeWidth="4"
						strokeLinecap="round"
					></path>
				</g>
			</svg>
		</div>
	)
}

export default memo(Preloader)
