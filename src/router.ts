import Vue from 'vue';
import Router from 'vue-router';
import Register from './views/Register.vue';
import Draw from './views/Draw.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/draw',
      name: 'draw',
      component: Draw,
    },
    {
      path: '/*',
      name: 'register',
      component: Register,
    },
  ],
});
