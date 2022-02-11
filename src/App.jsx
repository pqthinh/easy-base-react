import 'antd/dist/antd.css'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import Loading from './components/Loading'
import LightTheme from './config/theme/LightTheme'
import { useLoading, useToken } from './core/hooks'
import './index.css'
import Routes from './routes'
import { persistor, store } from './store/store'

const App = () => {
  const { isLoggedIn } = useToken()
  const { isLoading } = useLoading()

  return (
    <Provider store={store}>
      <ThemeProvider theme={LightTheme}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <ToastProvider
            autoDismiss
            autoDismissTimeout={6000}
            placement='top-right'
          >
            <React.Fragment>
              <BrowserRouter history={createMemoryHistory}>
                {isLoading ? <Loading /> : null}
                <Routes isLoggedIn={isLoggedIn} />
              </BrowserRouter>
            </React.Fragment>
          </ToastProvider>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  )
}

export default App
