import React, { Component } from 'react'

import MetaMask from 'assets/images/MetaMask.svg'
import './MetaMaskMissing.scss'

class MetaMaskMissing extends Component {
  render() {
    return (
      <div className="MetaMaskMissingWrapper">
        <div className="MetaMaskMissing">
          <h2 className="Title">Metamask Missing</h2>
          <img className="MetaMaskMissingImg" src={MetaMask} />
          <p class="Description">Please install Metamask as a Chrome extension. <a href="https://metamask.io" target="_blank" class="link-status metamask">Download now</a>.</p>
        </div>
      </div>
    )
  }
}

export default MetaMaskMissing
