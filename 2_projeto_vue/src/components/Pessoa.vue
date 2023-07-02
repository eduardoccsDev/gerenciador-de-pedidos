<template>
    <div>    
        <h2>Esta é a descrição da pessoa: {{ name }}</h2>
        <Info
        :email="email"
        :estaTrabalhando="estaTrabalhando"
        />
        <Form/>
    </div>
</template>

<script>
    import Form from './Form.vue';
    import Info from './Info.vue'
    export default{
        components: { Info },
                name:'Pessoa',
                components: {
                    Info,
                    Form
                },
                data(){
                    return{
                        name: 'Eduardo',
                        email: 'eduardoc.info@gmail.com',
                        estaTrabalhando: true
                    }
                }
    }
</script>