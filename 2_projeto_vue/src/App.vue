<template>
  <div>
    <PrimeiroComponente/>
    <p>O dado de app é: {{ onlyTest }}</p>
    <LifeCycle/>
    <Pessoa/>
  </div>
</template>

<script>
  import Pessoa from './components/Pessoa.vue';
  import LifeCycle from './components/LifeCycle.vue';
  import PrimeiroComponente from './components/PrimeiroComponente.vue';
  export default{
    name:'App',
    components:{
      PrimeiroComponente,
      LifeCycle,
      Pessoa
    },
    data(){
      return{
        onlyTest: "Teste"
      }
    }
  }
</script>
