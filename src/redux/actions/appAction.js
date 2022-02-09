import {
  SHOW_LOADING,
  HIDE_LOADING,
} from '../actionTypes/userActionTypes'
export const showLoading = () => async dispatch => {
  dispatch({ type: SHOW_LOADING, payload: true })
}

export const hideLoading = () => async dispatch => {
  dispatch({ type: HIDE_LOADING, payload: false })
}