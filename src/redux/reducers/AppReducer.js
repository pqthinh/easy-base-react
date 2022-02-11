import {
  SHOW_LOADING,
  HIDE_LOADING,
} from '../actionTypes/appActionTypes'

const appState = (state = { loading: false, appInfo: {} }, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return {
        ...state,
        loading: true,
      }
    case HIDE_LOADING:
      return {
        ...state,
        loading: false,
      }
    
    default:
      return state
  }
}
export { appState }
