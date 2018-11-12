import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { connectRouter, routerMiddleware, push } from 'connected-react-router'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import createElectronStorage from 'redux-persist-electron-storage'

import user from './stores/user/reducers'
import userActions from './stores/user/actions'
import messages from './stores/messages/reducers'
import messagesActions from './stores/messages/actions'
import folders from './stores/folders/reducers'
import foldersActions from './stores/folders/actions'

const persistConfig = {
  key: 'store',
  storage: createElectronStorage()
}
let persistor = null;

export default function configureStore(initialState, routerHistory) {
  const router = routerMiddleware(routerHistory)

  const actionCreators = {
    ...userActions,
    ...messagesActions,
    ...foldersActions,
    push,
  }

  const reducers = {
    user,
    messages,
    folders
  }

  const middlewares = [thunk, router]

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actionCreators })
    }
    return compose
  })()

  const enhancer = composeEnhancers(applyMiddleware(...middlewares))
  const rootReducer = combineReducers(reducers)
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const rootReducerWithRouter = connectRouter(routerHistory)(persistedReducer)
  const store = createStore(rootReducerWithRouter, initialState, enhancer)
  persistor = persistStore(store)

  return store
}

export {persistor}