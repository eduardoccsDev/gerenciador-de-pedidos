<template>
    <div class="container">
        <div class="main">
            <h1>Editar combo: {{ nomeCombo }}</h1>
            <editComboForm/>
            <ReturnBtn/>
        </div>
    </div>
</template>

<script>
import ReturnBtn from "../components/returnBtn.vue";
import editComboForm from "../components/editComboForm.vue";
export default {
    name: 'editarCombo',
    components: {
    editComboForm,
    ReturnBtn
},
}
</script>

<style lang="scss" scoped>

</style>