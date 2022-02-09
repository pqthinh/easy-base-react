import { API_GET_USER_DETAIL, REGISTER_USER } from 'configs/api/apiPath'
import axios from 'configs/api/baseUrl'
import { firebase } from 'configs/firebaseConfig'
import { withEmpty, withNull, withObject, withBoolean } from 'exp-value'
import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS
} from '../actionTypes/userActionTypes'

export const signup =
  ({ data }) =>
  async dispatch => {
    try {
      console.log(data, "data")
      const registerUser = {}
      if (withBoolean('data.status', registerUser)) {
        dispatch({ type: SIGNUP_SUCCESS, payload: 'Đăng ký thành công' })
      } else {
        dispatch({ type: SIGNUP_FAILED, payload: 'Email đã được sử dụng' })
      }
    } catch (error) {
      let message
      if (error?.code === 'auth/email-already-in-use') {
        message = 'Email đã được sử dụng'
      } else if (error?.code === 'auth/invalid-email') {
        message = 'Email không đúng định dạng'
      } else message = withEmpty('message', error)

      dispatch({ type: SIGNUP_FAILED, payload: message })
    }
  }
export const login =
  ({ email, password, handleCheck }) =>
  async dispatch => {
    try {
      dispatch({ type: LOGIN_REQUEST })
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)

      if (withEmpty('user.uid', res)) {
        const getUserInfo = await axios.get(
          API_GET_USER_DETAIL(withEmpty('user.uid', res))
        )

        if (withNull('data.status', getUserInfo)) {
          console.log(withNull('data.status', getUserInfo))
          dispatch({
            type: LOGIN_SUCCESS,
            payload: withObject('data.data', getUserInfo)
          })
          handleCheck(LOGIN_SUCCESS, true, 'Đăng nhập thành công')
        }
      }
    } catch (error) {
      let message
      switch (error?.code) {
        case 'auth/user-not-found':
          message = 'Tài khoản không tồn tại'
          break
        case 'auth/wrong-password':
          message = 'Mật khẩu ko chính xác '
          break
        case 'auth/too-many-requests':
          message = 'Đăng nhập quá số lần quy định'
          break
        default:
          message = error.toString() || 'Lỗi mạng '
          break
      }
      console.log(message)
      dispatch({ type: LOGIN_FAILED, payload: message })
      handleCheck(LOGIN_FAILED, false, message)
    }
  }

export const logout = () => async dispatch => {
  try {
    const res = await firebase.auth().signOut()
    dispatch({ type: LOGOUT, payload: res })
    await AsyncStorage.removeItem('@root')
  } catch (error) {
    dispatch({ type: LOGOUT, payload: 'Logout failed' || error.toString() })
  }
}

export const showAlert = () => async dispatch => {
  dispatch({ type: SHOW_ALERT, payload: 'Không có quyền truy cập' })
}