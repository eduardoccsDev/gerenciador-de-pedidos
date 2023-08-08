<template>
  <div class="container">
    <div class="main">
      <h1>Nossos combos:</h1>
      <CardCombos />
    </div>
  </div>
</template>

<script>
import CardCombos from '../components/CardCombos.vue';
import { getAuth } from 'firebase/auth';

export default {
  name: 'Home',
  components: { CardCombos },
  data() {
    return {
      currentUser: null,
      msg: false
    };
  },
  created() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user; // Atualize currentUser com os dados do usuário
        // console.log(user);
      }
    });
  },
};
</script>

<style scoped lang="scss">
.msgSistema {
  background-color: var(--dark);
  color: #fff;
  padding: .5em;
  border-radius: 10px;
  width: fit-content;
  position: absolute;
  right: 15px;
  top: 15px;
  box-shadow: 5px 5px 4px -3px #00000082;

  i {
    background-color: rgb(119, 209, 119);
    padding: .3em .4em;
    border-radius: 100%;
    color: #fff;
  }

  span {
    font-weight: 600;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}</style>