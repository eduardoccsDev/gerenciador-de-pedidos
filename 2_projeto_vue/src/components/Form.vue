<template>
    <div>
        <h1>Meu formulário:</h1>
        <form @submit="enviarFormulario($event)">
            <div>
                <input type="text" v-model="name"/>
            </div>
            <div>
                <input type="email" v-model="email"/>
            </div>
            <div>
                <Submit/>
            </div>
        </form>
    </div>
</template>

<script>
    import InputText from './form/InputText.vue';
    import Submit from './form/Submit.vue';
    export default{
        name: 'Form',
        components:{
            InputText,
            Submit
        },
        data(){
            return{
                name: "",
                email: ""
            }
        },
        methods:{
            enviarFormulario(e){
                e.preventDefault();
                const name = this.name;
                const email = this.email;
                console.log("Formulário enviado!");
                console.log("O nome é: " + name + " e o e-mail é " + email);
                
                // Ajax

                // Inserir no banco os dados
            
            }
        }
    }
</script>

<style scoped>
    input{
        margin-bottom: 10px;
    }
</style>