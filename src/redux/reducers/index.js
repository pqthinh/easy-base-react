import { combineReducers } from 'redux'
import { userState } from './UserReducer'
import { appState } from './AppReducer'

const appReducer = combineReducers({
  userState,
  appState
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = {}
  }

  return appReducer(state, action)
}

export default rootReducer
