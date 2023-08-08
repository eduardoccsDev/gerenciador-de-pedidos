import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from '../views/Login.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/cadastrar', component: () => import('../views/Cadastro.vue') },

  {
    path: '/dashboard',
    component: () => import('../views/Home.vue'),
    meta: {
      requiresAuth: true,
    }
  },


  { path: '/pedidos', component: () => import('../views/Pedidos.vue') },
  { path: '/pedido/:id', component: () => import('../views/Pedido.vue') },
  { path: '/administracao', component: () => import('../views/Administracao.vue') },
  {
    path: '/combos',
    component: () => import('../views/Combos.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  { path: '/editarCombo/:id', component: () => import('../views/editarCombo.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      // alert('Você deve esta logado!');
      next('/');
    }

  } else {
    next();
  }
});

export default router;