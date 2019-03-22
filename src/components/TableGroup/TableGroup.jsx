import React, { Component } from 'react'

import Table from '../Table/Table'

import './TableGroup.scss'

class TableGroup extends Component {
  render() {
    const {
      style,
      data,
      address,
      methods,
      loading,
      lastFetchTime,
      web3Utils
    } = this.props
    const left = Object.assign(data.left, data.data, { loading, lastFetchTime })
    const right = Object.assign(data.right, data.data, {
      loading,
      lastFetchTime
    })

    return (
      <div className='TableGroup' style={style}>
        <Table
          data={left}
          classes={data.classes ? data.classes : ''}
          address={address}
          methods={methods}
          web3Utils={web3Utils}
        />
        <Table
          data={right}
          classes={data.classes ? data.classes : ''}
          address={address}
          methods={methods}
          web3Utils={web3Utils}
        />
      </div>
    )
  }
}

export default TableGroup
