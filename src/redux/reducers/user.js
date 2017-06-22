import Immutable from 'seamless-immutable'
const initialState = Immutable({
  counter: 0
})

export default (state = initialState, action) => {
  switch(action.type) {
    case 'INCREASE_COUNTER': {
      return state.set('counter', state.counter + 1)
    }

    default: {
      return state
    }
  }
}