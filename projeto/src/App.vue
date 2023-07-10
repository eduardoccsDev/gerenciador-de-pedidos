<template>
  <Sidebar/>
  <main>
    <router-view/>
    <Footer/>
  </main>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  components: {
    Navbar,
    Footer,
    Sidebar
},
  data(){
    return{
      logoSrc: "/img/logo.png",
      appName: "Gerenciador de pedidos"
    }
  }

}
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
body{
  background-color: var(--light);
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
  main{
    flex: 1 1 0 ;
    padding:2rem;

    @media(max-width: 768px){
      padding-left: 6rem;
    }
  }
}
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

