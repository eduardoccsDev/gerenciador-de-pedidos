<template>
  <transition name="grow-in" mode="out-in">
    <div :class="[tipo, 'messageContainer']">
      <i v-if="tipo === 'primary'" class="fa-regular fa-message"></i>
      <i v-if="tipo === 'success'" class="fa-regular fa-circle-check"></i>
      <i v-if="tipo === 'alert'" class="fa-solid fa-triangle-exclamation"></i>
      <p>{{ msg }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Message',
  props: {
    msg: {
      String,
      required: true
    },
    tipo: {
      String,
      default: () => 'primary',
      required: true
    },

  }
}
</script>

<style scoped>
.messageContainer {
  border-radius: 10px;
  padding: 1em;
  width: 500px;
  margin: 30px auto;
  display: flex;
  align-items: center;
}
i{
  margin-right: 1rem;
}

p {
  margin-bottom: 0rem;
}

.messageContainer.primary {
  color: rgb(35, 71, 124);
  background-color: rgb(198, 209, 240);
  border: 2px solid rgb(122, 149, 207);
}
.messageContainer.success {
  color: rgb(35, 124, 35);
  background-color: rgb(198, 240, 198);
  border: 2px solid rgb(112, 172, 112);
}
.messageContainer.alert {
  color: rgb(177, 158, 53);
  background-color: rgb(253, 252, 177);
  border: 2px solid rgb(209, 204, 136);
}
.grow-in-enter-from, .grow-in-leave-to{
  opacity: 0;
  transform: scale(0.3);
}
.grow-in-enter-active, .grow-in-leave.active{
  transition: 0.3s ease-out;
}
</style>