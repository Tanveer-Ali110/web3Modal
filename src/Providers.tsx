import PageLoader from 'component/PageLoader'
import SuspenseWithChunkError from 'component/SuspenseWithChunkError'
import React from 'react'
import { Provider } from 'react-redux'
import store from 'state/store'
import { Toaster } from 'react-hot-toast'

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SuspenseWithChunkError fallback ={<PageLoader/>}>
      <Provider store={store}>
      <Toaster position="top-right" reverseOrder={false} />
        {children}
      </Provider>

    </SuspenseWithChunkError>

  )
}

export default Providers
