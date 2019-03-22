import Vue from 'vue'
import Router from 'vue-router'
import Usuario from './views/Usuario.vue'
import Soporte from './views/Soporte.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Usuario
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: Usuario
    },
    {
      path: '/soporte',
      name: 'soporte',
      component: Soporte
    },
  
  ]
})
