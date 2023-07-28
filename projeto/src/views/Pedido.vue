<template>
  <div class="container">
    <div class="main">
      <h1>Pedido:</h1>
      <PedidoForm/>
      <ReturnBtn/>
    </div>
  </div>
</template>

<script>
import PedidoForm from '../components/PedidoForm.vue';
import ReturnBtn from '../components/returnBtn.vue';
export default {
  name:'Pedidos',
  components:{
    ReturnBtn,
    PedidoForm
}
}
</script>

<style scoped>
</style>