import React, { Component } from 'react'

import MetaMaskLogInImg from 'assets/images/MetaMaskLogIn.svg'
import './MetaMaskLogIn.scss'

class MetaMaskLogIn extends Component {
  render() {
    return (
      <div className="MetaMaskLogInWrapper">
        <div className="MetaMaskLogIn">
          <h2 className="Title">Login to MetaMask</h2>
          <img className="MetaMaskLogInImg" src={MetaMaskLogInImg} />
          <p class="Description">Your Chrome Plugin is not active.</p>
        </div>
      </div>
    )
  }
}

export default MetaMaskLogIn
