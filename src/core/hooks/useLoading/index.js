import React from 'react'
import { useSelector, useDispatch } from 'redux'
import { showLoading, hideLoading } from '../../../redux/actions/appAction'
import { withBoolean } from 'exp-value'

const useLoading = () => {
  const isLoading = useSelector(state => withBoolean('appState.loading', state))
  const dispatch = useDispatch()
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
