import React from 'react'

import Heading from '@tds/core-heading'

import { Row, Column } from './components/FlexGrid'

const App = () => {
  return (
    <React.Fragment>
      <Heading level="h2">sizes</Heading>

      <Row reverse>
        <Column xs={12} md={6}>Column 1</Column>
        <Column xs={12} md={6}>Column 2</Column>
      </Row>

    </React.Fragment>
  )
}

export default App
