import multipleSelectors from '../index'

describe('multiple-selectors plugin', () => {
  it('should resolve multiple selectors', () => {
    const style = {
      color: 'blue',
      ':hover,:focus': {
        color: 'red',
      },
    }

    expect(multipleSelectors()(style)).toEqual({
      color: 'blue',
      ':hover': {
        color: 'red',
      },
      ':focus': {
        color: 'red',
      },
    })
  })

  it('should resolve nested objects', () => {
    const style = {
      color: 'blue',
      ':hover,:focus': {
        color: 'red',
        ':active,> div': {
          color: 'green',
        },
      },
    }

    expect(multipleSelectors()(style)).toEqual({
      color: 'blue',
      ':hover': {
        color: 'red',
        ':active': {
          color: 'green',
        },
        '> div': {
          color: 'green',
        },
      },
      ':focus': {
        color: 'red',
        ':active': {
          color: 'green',
        },
        '> div': {
          color: 'green',
        },
      },
    })
  })

  it('should resolve whitespace', () => {
    const style = {
      color: 'blue',
      ':hover, :focus': {
        color: 'red',
      },
    }

    expect(multipleSelectors()(style)).toEqual({
      color: 'blue',
      ':hover': {
        color: 'red',
      },
      ':focus': {
        color: 'red',
      },
    })
  })
})
