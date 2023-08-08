<template>
  <Transition v-show="msg" name="slide" mode="out-in">
    <p class="msgSistema">
      <i class="fa-solid fa-check"></i> Seja bem vindo,
      <span v-if="currentUser && currentUser.displayName">{{ currentUser.displayName }}</span>
    </p>
  </Transition>
  <Sidebar />
  <div class="pageContent">
    <router-view v-slot="{ Component }">
      <transition name="grow-in" mode="out-in">
        <Component :is="Component" />
      </transition>
    </router-view>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
import Sidebar from './components/Sidebar.vue'
import { getAuth } from 'firebase/auth';
export default {
  components: { Footer, Sidebar },
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
        this.msg = true;
        setTimeout(() => this.msg = false, 3000);
        console.log(user);
      }
    });
  },
};
</script>

<style lang="scss">
:root {
  --primary: #FFB711;
  --primary-alt: #cc9411;
  --gray: #737373;
  --dark: #222;
  --dark-alt: #181818;
  --light: #fff;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

#app {
  display: flex;

  .pageContent {
    flex: 1 1 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    @media(max-width: 768px) {
      padding-left: 6rem;
    }
  }
}

.main {
  min-height: 250px;
  margin-block: 30px;
}

main {
  will-change: transform, opacity;
}

h1 {
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: #fff;
  background-color: var(--dark);
  padding: .5em;
  border-radius: 10px;
  width: 100%;
}

.grow-in-enter-from,
.grow-in-leave-to {
  opacity: 0;
  transform: scale(0.3);
}

.grow-in-enter-active,
.grow-in-leave.active {
  transition: 0.3s ease-out;
}

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
}
</style>

