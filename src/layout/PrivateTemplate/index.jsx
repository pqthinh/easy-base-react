import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Container } from './styled'

function PrivateTemplate({children}) {
  return (
    <Container>
      <Sidebar />
      {children}
    </Container>
  )
}

export default PrivateTemplate
