import React, { Component } from 'react'
import FadeIn from 'react-fade-in'

import {
  Route,
  Switch
} from 'react-router-dom'

import Orders from './components/Orders/Orders'
import {
  PageDesktop,
  PageMetaMaskLogIn,
  PageMetaMaskMissing,
  PageNotFound,
} from './components/Pages'

import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <FadeIn>
        <div className="AppWrapper">
          <Switch>
            <Route exact path='/'
              render={() => <Orders />}
            />
            <Route exact path='/desktop'
              render={() => <PageDesktop />}
            />
            <Route exact path='/metamask-missing'
              render={() => <PageMetaMaskMissing />}
            />
            <Route exact path='/metamask-not-logged-in'
              render={() => <PageMetaMaskLogIn />}
            />
            <Route render={() => <PageNotFound />} />
          </Switch>
        </div>
      </FadeIn >
    )
  }
}

export default App
