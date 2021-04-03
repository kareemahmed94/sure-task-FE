import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
  return () => import(`./pages/${view}.vue`);
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: loadView('Index'),
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: loadView('Login'),
      meta: {
        auth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: loadView('Register'),
      meta: {
        auth: false
      }
    },
  ]
})
