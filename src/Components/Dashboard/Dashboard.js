import React, { Component } from 'react'
import Product from '../Product/Product'
import axios from 'axios'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inventory: [],
      mounted: false
    }
    this.forceUpdate = this.forceUpdate.bind(this)
    this.getInventory = this.getInventory.bind(this)
  }

  async getInventory() {
    const res = await axios.get('/api/inventory').catch(err => console.log(err))
    this.setState({ inventory: res.data })
  }

  setInventory = inventory => {
    this.setState({ inventory })
  }

  componentDidUpdate(oldprops) {
    if (this.props.location.state && !oldprops.location.state) {
      console.log('Inventory refreshed')
      this.getInventory()
    }
  }

  componentDidMount() {
    this.setState({ mounted: true })
    this.getInventory()
  }

  render() {
    const { inventory } = this.state
    return (
      <div className='dash-cont'>
        {inventory.map((e, i) => (
          <Product key={i} product={e} setInventory={this.setInventory} />
        ))}
      </div>
    )
  }
}
