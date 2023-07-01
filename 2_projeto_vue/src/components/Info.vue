<template>
    <div>
        <p v-if="estaTrabalhando">Estou trabalhando no momento.</p>
        <p v-else>Estou em busca de novas oportunidades</p>
        <p>Utilizo as seguintes tecnologias:</p>
        <ul>
            <li>JavaScript</li>
            <li>PHP</li>
            <li>Python</li>
        </ul>
        <p v-show="mostrarEmail">Mande uma mensagem para {{ email }}</p>
    </div>
</template>

<script>
    export default{
        name:'Info',
        data(){
            return{
                estaTrabalhando: false,
                mostrarEmail: true,
                email: 'eduardoc.info@gmail.com'
            }
        }
    }
</script>