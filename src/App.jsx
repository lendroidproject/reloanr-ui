import React, { Component } from 'react'
import FadeIn from 'react-fade-in'

import {
  Route,
  Switch
} from 'react-router-dom'

import Orders from './components/Orders/Orders'
import {
  PageDesktop
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
          </Switch>
        </div>
      </FadeIn >
    )
  }
}

export default App
