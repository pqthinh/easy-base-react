import React from 'react'
import useStorage from '../useStorage'

const useToken = () => {
  const { getValue, saveValue } = useStorage()
  const [{ isLoggedIn, token }, setToken] = [
    { isLoggedIn: false, token: 'thinh' },
    () => {}
  ]
  const clearToken = React.useCallback(() => onSaveToken(null), [token])

  const onSaveToken = React.useCallback(
    v => {
      const execute = async () => {
        await saveValue(process.env.REACT_APP_SECRET_TOKEN_KEY, v)
      }

      execute()
      setToken(v)
    },
    [token]
  )

  const onLoadToken = React.useCallback(() => {
    const execute = async () => {
      const jsonToken = await getValue(process.env.REACT_APP_SECRET_TOKEN_KEY)

      if (jsonToken) onSaveToken(jsonToken)
    }
    execute()
  }, [token])

  React.useEffect(onLoadToken, [])

  return { token, isLoggedIn, saveToken: onSaveToken, clearToken }
}

export default useToken
