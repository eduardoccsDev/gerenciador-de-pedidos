<template>
    <div>
        <img 
        :src="avatar" 
        :alt="description" 
        width="100" 
        height="100"
        >
        <MudarImagem @MudarImagem="trocarImagem"/>
    </div>
</template>

<script>
    import MudarImagem from './MudarImagem.vue'
    export default{
        components: { MudarImagem },
        name:'Picture',
        data(){
            return{
                avatar: '/img/user.svg',
                description: 'Eduardo Castro'
            }
        },
        methods:{
            trocarImagem(){
                this.avatar = "/img/user-286.svg"
            }
        }
    }
</script>