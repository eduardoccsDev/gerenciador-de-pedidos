<template>
    <div v-if="paginatedQuery != ''" class="cardSolicitado" v-for="burger in paginatedQuery" :key="burger.idburger">
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
            <select name="status" @change="updateBurger($event, burger.idburger)">
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
        <!-- Modal -->
        <div class="modal fade" :id="burger.idburger" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">{{ burger.nomeCombo }} - <span>R$
                                {{ formattedValue(burger.valorCombo) }}</span></h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="detalhesContainer">
                            <p v-if="burger.opcionais && burger.opcionais.length > 0">Opcionais do combo</p>
                            <ul class="listaAdcionais" v-if="burger.opcionais && burger.opcionais.length > 0">
                                <li v-for="(opcional, index) in itemList(burger.opcionais)" :key="index">
                                    {{ opcional }}
                                </li>
                            </ul>
                            <span v-else>Não há opcionais disponíveis para este combo.</span>
                        </div>
                        <div class="detalhesContainer">
                            <p v-if="burger.bebidas && burger.bebidas.length > 0">Bebida escolhida</p>
                            <ul v-if="burger.bebidas && burger.bebidas.length > 0" class="listaAdcionais">
                                <li v-for="(bebida, index) in itemList(burger.bebidas)" :key="index">
                                    {{ bebida }}
                                </li>
                            </ul>
                            <span v-else>Não há bebidas disponíveis para este combo.</span>
                        </div>
                        <div class="detalhesContainer">
                            <p v-if="burger.acompanhamento && burger.acompanhamento.length > 0">Acompanhamento escolhido
                            </p>
                            <ul v-if="burger.acompanhamento && burger.acompanhamento.length > 0" class="listaAdcionais">
                                <li v-for="(acompanhamento, index) in itemList(burger.acompanhamento)" :key="index">
                                    {{ acompanhamento }}
                                </li>
                            </ul>
                            <span v-else>Não há acompanhamentos disponíveis para este combo.</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btnFechar btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="msgVazio">
        <p class="msgText">Não há pedidos neste status!</p>
    </div>
    <div class="pagination">
        <button v-if="currentPage > 1" @click="changePage(currentPage - 1)">&lt;</button>
        <button v-for="pageNumber in pageNumbers" :key="pageNumber" @click="changePage(pageNumber)"
            :class="{ currentPage: pageNumber === currentPage }">
            {{ pageNumber }}
        </button>
        <button v-if="currentPage < totalPages" @click="changePage(currentPage + 1)">&gt;</button>
    </div>
</template>

<script>

export default {
    name: 'CardPedidos',
    props: {
        query: {
            type: Array,
            default: []
        },
        ArrayName: {
            type: String
        },
        sufixoUrl: {
            type: String
        }
    },
    watch: {
        burgersN(newVal, oldVal) {
            this.$emit('burgers-updated', newVal);
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
            currentPage: 1,
            itemsPerPage: 6,

        }
    },
    methods: {
        // getDados(url, propriedade) {
        //     axios.get(url)
        //         .then(response => {
        //             this[propriedade] = response.data;
        //         })
        //         .catch(error => {
        //             console.log('Erro ao obter os dados:', error);
        //         });
        // },
        // updateConcluido(id) {
        //     const concluido = 1;

        //     axios.put(`http://localhost:8800/burgersc/${id}`, { concluido: concluido })
        //         .then(response => {

        //         })
        //         .catch(error => {
        //             console.error('Erro ao concluir o pedido:', error);
        //         });
        // },
        // updateBurger(event, id) {
        //     const novoStatus = event.target.value;

        //     axios.put(`http://localhost:8800/burgers/${id}`, {
        //         status: novoStatus
        //     })
        //         .then(response => {
        //         })
        //         .catch(error => {
        //             console.error('Erro ao atualizar o status:', error);
        //         });
        // },
        // deleteBurger(id, sufixo, arrayNome) {
        //     axios.delete(`http://localhost:8800/burgers/${id}`)
        //         .then(response => {

        //             this.getDados(`http://localhost:8800/burgers${sufixo}`, arrayNome);
        //         })
        //         .catch(error => {
        //             console.error('Erro ao excluir o pedido:', error);
        //         });
        // },
        itemList(itemComboList) {
            return itemComboList.split(",");
        },
        changePage(pageNumber) {
            this.currentPage = pageNumber;
        }
    },
    computed: {
        formattedValue() {
            return (value) => {
                return `${value.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })},00`;
            };
        },
        totalPages() {
            return Math.ceil(this.query.length / this.itemsPerPage);
        },
        paginatedQuery() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.query.slice(start, end);
        },
        pageNumbers() {
            const pageNumbers = [];
            let i = 1;
            while (i <= this.totalPages) {
                pageNumbers.push(i);
                i++;
            }
            return pageNumbers;
        }
    },
    mounted() {
        this.getDados('http://localhost:8800/status', 'statusN');

    },
    emits: ['burgers-updated'],
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
        .pessoalInfo{
            a{
                text-decoration: none;
                color: var(--primary-alt);
                transition: .5s;
                &:hover{
                    color: var(--dark);
                }
            }
        }
    }

    .statusContainer {
        select {
            width: 100%;
            background-color: #fff;
            border: solid 1px #1a1a1a5e;
            border-radius: 5px;
            margin-bottom: .5em;
            padding-inline: .5em;
        }
    }

    .cardFooter {
        display: flex;
        justify-content: space-between;

        .btn {
            width: 180px;
            transition: .5s;

            &:hover {
                filter: brightness(80%);
            }
        }

        .detalhes {
            background-color: #00cfff;
        }

        .deleteBtn {
            background-color: rgb(253, 128, 128);
        }
    }

    .modal-dialog {
        height: 90vh;
        display: flex;
        align-items: center;
    }

    .modal-body {
        .detalhesContainer {
            background-color: #e9e9e9;
            padding: .5em;
            border-radius: 5px;
            margin-bottom: .5em;

            p {
                border-bottom: solid 2px #c0c0c0;
                padding-bottom: .2em;
            }
        }
    }

    .modal-footer {
        .btnFechar {
            background-color: rgb(253, 128, 128);
            color: var(--dark);
            border: none;
            transition: .5s;

            &:hover {
                background-color: #D05B5B;
            }
        }
    }

}

.msgVazio{
    width: 100%;
    text-align: center;
    padding: 1em;
    .msgText{
        background-color: #ffb81157;
        padding: 1em;
        border-radius: 10px;
        font-size: 18px;
        color: var(--dark);
    }
}

.pagination {
    display: block;
    width: 100%;
    text-align: center;

    button {
        background-color: var(--primary);
        color: var(--dark);
        padding: .5em;
        margin-right: .3em;
        border-radius: 5px;
        width: 44px;
        font-size: 18px;
        transition: .5s;

        &:hover,
        &.currentPage {
            filter: brightness(80%);
        }
    }
}
</style>