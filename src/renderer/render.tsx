import React from 'react'
import ReactDOM from 'react-dom'
import './styles/vendor.scss'
import './styles/global.scss'
import './App.scss'
import App from './App'

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.querySelector('#root')
)
