import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import Login from '../views/Login.vue';

//testes

const checkStoreFunction = async (to, from, next) => {
  const user = await getCurrentUser();

  if (!user) {
    // Usuário não está logado, redirecione para a página de login
    next('/');
    return;
  }

  const userUid = user.uid;

  // Criar uma referência à coleção/nó de usuários no banco de dados
  const db = getDatabase();
  const userRef = ref(db, `users/${userUid}`);

  try {
    // Usar get() para buscar os dados do usuário
    const snapshot = await get(userRef);
    const userData = snapshot.val();

    if (userData && userData.function === 'store') {
      // O usuário tem a função 'store', permita o acesso à rota
      next();
    } else {
      // Redirecionar para uma rota de acesso não autorizado
      next('/');
    }
  } catch (error) {
    console.error(error);
    // Em caso de erro, redirecionar para a página de login ou uma página de erro
    next('/');
  }
};



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
  {
    path: '/pedidos',
    component: () => import('../views/Pedidos.vue'),
    // meta: {
    //   requiresAuth: true,
    // }
    beforeEnter: checkStoreFunction
  },
  {
    path: '/pedido/:id',
    component: () => import('../views/Pedido.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/administracao',
    component: () => import('../views/Administracao.vue'),
    // meta: {
    //   requiresAuth: true,
    // }
    beforeEnter: checkStoreFunction
  },
  {
    path: '/combos',
    component: () => import('../views/Combos.vue'),
    // meta: {
    //   requiresAuth: true,
    // },
    beforeEnter: checkStoreFunction
  },
  {
    path: '/editarCombo/:id',
    component: () => import('../views/editarCombo.vue'),
    // meta: {
    //   requiresAuth: true,
    // }
    beforeEnter: checkStoreFunction
  },
  {
    path: '/profile/:id',
    component: () => import('../views/Profile.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/restaurantes',
    component: () => import('../views/Lojas.vue'),
    meta: {
      requiresAuth: true,
    }
  }
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

//modelo padrão
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