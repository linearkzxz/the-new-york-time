import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './pages/homePage/HomePage'

export default function Root() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path={'/'} exact component={HomePage} />
        </Switch>
      </Router>
    </div>
  )
}
