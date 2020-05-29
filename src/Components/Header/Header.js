import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
	
	render() {
		return (
			<header id='top'>
				<img src='assets/img/shelfie_icon.png' alt='shelfie logo' />
				<h2>SHELFIE</h2>
				<div className='nav-link-cont'>
					<Link to='/' className='nav-link'>
						Dashboard
					</Link>
					<Link to='/add' className='nav-link'>
						Add Inventory
					</Link>
				</div>
			</header>
		)
	}
}
