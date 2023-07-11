<template>
  <Banner/>
  <div class="container">
    <div class="main">
      <h1>Monte o seu bunger:</h1>
      <BurgerForm/>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner.vue';
import BurgerForm from '../components/BurgerForm.vue';
export default {
    name: 'Home',
    components: { Banner, BurgerForm }
}
</script>

<style>

</style>