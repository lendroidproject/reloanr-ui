import React, { Component } from 'react'

import './Header.scss'

class Header extends Component {
  setPrecision(value, prec) {
    if (!prec) return value
    if (!value) value = 0
    const up = parseInt(value, 10)
    const down = ('000' + parseInt(value * Math.pow(10, prec), 10).toString()).substr(-prec)
    return up + '.' + down
  }

  toUpper(value) {
    return `0x${value.substr(2).toUpperCase()}`
  }

  render() {
    const { address, contracts } = this.props

    return (
      <div className="HeaderWrapper">
        <div className="Inner">
          <div className="Logo">
            {/* <img src={logo} alt="Logo" /> */}
            Reloanr
          </div>
          <div className="Header">
            <div className="Info Address">
              <div className="Label">Address</div>
              <div className="Value">{this.toUpper(address)}</div>
            </div>
            <div className="Info">
              <div className="SubInfo Info1">
                <div className="Label">Balance</div>
                <div className="Value">{this.setPrecision(contracts.balances ? contracts.balances.ETH : 0, 3)} <span>ETH</span></div>
              </div>
              <div className="SubInfo Info2">
                <div className="Label"></div>
                <div className="Value">{this.setPrecision(contracts.balances ? contracts.balances.WETH : 0, 3)} <span>WETH</span></div>
              </div>
              <div className="SubInfo Info3">
                <div className="Label"></div>
                <div className="Value">{this.setPrecision(contracts.balances ? contracts.balances.DAI : 0, 3)} <span>DAI</span></div>
              </div>
              <div className="SubInfo Info4">
                <div className="Label"></div>
                <div className="Value">{this.setPrecision(contracts.balances ? contracts.balances.LST : 0, 3)} <span>LST</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
