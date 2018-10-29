import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Genres from '@/pages/Genres'
import Songs from '@/pages/Songs'
import GenreDetail from '@/pages/GenreDetail'
import SongDetail from '@/pages/SongDetail'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/genres',
      name: 'Genres',
      component: Genres
    },
    {
      path: '/genres/:id',
      name: 'GenreDetail',
      component: GenreDetail,
      props: true
    },
    {
      path: '/songs',
      name: 'Songs',
      component: Songs
    },
    {
      path: '/songs/:id',
      name: 'SongDetail',
      component: SongDetail,
      props: true
    }
  ]
})
