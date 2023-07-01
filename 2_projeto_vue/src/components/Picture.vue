<template>
    <img :src="avatar" :alt="description" width="100" height="100">
</template>

<script>
    export default{
        name:'Picture',
        data(){
            return{
                avatar: '/img/user.svg',
                description: 'Eduardo Castro'
            }
        }
    }
</script>