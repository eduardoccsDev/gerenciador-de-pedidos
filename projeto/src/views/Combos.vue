<template>
    <div class="container">
      <div class="main">
        <h1>Combos:</h1>
        <CardCombos/>
      </div>
    </div>
  </template>
  
  <script>
  import CardCombos from '../components/CardCombos.vue';
  export default {
      name: 'Combos',
      components:{
        CardCombos
      },
  }
  </script>
  
  <style lang="scss" scoped>
  
  </style>