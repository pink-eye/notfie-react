import * as React from 'react'
import sprite from 'renderer/res/img/sprite.svg'

const Svg = ({ width, height, id }) => (
	<svg width={width} height={height}>
		<use xlinkHref={`${sprite}#${id}`}></use>
	</svg>
)

export default React.memo(Svg)
