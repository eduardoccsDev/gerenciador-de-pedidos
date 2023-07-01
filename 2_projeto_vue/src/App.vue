<template>
  <div>
    <PrimeiroComponente/>
    <p>O dado de app é: {{ onlyTest }}</p>
    <LifeCycle/>
  </div>
</template>

<script>
  import LifeCycle from './components/LifeCycle.vue';
  import PrimeiroComponente from './components/PrimeiroComponente.vue';
  export default{
    name:'App',
    components:{
      PrimeiroComponente,
      LifeCycle
    },
    data(){
      return{
        onlyTest: "Teste"
      }
    }
  }
</script>
