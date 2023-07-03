<template>
    <div class="container">
        <div id="mainBanner">
            <h1>Faça o buger do seu jeito!</h1>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Banner'
    }
</script>

<style scoped>
    #mainBanner{
        background-image: url('/img/burger(1).jpg');
        background-position: 0 -250px;
        background-size: cover;
        height: 500px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background-repeat: no-repeat;
        border-radius: 10px;
        margin-top: 20px;
    }
    #mainBanner h1{
        color: #fff;
        text-align: center;
        font-size: 40px;
        background-color: #222;
        padding: .5em 1em;
        border-radius: 0px 10px 10px 0px;
        border: 2px solid #ffffff2c;
        border-left: 0px;
    }
</style>