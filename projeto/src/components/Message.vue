<template>
  <div class="messageContainer">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
    name: 'Message',
    props:{
        msg: String
    }
}
</script>

<style scoped>
    .messageContainer{
        color: rgb(35, 124, 35);
        background-color: rgb(198, 240, 198);
        border: 2px solid rgb(112, 172, 112);
        border-radius: 10px;
        padding: 1em;
        width: 400px;
        margin: 30px auto;
    }
    p{
      margin-bottom: 0rem;
    }
</style>