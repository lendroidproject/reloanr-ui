import React, { Component } from 'react'
import axios from 'axios'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import Modal from 'react-modal'
import InputModal from '../common/InputModal/InputModal'

import './List.scss'

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px 20px 0',
    minWidth: 500
  }
}

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dropdownOpen: {},
      topupCollateralAmount: 0,
      modalAmountIsOpen: false,
      modalIsOpen: false,
      modalData: {},
      currentData: null
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal(key) {
    this.setState({ [key]: true })
  }

  closeModal(key) {
    this.setState({ [key]: false, topupCollateralAmount: 0 })
  }

  getData(data) {
    const { key, filter } = data.data
    if (key) {
      const ret = this.props.data[key] || []
      if (filter) return filter(ret)
      return ret
    }
    return data.data
  }

  addCommas(value) {
    return (value + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  }

  calcTerm(value) {
    return (
      `${parseInt(value / 3600 / 24, 10)}d` +
      ((value / 3600) % 24 !== 0
        ? ` ${parseInt((value / 3600) % 24, 10)}h`
        : '')
    )
  }

  setPrecision(value, prec) {
    const up = parseInt(value, 10)
    const down = (
      '000' + parseInt(value * Math.pow(10, prec), 10).toString()
    ).substr(-prec)
    return this.addCommas(up) + '.' + down
  }

  shortAddress(value) {
    return `${value.substr(0, 4)}...${value.substr(-4)}`
  }

  getDisplayData(data, header) {
    let ret = data[header.key]

    if (header.key === 'loanDuration') {
      ret = ret.split(' ')[0]
    }

    if (header.precision) ret = this.setPrecision(ret, header.precision)
    if (header.filter) ret = this[header.filter](ret)
    if (header.suffix) ret += header.suffix
    return ret
  }

  getFill(percent) {
    if (percent > 80) return '#84d74d'
    if (percent > 60) return '#eeab35'
    if (percent > 40) return '#fd458a'
    return 'red'
  }

  toggle(key) {
    return () => {
      const { dropdownOpen } = this.state
      dropdownOpen[key] = !dropdownOpen[key]
      this.setState({ dropdownOpen })
    }
  }

  onSubmitTopupWithCollateral() {
    this.closeModal('modalAmountIsOpen')

    const { methods, web3Utils } = this.props
    const { currentData } = this.state
    const data = currentData.origin
    const topupCollateralAmount = web3Utils.toWei(
      this.state.topupCollateralAmount
    )

    methods.onTopUpPosition(data, topupCollateralAmount, (err, hash) => {
      if (err) return
      console.log(`Reload Loan with address of <${currentData.address}>`)
      setTimeout(methods.getPositions, 5000, currentData.address)
    })
  }

  // Slots

  onCancel(data, param) {
    const { methods } = this.props

    const cancelCallback = (err, result) => {
      if (err) return

      methods.onDeleteOrder(data.id, (err, res) => {
        setTimeout(methods.getOffers, 1000)
      })
    }

    methods.onCancelOrder(data, cancelCallback)
  }

  onLiquidatePosition(data, param) {
    const { methods } = this.props
    console.log(data, param)
    methods.onLiquidatePosition(data, (err, hash) => {
      if (err) return
      console.log(hash)
      setTimeout(methods.getPositions, 5000, data.address)
    })
  }

  onRepayLoan(data, param) {
    const { methods } = this.props
    console.log(data, param)
    methods.onClosePosition(data, (err, hash) => {
      if (err) return
      console.log(hash)
      setTimeout(methods.getPositions, 5000)
    })
  }

  onClosePosition(data, param) {
    const { methods } = this.props
    console.log(data, param)
    methods.onClosePosition(data, (err, hash) => {
      if (err) return
      console.log(hash)
      setTimeout(methods.getPositions, 5000)
    })
  }

  onTopupWithCollateral(data, param) {
    console.log(data, param)
    this.setState(
      {
        currentData: Object.assign(data),
        param,
        topupCollateralAmount: 0
      },
      () => this.openModal('modalAmountIsOpen')
    )
  }

  onDetails(data, param) {
    console.log(data, param)
    this.setState({ modalData: data.detail }, () => {
      this.openModal('modalIsOpen')
    })
  }

  // Action

  onAction(action, data) {
    if (!action.slot) return
    this[action.slot](data, action.param)
  }

  render() {
    const { data, classes } = this.props
    const filteredData = this.getData(data)
    const {
      modalAmountIsOpen,
      topupCollateralAmount,
      currentData,
      modalIsOpen,
      modalData
    } = this.state

    return (
      <div className='ListWrapper'>
        <div className='Title'>{data.title}</div>
        <div className='ListsWrapper'>
          {data.loading && (
            <div className='Loading'>
              <div className='Loader' />
            </div>
          )}
          <div className='Lists'>
            {filteredData.map((d, index) => (
              <div class={`List ${classes}`}>
                {data.headers.map(h => (
                  <div className={`ListField ${h.key}`} style={h.style}>
                    <div className='Label'>{h.label}</div>
                    <div className='Data'>
                      {h.key === 'health' ? (
                        d[h.key] ? (
                          <div className='HealthBar'>
                            <div className='BarPercent'>
                              {this.getDisplayData(d, h)}
                            </div>
                            <div className='BarBase'>
                              <div
                                className='Fill'
                                style={{
                                  width: `${d[h.key]}%`,
                                  backgroundColor: this.getFill(d[h.key])
                                }}
                              />
                            </div>
                          </div>
                        ) : null
                      ) : (
                        this.getDisplayData(d, h)
                      )}
                    </div>
                  </div>
                ))}
                <div className='Actions'>
                  {data.action.label === '3-dot' ? (
                    data.action.items.filter(item => item.enabled(d)).length >
                    0 ? (
                      <Dropdown
                        isOpen={this.state.dropdownOpen[index]}
                        toggle={this.toggle(index)}
                      >
                        <DropdownToggle
                          style={data.action.style}
                          className='close three-dot'
                        />
                        <DropdownMenu>
                          {data.action.items
                            .filter(item => item.enabled(d))
                            .map(item => (
                              <DropdownItem
                                onClick={() => this.onAction(item, d)}
                              >
                                {item.label}
                              </DropdownItem>
                            ))}
                        </DropdownMenu>
                      </Dropdown>
                    ) : // <button style={data.action.style} className="close three-dot"></button>
                    null
                  ) : (
                    <button
                      style={data.action.style}
                      className={data.action.key}
                      onClick={() => this.onAction(data.action, d)}
                    >
                      {data.action.label}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {filteredData.length === 0 && (
              <div class={`List ${classes}`}>
                {data.loading ? 'Loading' : 'No Data'}
              </div>
            )}
          </div>
        </div>
        <InputModal
          isOpen={modalAmountIsOpen}
          title='Topup Collateral Amount'
          onRequestClose={() => this.closeModal('modalAmountIsOpen')}
          onChange={e =>
            this.setState({ topupCollateralAmount: e.target.value })
          }
          onSubmit={this.onSubmitTopupWithCollateral.bind(this)}
          contentLabel='Topup Collateral Amount'
          value={topupCollateralAmount}
          max={currentData ? currentData.amount : 0}
          suffix='DAI'
          disabled={
            topupCollateralAmount > (currentData ? currentData.amount : 0)
          }
        />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => this.closeModal('modalIsOpen')}
          style={customStyles}
          contentLabel='Order Book'
        >
          <h2>Position Detail</h2>
          <button onClick={() => this.closeModal('modalIsOpen')} />
          <div className='ModalBody'>
            <div className='Info'>
              <table>
                {Object.keys(modalData).map(key => (
                  <tr>
                    <td>{key}</td>
                    <td>{modalData[key].toString()}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default List
