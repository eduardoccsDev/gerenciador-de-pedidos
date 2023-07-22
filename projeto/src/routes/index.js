import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/pedidos', component: ()=> import('../views/Pedidos.vue') },
  { path: '/administracao', component: ()=> import('../views/Administracao.vue') },
  { path: '/combos', component: ()=> import('../views/Combos.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
});

export default router;