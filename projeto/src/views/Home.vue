<template>
  <div class="container">
    <div class="main">
      <h1>Nossos combos:</h1>
      <CardCombos/>
    </div>
  </div>
</template>

<script>
import CardCombos from '../components/CardCombos.vue';
export default {
    name: 'Home',
    components: { CardCombos }
}
</script>

<style>

</style>