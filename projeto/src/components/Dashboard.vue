<template>
    <div id="burgerTable">
        <Message :msg="msg" :tipo="tipo" v-show="msg" />
        <h2 class="sectionTitle">Solicitados:</h2>
        <section class="solicitadosContainer">
            <CardPedidos @burgers-updated="updateBurgersN" :query="burgersN" ArrayName="burgersN" sufixoUrl="s" />
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
            isUpdatingBurgersN: false,

        }
    },
    components: {
        Message,
        CardPedidos
    },
    methods: {
        async getDados(url, propriedade) {
            try {
                const response = await axios.get(url);
                if (response.status === 200) {
                    this[propriedade] = response.data;
                }
            } catch (error) {
                console.log('Erro ao obter os dados:', error);
            }
        },
        updateBurgersN(newBurgersN) {
            this.burgersN = newBurgersN;
        },
    },

    mounted() {
        this.getDados('http://localhost:8800/burgersep', 'burgersEP');
        this.getDados('http://localhost:8800/burgerss', 'burgersN');
    },
    watch: {
    burgersN(newVal) {
      // Verifica se já não está no meio de uma atualização
      if (!this.isUpdatingBurgersN) {
        // Define a variável de controle para true antes de chamar getDados
        this.isUpdatingBurgersN = true;
        this.getDados('http://localhost:8800/burgerss', 'burgersN');
        this.getDados('http://localhost:8800/burgersep', 'burgersEP');
        // Define a variável de controle de volta para false após as chamadas
        this.isUpdatingBurgersN = false;
      }
    },
  },
}
</script>

<style scoped lang="scss">
#burgerTable {
    margin: 0 auto
}

.solicitadosContainer {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2em;
}

.sectionTitle {
    text-align: center;
    padding: .2em;
    background-color: var(--dark);
    color: #fff;
    border-radius: 10px;
    margin: 0 auto;
    width: 400px;
    margin-bottom: 1em;
}
</style>