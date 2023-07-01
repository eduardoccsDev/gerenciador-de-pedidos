<template>
  <div>
    <Header/>
    <PrimeiroComponente/>
    <p class="paragrafoPai">O dado de app é: {{ onlyTest }}</p>
    <LifeCycle/>
    <Pessoa/>
  </div>
</template>

<script>
  import Pessoa from './components/Pessoa.vue';
  import LifeCycle from './components/LifeCycle.vue';
  import PrimeiroComponente from './components/PrimeiroComponente.vue';
  import Header from './components/Header.vue';
  export default{
    name:'App',
    components:{
      PrimeiroComponente,
      LifeCycle,
      Pessoa,
      Header
    },
    data(){
      return{
        onlyTest: "Teste"
      }
    }
  }
</script>

<style>
  body{
    background-color: #333;
    color:#fff;
  }

  a{
    color:red;
  }
  .teste{
    background-color: #000;
  }
</style>