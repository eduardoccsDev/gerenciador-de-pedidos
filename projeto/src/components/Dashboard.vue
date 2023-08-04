<template>
    <div id="burgerTable">
        <Message :msg="msg" :tipo="tipo" v-show="msg" />
        <h2 class="sectionTitle">Solicitados:</h2>
        <section class="solicitadosContainer">
            <CardPedidos :query="burgersN" ArrayName="burgersN" sufixoUrl="s"/>
        </section>
        <h2 class="sectionTitle">Em produção:</h2>
        <section class="solicitadosContainer">
            <CardPedidos :query="burgersEP" />
        </section>
    </div>
</template>

<script>
import CardPedidos from './CardPedidos.vue';
import Message from './Message.vue';
import axios from 'axios';

export default {
    name: 'Dashboard',
    data() {
        return {
            burgers: null,
            burger_id: null,
            burgersN: [],
            burgersEP: [],
            statusN: [],
            timerStarted: false,
            msg: null,
            tipo: null,

        }
    },
    components: {
        Message,
        CardPedidos
    },
    methods: {
        getDados(url, propriedade) {
            axios.get(url)
                .then(response => {
                    this[propriedade] = response.data;
                })
                .catch(error => {
                    console.log('Erro ao obter os dados:', error);
                });
        },
    },
    mounted() {
        this.getDados('http://localhost:8800/burgerss', 'burgersN');
        this.getDados('http://localhost:8800/burgersep', 'burgersEP');
    }
}
</script>

<style scoped lang="scss">

#burgerTable {
    margin: 0 auto
}
.solicitadosContainer {
    display: flex;
    flex-wrap: wrap;
}
.sectionTitle{
    text-align: center;
    padding: .2em;
    background-color: var(--dark);
    color: #fff;
    border-radius:10px;
    margin: 0 auto;
    width: 400px;
    margin-bottom: 1em;
}
</style>