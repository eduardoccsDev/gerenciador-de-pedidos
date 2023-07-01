<template>
    <div>
        <h1>Olá Vue!</h1>
        <p>Meu nome é {{ name }}, ocupo a função de {{ occupation }}.</p>
    </div>
</template>

<script>
    export default{
        name: 'PrimeiroComponente',
        data(){
            return{
                name: "Eduardo",
                occupation: "Desenvolvedor"
            }
        }
    }
</script>
