<template>
  <div>
    <PrimeiroComponente/>
    <p>O dado de app é: {{ onlyTest }}</p>
  </div>
</template>

<script>
  import PrimeiroComponente from './components/PrimeiroComponente.vue';
  export default{
    name:'App',
    components:{
      PrimeiroComponente
    },
    data(){
      return{
        onlyTest: "Teste"
      }
    }
  }
</script>
