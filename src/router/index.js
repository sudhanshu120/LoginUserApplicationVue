import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../components/LogIn.vue'
import SignUp from '../components/SignUp.vue'
import MovieList from '../components/MovieList.vue'

const routes = [
  {
    path: '/',
    name: '',
    component: LogIn
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/movie-list',
    name: 'MovieList',
    component: MovieList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
