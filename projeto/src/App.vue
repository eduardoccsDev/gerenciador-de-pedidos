<template>
  <Navbar :logo="logoSrc" :alt="appName"/>
      <router-view/>
  <Footer/>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  components: { 
    Navbar,
    Footer 
  },
  data(){
    return{
      logoSrc: "/img/logo.png",
      appName: "Gerenciador de pedidos"
    }
  }

}
</script>

<style>
.main{
  min-height: 250px;
  margin-block: 30px;
}
h1{
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: #222;
}
</style>

