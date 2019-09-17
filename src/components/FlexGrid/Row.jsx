import React from 'react'
import PropTypes from 'prop-types'
import * as TDSPropTypes from '@tds/util-prop-types'
import styled from 'styled-components'

import FlexGridContext from './FlexGridContext'
import { fpo, responsiveProp } from './utils'

const rowDistribute = ({ distribute }) => responsiveProp(distribute, (prop) => ({
  justifyContent: `space-${prop}`
}))
const rowVerticalAlign = ({ verticalAlign }) => responsiveProp(verticalAlign, (prop) => {
  let alignItems
  if (prop === 'top') {
    alignItems = 'flex-start'
  } else if (prop === 'middle') {
    alignItems = 'center'
  } else {
    alignItems = 'flex-end'
  }
  return {
    alignItems
  }
})
const rowReverse = ({ reverse }) => (
  responsiveProp(reverse, (prop) => ({ flexDirection: prop ? 'row-reverse' : 'row' }))
)

const maxWidth = 1200

const StyledRow = styled.div(
  fpo('cornsilk'),
  {
    padding: '0',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
    maxWidth
  },
  rowDistribute,
  rowVerticalAlign,
  rowReverse,
)

const Row = ({ distribute, noGutter, limitWidth, verticalAlign, reverse, children, ...rest }) => {
  return (
    <FlexGridContext.Provider value={{ noGutter }}>
      <StyledRow limitWidth={limitWidth} distribute={distribute} verticalAlign={verticalAlign} reverse={reverse}>
        {children}
      </StyledRow>
    </FlexGridContext.Provider>
  )
}

Row.propTypes = {
  distribute: TDSPropTypes.responsiveProps(PropTypes.oneOf(['around', 'between'])),
  noGutter: TDSPropTypes.responsiveProps(PropTypes.bool),
  verticalAlign: TDSPropTypes.responsiveProps(PropTypes.oneOf(['top', 'middle', 'bottom'])),
  limitWidth: PropTypes.bool,
}

Row.defaultProps = {
  distribute: undefined,
  noGutter: false,
  limitWidth: true,
}

export default Row


/**
 * TODO:
 * horizontalAlign prop
 */
