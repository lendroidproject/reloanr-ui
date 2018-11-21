import React, { Component } from 'react'

import NotFoundImg from 'assets/images/NotFound.svg'
import './NotFound.scss'

class NotFound extends Component {
  render() {
    return (
      <div className="NotFoundWrapper">
        <div className="NotFound">
          <h2 className="Title">Page Not Found</h2>
          <img className="NotFoundImg" src={NotFoundImg} />
          <p class="Description">The page you are looking was loaned out. Visit our <a href="/" class="link">🏡</a> page instead.</p>
        </div>
      </div>
    )
  }
}

export default NotFound
