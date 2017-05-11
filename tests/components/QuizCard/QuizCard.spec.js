import React from 'react'
import { QuizCard } from 'components/QuizCard/QuizCard'
import { shallow } from 'enzyme'

describe('(Component) QuizCard', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<QuizCard item={{
       "question":"A flashing red traffic light signifies that a driver should do what?",
       "A":"stop",
       "B":"speed up",
       "C":"proceed with caution",
       "D":"honk the horn",
       "answer":"A",
       "id":0
    }}/>)
  })

  it('Renders a question title', () => {
    const title = _wrapper.find('h6')
    expect(title).to.exist
    expect(title.text()).to.match(/A flashing red traffic light signifies that a driver should do what?/)
  })

})
