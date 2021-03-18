import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './pages/homePage/HomePage'
import ArticleDetail from './pages/articleDetail/ArticleDetail'

export default function Root() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path={'/'} exact component={HomePage} />
          <Route path={'/article'} exact component={ArticleDetail} />
          <Route
            render={() => {
              window.location.href = '/'
            }}
          />
        </Switch>
      </Router>
    </div>
  )
}
