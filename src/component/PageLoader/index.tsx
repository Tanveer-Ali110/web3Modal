import React from 'react'
import styled from 'styled-components'
// import Spinner from './Spinner'
// import Page from '../layout/Page'

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  padding-left: 16px;
  padding-right: 16px;
`


const Page = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 16px;
`


const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return <Wrapper>{/* <Spinner /> */}</Wrapper>
}

export default PageLoader
