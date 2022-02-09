import { withObject } from 'exp-value'
import React from 'react'
import useStorage from '../useStorage'

const useUser = () => {
  const [user, setUser] = React.useState(null)
  const { getValue, saveValue } = useStorage()
  console.log(process.env, 'env')
  const onGetUser = React.useCallback(() => {
    async function getProfile() {
      const u = await getValue(process.env.REACT_APP_SECRET_USER_KEY)
      setUser(withObject('data.user', u))
    }
    getProfile()
  }, [])

  const saveUser = React.useCallback(
    value => {
      setUser(value)
      saveValue(process.env.REACT_APP_SECRET_USER_KEY, value)
    },
    [user]
  )

  React.useEffect(onGetUser, [])

  return { user, saveUser }
}

export default useUser
