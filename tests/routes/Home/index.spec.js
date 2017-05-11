import HomeRoute from 'routes/Home'

describe('(Route) Home', () => {
  let _component

  beforeEach(() => {
    _component = HomeRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _component).to.equal('object')
  })

})
