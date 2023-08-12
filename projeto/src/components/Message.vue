<template>
  <Transition name="grow-in" mode="out-in">
    <div :class="[tipo, 'messageContainer']">
      <p class="msg">
        <i v-if="tipo === 'primary'" class="fa-regular fa-message"></i>
        <i v-if="tipo === 'success'" class="fa-solid fa-check"></i>
        <i v-if="tipo === 'alert'" class="fa-solid fa-triangle-exclamation"></i>
        {{ msg }}
      </p>
    </div>
  </Transition>
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

<style scoped lang="scss">
.messageContainer {
  background-color: var(--dark);
  color: #fff;
  padding: .5em;
  border-radius: 10px;
  width: fit-content;
  position: absolute;
  right: 15px;
  top: 15px;
  box-shadow: 5px 5px 4px -3px #00000082;
  &.success{
    .msg{
      i{
        background-color: rgb(119, 209, 119);
      }
    }
  }
  &.alert{
    .msg{
      i{
        background-color: rgb(209, 119, 119);
      }
    }
  }
  .msg {
    margin-bottom: 0px;
    font-size: 18px;

    i {
      background-color: rgb(119, 149, 209);
      padding: .3em .3em;
      border-radius: 100%;
      color: #fff;
    }
  }

}

.grow-in-enter-from,
.grow-in-leave-to {
  opacity: 0;
  transform: scale(0.3);
}

.grow-in-enter-active,
.grow-in-leave.active {
  transition: 0.3s ease-out;
}
</style>