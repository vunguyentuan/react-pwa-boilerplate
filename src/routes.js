import Home from './components/Home'
import About from './components/About'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    loadData: match => store => {
      return store.dispatch({ type: 'INCREASE_COUNTER' })
    }
  },
  {
    path: '/about',
    component: About,
    exact: true,
    loadData: match => store => {}
  }
]

export default routes