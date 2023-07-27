<template>
    <div class="container">
      <div class="main">
        <h1>Combos:</h1>
        <CardCombos/>
        <ReturnBtn/>
      </div>
    </div>
  </template>
  
  <script>
  import CardCombos from '../components/CardCombos.vue';
import ReturnBtn from '../components/returnBtn.vue';
  export default {
      name: 'Combos',
      components:{
    CardCombos,
    ReturnBtn
},
  }
  </script>
  
  <style lang="scss" scoped>
  
  </style>