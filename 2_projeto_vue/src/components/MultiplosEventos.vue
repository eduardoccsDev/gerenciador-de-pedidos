<template>
    <div>
        <button @click="primeiro($event), segundo($event)">Ativar múltiplos eventos</button>
        <p>{{ multiplosEventos }}</p>
    </div>
</template>

<script>
    export default{
        name:"MultiplosEventos",
        data(){
            return{
                multiplosEventos: ""
            }
        },
        methods:{
            primeiro(e){
                this.multiplosEventos = "Primeiro evento ativado!"
            },
            segundo(e){
                setTimeout(() => this.multiplosEventos = "Segundo evento ativado!", 500)
            }
        }
    }
</script>

<style scoped>
    div{
        margin-block: 100px;
    }
</style>