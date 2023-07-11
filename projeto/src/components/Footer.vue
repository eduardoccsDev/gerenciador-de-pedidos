<template>
  <footer>
    <div class="container containerFlexC">
      <p>Gerenciador de pedidos &copy; 2023</p>
    </div>
  </footer>
</template>

<script>
export default {
name: 'Footer'
}
</script>

<style lang="scss" scoped>
  footer{
    background-color: var(--dark-alt);
    padding:20px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    .containerFlexC{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    p{
      color: #fff;
    }
  }
</style>