import React, { Component } from 'react'

import Reloanr from 'assets/images/Reloanr.svg'
import DesktopImg from 'assets/images/Desktop.svg'
import './Desktop.scss'

class Desktop extends Component {
  render() {
    return (
      <div className="DesktopWrapper">
        <div className="Desktop">
          <img src={Reloanr} />
          <p class="Warning">
            <b class="Light">RELOANR</b> requires <b>Chrome</b> with <b>MetaMask</b> installed or <b>Opera</b> browser. To use <b class="Light">RELOANR</b> on mobile or tablet,
          </p>
          <a href="https://status.im" target="_blank" class="link-status metamask">download <b class="bold-text-5">Status</b></a>
          <img className="DesktopImg" src={DesktopImg} />
        </div>
      </div>
    )
  }
}

export default Desktop
