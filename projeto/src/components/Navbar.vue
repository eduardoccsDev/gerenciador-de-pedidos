<template>
  <nav>
    <router-link to="/">
        <img :src="logo" id="logo">
    </router-link>
    <ul>
        <li>
            <router-link to="/">
            Home
            </router-link>
        </li>
        <li>
            <router-link to="/pedidos">
            Pedidos
            </router-link>
        </li>
    </ul>
  </nav>
</template>
<!-- SCRIPT -->
<script>
export default {
 name: 'Navbar',
 data(){
    return{
        logo:'/img/logo.png'
    }
 }
}
</script>
<!-- CSS -->
<style scoped>
    nav{
        background-color: rgb(219, 219, 219);
        padding: .5em 1em;
        display: flex;
        justify-content: space-between;
        border-radius: 10px;
    }
    #logo{
        width: 100px;
        height: auto;
    }
    ul{
        padding: 10px;
        list-style: none;
        display: flex;
    }
    li{
        margin-right: 10px;
    }
    ul li a{
        text-decoration: none;
        font-weight: 500;
        color: #111;
        transition: .5s;
        background-color: #fff;
        padding: .5em;
        border-radius: 5px;
    }
    a:hover{
        color: #FEB50B;
    }
</style>

