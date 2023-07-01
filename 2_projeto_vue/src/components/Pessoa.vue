<template>
    <div>    
        <h2>Esta é a descrição da pessoa: {{ name }}</h2>
        <Info/>
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
                        name: 'Eduardo'
                    }
                }
    }
</script>