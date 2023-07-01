<template>
    <div>
        <p v-if="estaTrabalhando">Estou trabalhando no momento.</p>
        <p v-else>Estou em busca de novas oportunidades</p>
        <p>Utilizo as seguintes tecnologias para back-end:</p>
        <ul>
            <li 
            v-for="(tech, index) in backendTech" 
            :key="index" 
            >
                {{ tech }} 
            </li>
        </ul>
        <p>Utilizo as seguintes tecnologias para front-end:</p>
        <ul>
            <li
            v-for="tech in frontendTech"
            :key="tech.id"
            >
                {{ tech.name }}
            </li>
        </ul>
        <div>
            <button @click="showEmail">{{ textBtn }}</button>
        </div>
        <p v-show="mostrarEmail">Mande uma mensagem para {{ email }}</p>
        <p class="teste">Para acessar meu portfólio basta <a v-bind:href="meuLink" target="_blank">clicar aqui</a></p>
        <Picture/>
    </div>
</template>

<script>
    import Picture from './Picture.vue'
    export default{
    components: { Picture },
            name:'Info',
            components:{
                Picture
            },
            data(){
                return{
                    estaTrabalhando: false,
                    mostrarEmail: false,
                    email: 'eduardoc.info@gmail.com',
                    meuLink: 'https://google.com',
                    textBtn: 'Mostrar E-mail',
                    backendTech:['JavaScript','PHP','Python'],
                    frontendTech:[
                        {id:1 , name:'HTML'},
                        {id:2 , name: 'CSS'},
                        {id:3 , name: 'Vue'}
                    ]
                }
            },
            methods:{
                showEmail(){
                    this.mostrarEmail = !this.mostrarEmail
                    if(!this.mostrarEmail){
                        this.textBtn = 'Mostrar E-mail'
                    }else{
                        this.textBtn = 'Ocultar E-mail'
                    }
                }
            }
    }
</script>

<style>
    .paragrafoPai{
        color: red;
    }
</style>