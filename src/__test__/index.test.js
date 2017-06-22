import React from 'react'
import ReactDOM from 'react-dom'
import Bootstrap from '../bootstrap'

it('renders without crashing', () => {
  const container = document.createElement('div')

  ReactDOM.render(<Bootstrap />, container)
})
