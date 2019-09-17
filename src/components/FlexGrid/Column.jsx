import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as TDSPropTypes from '@tds/util-prop-types'

import { media } from '@tds/core-responsive'

import FlexGridContext from './FlexGridContext'

import { fpo, mergeMediaQueries, responsiveProp } from './utils'

const getColumnWidth = width => ({ width: `${width / 12 * 100}%` })
const columnGutter = ({ noGutter }) => (
  responsiveProp(noGutter, (prop) => ({ padding: `0 ${prop ? 0 : 1}rem` }))
)

const columnSize = ({ xs, sm, md, lg, xl }) => {
  const xsWidth = xs && getColumnWidth(xs)
  const smWidth = sm && media.from('sm').css(getColumnWidth(sm))
  const mdWidth = md && media.from('md').css(getColumnWidth(md))
  const lgWidth = lg && media.from('lg').css(getColumnWidth(lg))
  const xlWidth = xs && media.from('xl').css(getColumnWidth(xl))

  return {
    ...mergeMediaQueries([xsWidth, smWidth, mdWidth, lgWidth, xlWidth]),
    flex: (xsWidth || smWidth || mdWidth || lgWidth || xlWidth) && 'none',
  }
}

const columnOffset = ({ offset }) => (
  responsiveProp(offset, (prop) => ({ marginLeft: getColumnWidth(prop).width }))
)

const StyledColumn = styled.div(
  fpo('blanchedalmond'),
  {
    display: 'block',
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1
  },
  columnSize,
  columnGutter,
  columnOffset,
);

const Column = ({ xs, sm, md, lg, xl, offset, children }) => (
  <FlexGridContext.Consumer>
    {({ noGutter }) => {
      return (
        <StyledColumn xs={xs} sm={sm} md={md} lg={lg} xl={xl} noGutter={noGutter} offset={offset}>
          {children}
        </StyledColumn>
      )
    }}
  </FlexGridContext.Consumer>
);

Column.propTypes = {
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  offset: TDSPropTypes.responsiveProps(PropTypes.number),
}

Column.defaultProps = {
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
}

export default Column
