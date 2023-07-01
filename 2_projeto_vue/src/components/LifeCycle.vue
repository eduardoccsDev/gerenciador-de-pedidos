<template>
    <h1>Meu nome é: {{ name }}</h1>
</template>

<script>
    export default{
        name:'LifeCycle',
        data(){
            return{
                name:'Ainda não sei'
            }
        },
        created(){
            this.name='Eduardo'
        },
        mounted(){
            this.name='Lia'
        }
    }
</script>