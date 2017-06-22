import Home from './pages/Home'
import About from './pages/About'

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