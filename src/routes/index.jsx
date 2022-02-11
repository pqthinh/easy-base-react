import PropTypes from 'prop-types'
import React, { lazy, Suspense, useMemo, useCallback, useEffect } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import Loading from '../components/Loading'
import PrivateTemplate from '../layout/PrivateTemplate'
import PublicTemplate from '../layout/PublicTemplate'
import { router } from '../utils/constant/router'

const EmptyPage = lazy(() => import('../pages/EmptyPage'))
//  public page
const LoginPage = lazy(() => import('../pages/Login'))
const SignupPage = lazy(() => import('../pages/Signup'))
// private page
const Dashboard = lazy(() => import('../pages/Dashboard'))

const Routes = ({ isLoggedIn, ...rest }) => {
  const location = useLocation()
  const history = useHistory()

  const isPrivateRouter = useMemo(() => {
    return (
      router.privateRouter.map(e => e.route).indexOf(location.pathname) > -1
    )
  }, [location.pathname])

  const isPublicRouter = useMemo(() => {
    return router.publicRouter.map(e => e.route).indexOf(location.pathname) > -1
  }, [location.pathname])

  const _handleBadRouter = useCallback(() => {
    if (!isPrivateRouter && !isPublicRouter) {
      return (
        <Route
          {...rest}
          path={location.pathname}
          render={props => {
            return <EmptyPage {...rest} {...props} />
          }}
        />
      )
    }
    if (location.pathname == '/') {
      if (isLoggedIn) history.push('/')
      else history.push('/login')
      return null
    }
  }, [location.pathname, isLoggedIn])

  useEffect(() => {
    if (isPrivateRouter && !isLoggedIn) history.push('/login')
    if (isPublicRouter && isLoggedIn) history.push('/')
  }, [location.pathname, isLoggedIn])

  const renderPrivateRouter = useCallback(() => {
    return (
      <PrivateTemplate>
        <Route
          {...rest}
          exact
          path={'/'}
          render={props => {
            return <Dashboard {...rest} {...props} />
          }}
        />
        {_handleBadRouter()}
      </PrivateTemplate>
    )
  }, [isLoggedIn, location.pathname])

  const renderPublicRoute = useCallback(() => {
    return (
      <PublicTemplate>
        <Route
          {...rest}
          exact
          path={['/', '/login']}
          render={props => {
            return <LoginPage {...rest} {...props} />
          }}
        />
        <Route
          {...rest}
          exact
          path={['/register']}
          render={props => {
            return <SignupPage {...rest} {...props} />
          }}
        />
        {_handleBadRouter()}
      </PublicTemplate>
    )
  }, [isLoggedIn, location.pathname])

  const route = useCallback(() => {
    return isLoggedIn !== null
      ? isLoggedIn
        ? renderPrivateRouter()
        : renderPublicRoute()
      : _handleBadRouter()
  }, [isLoggedIn, location.pathname])

  return (
    <Suspense fallback={<Loading />}>
      <Switch>{route()}</Switch>
    </Suspense>
  )
}

Routes.propTypes = {
  isLoggedIn: PropTypes.bool
}

export default Routes
