import React, { Component } from 'react'
import axios from 'axios'

export default class Product extends Component {
	constructor(props) {
		super(props)
		this.state = {
			editing: false,
			hovering: false,
			sName: '',
			sPrice: 0,
			sImg: ''
		}
		this.delete = this.delete.bind(this)
		this.submitEdit = this.submitEdit.bind(this)
	}

	toggleEdit = () => {
		this.setState({ editing: !this.state.editing })
	}

	cancel = () => {
		this.setState({ editing: false })
		this.prodToState()
	}

	prodToState = () => {
		const { name, price, img } = this.props.product
		this.setState({
			sName: name,
			sPrice: price,
			sImg: img
		})
	}

	hoverOn = () => {
		this.setState({ hovering: true })
	}

	hoverOff = () => {
		this.setState({ hovering: false })
	}

	update = e => {
		this.setState({ [e.target.id]: e.target.value })
	}

	async delete() {
		const c = window.confirm(
			`Are you sure you want to delete the ${this.props.product.name}? This action cannot be undone.`
		)
		if (c) {
			const res = await axios
				.delete(`/api/product/${this.props.product.id}`)
				.catch(err => {
					console.log(err)
					window.alert(`Uh oh! Couldn't delete product. Check console.`)
				})
			this.props.setInventory(res.data)
			this.prodToState()
		}
		this.setState({ editing: false })
	}

	async submitEdit() {
		const { sName, sPrice, sImg } = this.state,
			{ id } = this.props.product,
			body = { name: sName, price: sPrice, img: sImg },
			res = await axios
				.put(`/api/product/${id}`, body)
				.catch(err => console.log(err))
		this.props.setInventory(res.data)
		this.setState({ editing: false })
	}

	componentDidUpdate() {
		const { sName, sPrice, sImg, editing } = this.state
		const { name, price, img } = this.props.product
		if (!editing) {
			if (sName !== name || sPrice !== price || sImg !== img) {
				this.prodToState()
			}
		}
	}

	componentDidMount() {
		this.prodToState()
	}

	render() {
		const { product } = this.props
		const { editing, hovering, sName, sPrice, sImg } = this.state
		return (
			<div
				className='prod-card'
				onMouseEnter={this.hoverOn}
				onMouseLeave={this.hoverOff}>
				<div className='prod-card-sub-cont'>
					<img src={sImg} alt={product.name} className='prod-card-img' />
				</div>
				<div className='prod-card-sub-cont'>
					<div className='prod-card-field-cont'>
						{editing ? (
							<input
								type='text'
								id='sName'
								placeholder={product.name}
								value={sName}
								onChange={this.update}
							/>
						) : (
							<h3 className='prod-card-field'>{product.name}</h3>
						)}
						{editing ? (
							<input
								type='number'
								id='sPrice'
								placeholder={product.price}
								value={sPrice}
								onChange={this.update}
							/>
						) : (
							<h4 className='prod-card-field'>${product.price}</h4>
						)}
						{editing ? (
							<input
								type='text'
								id='sImg'
								placeholder={product.img}
								value={sImg}
								onChange={this.update}
							/>
						) : null}
					</div>
					<div className='prod-card-btn-cont'>
						{hovering && !editing ? (
							<button className='card-btn' id='edit-btn' onClick={this.toggleEdit}>
								Edit
							</button>
						) : null}
						{editing ? (
							<button className='card-btn' id='save-btn' onClick={this.submitEdit}>
								Save
							</button>
						) : null}
						{editing ? (
							<button className='card-btn' id='cancel-btn' onClick={this.cancel}>
								Cancel
							</button>
						) : null}
						{hovering || editing ? (
							<button className='card-btn' id='delete-btn' onClick={this.delete}>
								Delete
							</button>
						) : null}
					</div>
				</div>
			</div>
		)
	}
}
