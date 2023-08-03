<template>
  <Sidebar/>
  <div class="pageContent">
    <router-view v-slot="{ Component }">
      <transition name="grow-in" mode="out-in">
        <Component :is="Component"/>
      </transition>
    </router-view>
    <Footer/>
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue'
import Sidebar from './components/Sidebar.vue'
</script>

<style lang="scss">
:root{
  --primary : #FFB711;
  --primary-alt: #cc9411;
  --gray: #737373;
  --dark: #222;
  --dark-alt: #181818;
  --light: #fff;
  --sidebar-width: 300px;
}
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

button{
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
#app{
  display: flex;
  .pageContent{
    flex: 1 1 0 ;
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    @media(max-width: 768px){
      padding-left: 6rem;
    }
  }
}
.main{
  min-height: 250px;
  margin-block: 30px;
}
main{
  will-change: transform, opacity;
}
h1{
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: #fff;
  background-color: var(--dark);
  padding: .5em;
  border-radius: 10px;
  width: 100%;
}
.grow-in-enter-from, .grow-in-leave-to{
  opacity: 0;
  transform: scale(0.3);
}
.grow-in-enter-active, .grow-in-leave.active{
  transition: 0.3s ease-out;
}

</style>

