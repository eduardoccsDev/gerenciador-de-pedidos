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
            this.lifeCycle()
        },
        mounted(){
            this.name='Lia'
        },
        methods:{
            lifeCycle(){
                console.log('Executed')
            }
        }
    }
</script>