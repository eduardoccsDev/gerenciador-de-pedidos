<template>
  <div class="container">
    <div class="main">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email</label>
          <input type="email" v-model="emailL" id="email" required />
        </div>
        <div>
          <label for="password">Senha</label>
          <input type="password" v-model="passwordL" id="password" required />
        </div>
        <div>
          <button type="submit">Entrar</button>
          <button @click="singInWithGoogle">Entrar com o Google</button>
        </div>

      </form>
      <h1>Cadastro</h1>
      <form @submit.prevent="register">
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Senha</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div>
          <button type="submit">Cadastrar</button>
        </div>

      </form>
      <p v-if="errMsg">{{ errMsg }}</p>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'vue-router'
const email = ref('');
const password = ref('');
const emailL = ref('');
const passwordL = ref('');
const errMsg = ref();
const router = useRouter()
const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('Cadastrado com sucesso!');
      console.log(auth.currentUser)
      router.push('/dashboard')
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    })

};
const login = () => {
  signInWithEmailAndPassword(getAuth(), emailL.value, passwordL.value)
    .then((data) => {
      console.log('Logado com sucesso!');
      console.log(auth.currentUser)
      router.push('/dashboard')
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'E-mail inválido';
          break;
        case 'auth/user-not-found':
          errMsg.value = 'Nenhuma conta com este e-mail foi encontrada';
          break;
        case 'auth/wrong-password':
          errMsg.value = 'Senha incorreta';
          break;
        default:
          errMsg.value = 'E-mail ou senha incorreto';
          break;
      }
    })

};
const singInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push('/dashboard');
    })
    .catch((error) => {

    })
}

</script>

<style scoped lang="scss"></style>  