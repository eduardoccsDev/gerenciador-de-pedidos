<template>
    <div class="cardSolicitado" v-for="burger in query" :key="burger.idburger">
        <div class="headerCard">
            <div class="pedidoCode">
                <p>Pedido N° {{ burger.idburger }}</p>
                <p class="horaPedido"><i class="fa-regular fa-clock"></i> {{ burger.horaPedido }}</p>
            </div>
            <div class="nomeCombo">
                <p>Combo: {{ burger.nomeCombo }}</p>
            </div>
        </div>
        <div class="clienteInfo">
            <div class="pessoalInfo">
                <p><i class="fa-solid fa-user"></i> {{ burger.nomeCliente }}</p>
                <p><i class="fa-brands fa-whatsapp"></i>
                    <a :href="'https://api.whatsapp.com/send?phone=' + burger.telefoneCliente" target="_blank">
                        {{ burger.telefoneCliente }}
                    </a>
                </p>
            </div>
            <div class="entregaInfo">
                Endereco aqui
            </div>
        </div>
        <div class="statusContainer">
            <select name="status" @change="updateBurger($event, burger.idburger, sufixoUrl, ArrayName)">
                <option v-for="s in statusN" :key="s.idstatus" :value="s.nomeStatus"
                    :selected="burger.status == s.nomeStatus">{{ s.nomeStatus }}</option>
            </select>
        </div>
        <div class="cardFooter">
            <button type="button" class="btn detalhes" data-bs-toggle="modal" :data-bs-target="'#' + burger.idburger">
                Detalhes
            </button>
            <button class="btn deleteBtn" title="Cancelar" @click="deleteBurger(burger.idburger, sufixoUrl, ArrayName)">
                <i class="fa-solid fa-ban"></i>
                Cancelar
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CardPedidos',
    props: {
        query: {
            type: Array,
            default: []
        },
        ArrayName:{
            type: String
        },
        sufixoUrl:{
            type: String
        }
    },
    data() {
        return {
            burgers: null,
            burger_id: null,
            status: [],
            burgersN: [],
            burgersEP: [],
            statusN: [],
            timerStarted: false,

        }
    },
    components: {
        

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
        updateConcluido(id) {
            const concluido = 1;

            axios.put(`http://localhost:8800/burgersc/${id}`, { concluido: concluido })
                .then(response => {
                    
                })
                .catch(error => {
                    console.error('Erro ao concluir o pedido:', error);
                });
        },
        updateBurger(event, id, sufixo, arrayNome) {
            const novoStatus = event.target.value;

            axios.put(`http://localhost:8800/burgers/${id}`, {
                status: novoStatus,
                ...(novoStatus === 'Solicitado' ? { concluido: 0 } : {})
            })
                .then(response => {
                    this.getDados(`http://localhost:8800/burgers${sufixo}`, arrayNome);
                })
                .catch(error => {
                    console.error('Erro ao atualizar o status:', error);
                });
        },
        deleteBurger(id, sufixo, arrayNome) {
            axios.delete(`http://localhost:8800/burgers/${id}`)
                .then(response => {
                    
                    this.getDados(`http://localhost:8800/burgers${sufixo}`, arrayNome);
                })
                .catch(error => {
                    console.error('Erro ao excluir o pedido:', error);
                });
        }
    },
    mounted() {
        this.getDados('http://localhost:8800/status', 'statusN');
    }
}
</script>

<style scoped lang="scss">
.cardSolicitado {
    background-color: #fff;
    padding: 1em;
    margin-inline: .5em;
    border-radius: 10px;
    margin-bottom: 1em;
    width: 400px;
    border: solid 2px #fff;
    box-shadow: 0px 0px 15px -2px #0000002a;
    transition: .5s;

    &:hover {
        border: solid 2px var(--primary);
        box-shadow: 0px 0px 15px -2px #F9B21157;
    }

    .headerCard {
        .pedidoCode {
            display: flex;
            justify-content: space-between;
            border-bottom: solid 3px #c0c0c044;
            align-items: center;
            margin-bottom: .5em;

            p {
                margin-bottom: .5em
            }

            .horaPedido {
                background-color: #222;
                color: #fff;
                padding: .1em .4em;
                border-radius: 5px
            }
        }

        .nomeCombo {
            background-color: var(--dark);
            color: #fff;
            padding: .5em;
            border-radius: 5px;

            p {
                margin-bottom: 0px;
            }
        }

    }

    .clienteInfo {
        background-color: #e9e9e979;
        padding: .5em;
        border-radius: 5px;
        margin-block: .5em;
        display: flex;
        justify-content: space-between;
    }

    .statusContainer {
        select {
            width: 100%;
            background-color: #fff;
            border: solid 1px #1a1a1a5e;
        }
    }

    .cardFooter {
        .detalhes {
            background-color: #00cfff;
        }
    }
}
</style>