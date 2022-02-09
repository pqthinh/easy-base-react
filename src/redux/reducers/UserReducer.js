import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS
} from '../actionTypes/userActionTypes'

const userState = (state = { loading: false, userInfo: {} }, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        userInfo: null,
        message: ''
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        message: ''
      }
    case SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        message: action.payload
      }
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        message: ''
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        message: ''
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        message: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        userInfo: null,
        loading: false,
        type: action.type,
        message: ''
      }
    default:
      return state
  }
}
export { userState }
