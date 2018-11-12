import React from 'react'
import { Switch, Route } from 'react-router'

import Layout from './containers/layout/Layout'
import LoginPage from './containers/LoginPage'
import LoggedInPage from './containers/LoggedInPage'
import HomePage from './containers/HomePage'
import OverviewPage from './containers/OverviewPage'
import ImportPage from './containers/ImportPage'
import MessageDetailsPage from './containers/MessageDetailsPage'

export default (
  <Layout>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/loggedin" component={LoggedInPage} />
      <Route exact path="/overview" component={OverviewPage} />
      <Route exact path="/import" component={ImportPage} />
      <Route path="/details/:thread_path" component={MessageDetailsPage} />
    </Switch>
  </Layout>
);