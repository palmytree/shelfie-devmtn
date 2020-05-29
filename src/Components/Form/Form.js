import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

export default class Form extends Component {
  constructor() {
    super()
    this.state = {
      fName: '',
      fPrice: '',
      fImg:
        'https://i2.wp.com/careappointments.com/wp-content/uploads/2018/10/no_image_placeholder.png?fit=680%2C566&ssl=1'
    }
    this.addProd = this.addProd.bind(this)
  }

  update = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  clear = () => {
    this.setState({
      fName: '',
      fPrice: '',
      fImg:
        'https://i2.wp.com/careappointments.com/wp-content/uploads/2018/10/no_image_placeholder.png?fit=680%2C566&ssl=1',
      redirect: null
    })
  }

  async addProd() {
    const { fName, fPrice, fImg } = this.state,
      body = { name: fName, price: fPrice, img: fImg },
      res = await axios.post('/api/product', body).catch(err => console.log(err))
    this.clear()
    if (res) this.setState({ redirect: '/' })
  }

  componentWillUnmount() {
    this.setState({ redirect: null })
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: { fromAddForm: true }
          }}
        />
      )
    }

    const { fName, fPrice, fImg } = this.state
    return (
      <div className='add-form-cont'>
        <img className='add-form-img' src={fImg} alt='Product being added' />
        <div className='add-form-allfields'>
          <div className='add-form-field-cont'>
            <h5>Image Url</h5>
            <input
              type='text'
              id='fImg'
              className='add-form-field'
              onChange={this.update}
              value={fName ? fImg : ''}
            />
          </div>
          <div className='add-form-field-cont'>
            <h5>Product Name</h5>
            <input
              type='text'
              id='fName'
              className='add-form-field'
              onChange={this.update}
              value={fName}
            />
          </div>
          <div className='add-form-field-cont'>
            <h5>Price</h5>
            <input
              type='number'
              id='fPrice'
              className='add-form-field'
              onChange={this.update}
              value={fPrice}
            />
          </div>
        </div>
        <div className='add-form-btn-cont'>
          <Link
            to={{
              pathname: '/',
              state: { fromAddForm: true }
            }}>
            <button className='add-form-btn' id='cancel-btn' onClick={this.clear}>
              Cancel
            </button>
          </Link>
          <button className='add-form-btn' id='cancel-btn' onClick={this.clear}>
            Reset
          </button>

          <button className='add-form-btn' id='save-btn' onClick={this.addProd}>
            Add to Inventory
          </button>
        </div>
      </div>
    )
  }
}
