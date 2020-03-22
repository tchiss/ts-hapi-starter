import { MyClass } from '../src/Class'

describe('MyClaass', () => {
  it('should work', () => {
    const cl = new MyClass('haha')
    expect(true).toBeTruthy()
    expect(cl.props).toBe('haha')
  })
})
