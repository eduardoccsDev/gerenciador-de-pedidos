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

<style scoped>
  footer{
    background-color: rgb(219, 219, 219);
    padding:20px;
    border-radius: 10px 10px 0px 0px;
    height: 200px;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    /* position: absolute; */
  }
  .containerFlexC{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>