import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import { space, width, fontSize, color } from 'styled-system'

// utils

const breakpoints = [40, 52, 64]

const properties = {
	align: 'alignItems',
	justify: 'justifyContent',
	order: 'order',
	direction: 'flexDirection',
	wrap: 'flexWrap',
}

const arr = n => (Array.isArray(n) ? n : [n])

const dec = props => val => arr(props).reduce((acc, prop) => ((acc[prop] = val), acc), {})
const joinObj = (acc, obj) => Object.assign(acc, obj)

const flex = props => {
	const REG = /align|justify|order|direction|wrap/
	const keys = Object.keys(props).filter(k => REG.test(k))

	return keys
		.map(key => {
			// check arr and breaks
			const val = arr(props[key])
			const prop = properties[key] || key
			return val.map(dec(prop)).reduce(joinObj, {})
		})
		.reduce(joinObj, {})
}

console.log(flex({ align: 'center' }))

const Block = ({ children, El, isFlex, ...others }) =>
	<El
		style={{
			display: isFlex ? 'flex' : null,
			...space(others),
			...width(others),
			...fontSize(others),
			...color(others),
			...flex(others),
		}}
	>
		{children}
	</El>
Block.defaultProps = {
	isFlex: true,
	El: 'div',
}

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
				<Block align="center" justify="center" direction="row">
					<div>Testing</div>
					<div>Test 2</div>
				</Block>
			</div>
		)
	}
}

export default App
