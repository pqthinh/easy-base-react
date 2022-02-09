import { applyMiddleware, compose, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import appReducer from '../redux/reducers'

const persistConfig = {
  key: 'root',
  storage: storage,
  debug: true,
}

const persistedReducer = persistReducer(persistConfig, appReducer)
const initialState = {}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(persistedReducer, initialState, composeEnhancers(applyMiddleware(thunk)))
export const persistor = persistStore(store)
