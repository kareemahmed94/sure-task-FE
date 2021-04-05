import Vue from 'vue'
import Router from 'vue-router'
import auth from './middleware/auth'
import checkUser from './middleware/checkUser'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Index'
import Users from './pages/users/Index'
import Verify from './pages/Verify'
import EditUsers from './pages/users/Edit'
Vue.use(Router)

function loadView(view) {
  return () => import(`./pages/${view}.vue`);
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: auth,
      meta: {
        auth: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: checkUser,
      meta: {
        auth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: checkUser,
      meta: {
        auth: false
      }
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      beforeEnter: auth,
      meta: {
        auth: true,
      }
    },
    {
      path: '/verify',
      name: 'verify',
      component: Verify,
      beforeEnter: checkUser,
      meta: {
        auth: false,
      }
    },
    {
      path: '/users/edit/:id',
      name: 'users-edit',
      component: EditUsers,
      beforeEnter: auth,
      meta: {
        auth: true,
      }
    },
  ]
})
