import React, { Component } from 'react'
import Header from './Header/Header'
import routes from '../routes'
import { Icon } from '@iconify/react'
import chevronDoubleUp from '@iconify/icons-mdi-light/chevron-double-up'
import '../assets/style/reset.css'
import '../assets/style/App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: 0
    }
  }

  backToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  componentDidMount() {
    window.addEventListener('scroll', () => this.setState({ scrollY: window.scrollY }))
  }

  render() {
    const { scrollY } = this.state
    return (
      <div className='App'>
        <Header />
        <Icon
          icon={chevronDoubleUp}
          className={`${scrollY > 100 ? 'btt-btn' : 'btt-btn hide-btt'}`}
          onClick={this.backToTop}
        />
        <div className='app-body-cont'>{routes}</div>
      </div>
    )
  }
}
