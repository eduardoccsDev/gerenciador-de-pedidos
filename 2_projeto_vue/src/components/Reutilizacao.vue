<template>
    <div>
        <button @click="ativar">Clique aqui!</button>
        <span v-show="ativou">Ativou!</span>
    </div>
</template>

<script>
export default {
    nome: 'Reutilizacao',
    data(){
        return{
            ativou: false
        }
    },
    methods:{
        ativar(){
            this.ativou = !this.ativou
        }
    }
}
</script>
<style scoped>

</style>