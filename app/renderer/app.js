import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createMemoryHistory } from 'history'
import { initializeIcons } from 'office-ui-fabric-react';

import routes from './routes'
import configureStore, {persistor} from './store'
import { defaultStateUser } from './stores/user/defaultState'
import { defaultStateMessages } from './stores/messages/defaultState'
import { PersistGate } from 'redux-persist/integration/react';

// History
const syncHistoryWithStore = (store, history) => {
  const { router } = store.getState()
  if (router && router.location) {
    history.replace(router.location)
  }
}

// Store initial state.
const initialState = {
  ...defaultStateUser,
  ...defaultStateMessages
}

// Store initialization
const routerHistory = createMemoryHistory()
const store = configureStore(initialState, routerHistory)
syncHistoryWithStore(store, routerHistory)

// Office UI icons.
initializeIcons()

// Application launch.
const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'))
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={'We are loading, fuck you motherfuxker !!'} persistor={persistor}>
      <ConnectedRouter history={routerHistory}>{routes}</ConnectedRouter>
    </PersistGate>
  </Provider>,
  rootElement,
)
