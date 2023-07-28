<template>
  <div class="container">
    <div class="main">
      <h1>Combos:</h1>
      <CardCombos :admin-functions="isAdmin" />
      <ReturnBtn />
    </div>
  </div>
</template>
  
<script>
import CardCombos from '../components/CardCombos.vue';
import ReturnBtn from '../components/returnBtn.vue';
export default {
  name: 'Combos',
  components: {
    CardCombos,
    ReturnBtn
  },
  data(){
    return{
      isAdmin: true
    }
  }
}
</script>
  
<style lang="scss" scoped></style>