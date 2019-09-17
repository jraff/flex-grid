import { media } from '@tds/core-responsive'

export const fpo = background => () => ({
  boxSizing: 'border-box',
  border: '1px solid black',
  padding: '10px',
  background: background || 'cornsilk',
})

export const mergeMediaQueries = (mediaQueries) => {
  const queries = {}
  for (let i = 0, len = mediaQueries.length; i < len; i++) {
    const query = mediaQueries[i]
    if (query) {
      const key = Object.keys(query)[0]
      if (queries[key]) {
        queries[key] = Object.assign({}, queries[key], mediaQueries[i][key])
      } else {
        queries[key] = mediaQueries[i][key]
      }
    }
  }
  return queries
}

export const responsiveProp = (prop, cb) => {
  if (prop) {
    let { xs, sm, md, lg, xl } = prop
    // responsive prop
    if (typeof xs !== 'undefined' || typeof sm !== 'undefined' || typeof md !== 'undefined' || typeof lg !== 'undefined' || typeof xl !== 'undefined') {
      return mergeMediaQueries([
        typeof xs !== 'undefined' && cb(xs, 'xs'),
        typeof sm !== 'undefined' && media.from('sm').css(cb(sm, 'sm')),
        typeof md !== 'undefined' && media.from('md').css(cb(md, 'md')),
        typeof lg !== 'undefined' && media.from('lg').css(cb(lg, 'lg')),
        typeof xl !== 'undefined' && media.from('xl').css(cb(xl, 'xl'))
      ])
    }
    // single prop
    return cb(prop, 'xs')
  }
}
