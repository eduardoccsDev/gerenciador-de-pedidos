<template>
    <div class="container">
        <div class="main">
            <p>ID do combo : {{ comboId }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'editarCombo',
    data() {
        return {
            comboId: null,
        }
    },
    mounted() {
        this.comboId = this.$route.params.id;
    }
}
</script>

<style lang="scss" scoped></style>