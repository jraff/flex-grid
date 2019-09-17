import { media } from '@tds/core-responsive'

import { responsiveProp, mergeMediaQueries } from '../utils'

describe('utils', () => {

  describe('mergeMediaQueries', () => {
    it('merges an array of media queries', () => {
      const result = mergeMediaQueries([
        media.from('sm').css({
          color: 'blue',
        }),
        media.from('md').css({
          color: 'red',
        }),
      ])

      const expectedObject = {
        ...media.from('sm').css({
          color: 'blue',
        }),
        ...media.from('md').css({
          color: 'red',
        }),
      }
      expect(result).toEqual(expectedObject)
    })

    it('deeply merges an array of media queries', () => {
      const result = mergeMediaQueries([
        media.from('sm').css({
          color: 'blue',
        }),
        media.from('md').css({
          color: 'red',
        }),
        media.from('sm').css({
          fontWeight: '500',
        }),
      ])

      const expectedObject = {
        ...media.from('sm').css({
          color: 'blue',
          fontWeight: '500'
        }),
        ...media.from('md').css({
          color: 'red',
        }),
      }
      expect(result).toEqual(expectedObject)
    })
  })

  describe('responsiveProp', () => {
    it('handles a single prop', () => {
      const prop = 'red'
      const c = responsiveProp(prop, (p) => {
        return { color: p }
      })
      expect(c).toEqual({ color: 'red' })
    })

    it('handles a responsive string prop', () => {
      const prop = {
        xs: 'red',
        md: 'blue'
      }

      const expectedObject = {
        color: 'red',
        ...media.from('md').css({
          color: 'blue',
        })
      }
      const c = responsiveProp(prop, (p) => {
        return { color: p }
      })

      expect(c).toEqual(expectedObject)
    })

    it('handles a responsive boolean prop', () => {
      // colour should be red?
      const prop = {
        xs: true,
        md: false,
        lg: true,
        xl: false
      }

      const expectedObject = {
        color: 'red',
        ...media.from('md').css({
          color: 'blue',
        }),
        ...media.from('lg').css({
          color: 'red',
        }),
        ...media.from('xl').css({
          color: 'blue',
        })
      }
      const c = responsiveProp(prop, (p) => {
        return { color: p ? 'red' : 'blue' }
      })

      expect(c).toEqual(expectedObject)
    })
  })
})
