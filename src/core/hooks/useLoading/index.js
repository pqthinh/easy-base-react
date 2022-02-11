import React from 'react'
import { showLoading, hideLoading } from '../../../redux/actions/appAction'
import { withBoolean } from 'exp-value'
import { store } from '../../../store/store'
const { dispatch } = store

const useLoading = () => {
  const isLoading = false
  const setLoading = React.useCallback(
    value => {
      if (value instanceof Boolean && value) {
        dispatch(showLoading())
        return
      }

      dispatch(hideLoading())
    },
    [isLoading]
  )

  return {
    isLoading,
    setLoading
  }
}

export default useLoading
