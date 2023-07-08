<template>
    <nav>
        <div class="container containerFlex">
            <router-link to="/">
                <img :src="logo" :alt="alt" id="logo">
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
                <li>
                    <router-link to="/administracao">
                        Administração
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
<!-- SCRIPT -->
<script>
export default {
    name: 'Navbar',
    props: ['logo', 'alt'],

}
</script>
<!-- CSS -->
<style scoped>
nav {
    background-color: #222;
    padding: .5em 1em;
    border-radius: 0px 0px 10px 10px;
}

.containerFlex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#logo {
    width: 100px;
    height: auto;
}

ul {
    padding: 10px;
    list-style: none;
    display: flex;
}

li {
    margin-right: 10px;
}

ul li a {
    text-decoration: none;
    font-weight: 500;
    color: #111;
    transition: .5s;
    background-color: #fff;
    padding: .5em;
    border-radius: 5px;
}

a:hover {
    color: #FEB50B;
}</style>

