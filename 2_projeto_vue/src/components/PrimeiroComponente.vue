<template>
    <div>
        <h1>Olá Vue!</h1>
        <p>Meu nome é {{ name }}, ocupo a função de {{ occupation }}.</p>
        <MultiplosEventos/>
        <Reutilizacao/>
        <Reutilizacao/>
    </div>
</template>

<script>
    import MultiplosEventos from './MultiplosEventos.vue'
    import Reutilizacao from './Reutilizacao.vue'
    export default{
    components: { MultiplosEventos },
        name: 'PrimeiroComponente',
        components:{
            MultiplosEventos, 
            Reutilizacao
        },
        data(){
            return{
                name: "Eduardo",
                occupation: "Desenvolvedor"
            }
        }
    }
</script>
