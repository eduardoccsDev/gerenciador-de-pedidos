<template>
  <div class="container">
    <div class="main">
      <h1>Gerenciar pedidos:</h1>
      <Dashboard/>
      <ReturnBtn/>
    </div>
  </div>
</template>

<script>
import Dashboard from '../components/Dashboard.vue';
import ReturnBtn from '../components/returnBtn.vue';
export default {
  name:'Pedidos',
  components:{
    Dashboard,
    ReturnBtn
}
}
</script>

<style scoped>
  .main{
    min-height: 500px;
  }
</style>