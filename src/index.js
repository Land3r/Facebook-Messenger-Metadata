import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Layout from './components/layout/Layout'

import './styles/styles.scss';

import * as serviceWorker from './serviceWorker';
import Homepage from './pages/Homepage';

ReactDOM.render(
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route path='/' exact render={(props) => (
                    <Homepage />
                )} />
                <Route path='/overview' exact render={(props) => (
                    <Homepage />
                )} />
                <Route path='/messages' render={(props) => (
                    <Homepage />
                )} />
            </Switch>
        </Layout>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
