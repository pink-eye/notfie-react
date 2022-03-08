import React, { FC } from 'react'
import sprite from 'renderer/res/img/sprite.svg'

interface SvgProps {
	width: string
	height: string
	id: string
}

const Svg: FC<SvgProps> = ({ width, height, id }) => (
	<svg width={width} height={height}>
		<use xlinkHref={`${sprite}#${id}`}></use>
	</svg>
)

export default React.memo(Svg)
