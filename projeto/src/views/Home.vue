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
import axios from "axios";
import Banner from '../components/Banner.vue';
import BurgerForm from '../components/BurgerForm.vue';
export default {
    components: { Banner, BurgerForm }
}
</script>

<style>

</style>