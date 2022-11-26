import PageLoader from 'component/PageLoader'
import SuspenseWithChunkError from 'component/SuspenseWithChunkError'
import React from 'react'
import { Provider } from 'react-redux'
import store from 'state/store'

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SuspenseWithChunkError fallback ={<PageLoader/>}>
      <Provider store={store}>
        {children}
      </Provider>

    </SuspenseWithChunkError>

  )
}

export default Providers
