<template>
    <div id="burgerTable">
        <Message :msg="msg" :tipo="tipo" v-show="msg" />
        <section class="solicitadosContainer">
            <div class="cardSolicitado" v-for="burger in burgersN" :key="burger.idburger">
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
                    <select name="status" @change="updateBurger($event, burger.idburger, 's', 'burgersN')">
                        <option v-for="s in statusN" :key="s.idstatus" :value="s.nomeStatus"
                            :selected="burger.status == s.nomeStatus">{{ s.nomeStatus }}</option>
                    </select>
                </div>
                <div class="cardFooter">
                    <button type="button" class="btn detalhes" data-bs-toggle="modal"
                        :data-bs-target="'#' + burger.idburger">
                        Detalhes
                    </button>
                    <button class="btn deleteBtn" title="Cancelar" @click="deleteBurger(burger.idburger, 's', 'bugersN')">
                        <i class="fa-solid fa-ban"></i>
                        Cancelar
                    </button>
                </div>
            </div>
        </section>
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button @click="getDados('http://localhost:8800/burgerss', 'burgersN')" class="nav-link active"
                    id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab"
                    aria-controls="pills-home" aria-selected="true">Solicitados</button>
            </li>
            <li class="nav-item" role="presentation">
                <button @click="carregarDados" class="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                    aria-selected="false">Em produção</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact"
                    type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Finalizados</button>
            </li>
        </ul>
        <!-- CONTEUDO -->
        <div class="tab-content" id="pills-tabContent">
            <!-- SOLICITADOS -->
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"
                tabindex="0">
                <div class="cardsContainer">
                    <div class="card" v-for="burger in burgersN" :key="burger.idburger">
                        <!-- The Modal -->
                        <div class="modal" :id="burger.idburger">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <!-- Modal Header -->
                                    <div class="modal-header">
                                        <h4 class="modal-title">
                                            <p>Pedido: #{{ burger.idburger }}</p>
                                        </h4>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <!-- Modal body -->
                                    <div class="modal-body">
                                        <div class="infoCliente">
                                            <div>
                                                <p><i class="fa-solid fa-user"></i>{{ burger.nomeCliente }}</p>
                                                <p><i class="fa-brands fa-whatsapp"></i>
                                                    <a :href="'https://api.whatsapp.com/send?phone=' + burger.telefoneCliente"
                                                        target="_blank">
                                                        {{ burger.telefoneCliente }}
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="hamburgerContent">
                                            <p class="titleDestaque">Hamburguer: </p>
                                            <p>Pão: <span class="pontoC">{{ burger.pao }}</span></p>
                                            <p>Carne: <span class="pontoC">{{ burger.carne }} - ({{ burger.pontoCarne }}) <i
                                                        class="fa-solid fa-fire"></i></span> </p>
                                            <div class="opcionaisModal" v-if="burger.opcionais !== ''">
                                                <p>Opcionais: </p>
                                                <ul>
                                                    <li v-for="item in burger.opcionais.split(',')" :key="item">{{ item }}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="molhosModal" v-if="burger.molhos !== ''">
                                                <p>Molhos: </p>
                                                <ul>
                                                    <li v-for="item in burger.molhos.split(',')" :key="item">{{ item }}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="complementosContent">
                                            <p class="titleDestaque">Complementos: </p>
                                            <p>Guarnição: <span class="pontoC">{{ burger.acompanhamento }}</span></p>
                                            <p>Bebidas: <span class="pontoC">{{ burger.bebidas }} -
                                                    {{ burger.qtdBebida }}</span></p>
                                        </div>
                                    </div>
                                    <!-- Modal footer -->
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="msgVazio" v-if="burgersN.length === 0">Não há pedidos solicitados</div>
                </div>
            </div>
            <!-- EM PRODUÇÃO -->
            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                <div class="sectionEmAndamento">
                    <div class="cardsContainer">
                        <div class="card" :class="({ 'countdownFinished': burger.concluido })" v-for="burger in burgersEP"
                            :key="burger.idburger">
                            <div class="cardTitle">
                                <p>Pedido: #{{ burger.idburger }}</p>
                                <p class="horaPedido"><i class="fa-regular fa-clock"></i> {{ burger.horaPedido }}</p>
                            </div>
                            <div class="timerPreparo">
                                <button :class="({ 'btnDisabled': burger.concluido })" :disabled='burger.concluido'
                                    @click="iniciarContagem(burger)">
                                    <p v-if="burger.concluido" class="tempoTitle">
                                        <i class="fa-solid fa-hourglass-end"></i> Pedido em atraso!
                                    </p>
                                    <p v-else class="tempoTitle">
                                        <i class="fa-solid fa-hourglass-end"></i>
                                        {{ burger.tempo > 0 ? formatarTempo(burger.tempo) : 'Preparar pedido' }}
                                    </p>
                                </button>
                            </div>
                            <div class="cardClientInfo">
                                <p><i class="fa-solid fa-user"></i> {{ burger.nomeCliente }}</p>
                                <p><i class="fa-brands fa-whatsapp"></i>
                                    <a :style="{ 'color': burger.corStatus }"
                                        :href="'https://api.whatsapp.com/send?phone=' + burger.telefoneCliente"
                                        target="_blank">
                                        {{ burger.telefoneCliente }}
                                    </a>
                                </p>
                                <div>
                                    <select name="status"
                                        @change="updateBurger($event, burger.idburger, 'ep', 'burgersEP')">
                                        <option v-for="s in statusN" :key="s.idstatus" :value="s.nomeStatus"
                                            :selected="burger.status == s.nomeStatus">{{ s.nomeStatus }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="cardFooter">
                                <button type="button" class="btn detalhes" :style="{ 'background-color': burger.corStatus }"
                                    data-bs-toggle="modal" :data-bs-target="'#' + burger.idburger">
                                    Detalhes
                                </button>
                                <button class="btn deleteBtn" title="Cancelar"
                                    @click="deleteBurger(burger.idburger, 's', 'bugersN')">
                                    <i class="fa-solid fa-ban"></i>
                                    Cancelar
                                </button>
                            </div>
                            <!-- The Modal -->
                            <div class="modal" :id="burger.idburger">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <!-- Modal Header -->
                                        <div class="modal-header">
                                            <h4 class="modal-title">
                                                <p>Pedido: #{{ burger.idburger }}</p>
                                            </h4>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                        </div>
                                        <!-- Modal body -->
                                        <div class="modal-body">
                                            <div class="infoCliente">
                                                <div>
                                                    <p><i class="fa-solid fa-user"></i>{{ burger.nomeCliente }}</p>
                                                    <p><i class="fa-brands fa-whatsapp"></i>
                                                        <a :href="'https://api.whatsapp.com/send?phone=' + burger.telefoneCliente"
                                                            target="_blank">
                                                            {{ burger.telefoneCliente }}
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="hamburgerContent">
                                                <p class="titleDestaque">Hamburguer: </p>
                                                <p>Pão: <span class="pontoC">{{ burger.pao }}</span></p>
                                                <p>Carne: <span class="pontoC">{{ burger.carne }} - ({{ burger.pontoCarne
                                                }}) <i class="fa-solid fa-fire"></i></span> </p>
                                                <div class="opcionaisModal" v-if="burger.opcionais !== ''">
                                                    <p>Opcionais: </p>
                                                    <ul>
                                                        <li v-for="item in burger.opcionais.split(',')" :key="item">{{ item
                                                        }}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="molhosModal" v-if="burger.molhos !== ''">
                                                    <p>Molhos: </p>
                                                    <ul>
                                                        <li v-for="item in burger.molhos.split(',')" :key="item">{{ item }}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="complementosContent">
                                                <p class="titleDestaque">Complementos: </p>
                                                <p>Guarnição: <span class="pontoC">{{ burger.acompanhamento }}</span></p>
                                                <p>Bebidas: <span class="pontoC">{{ burger.bebidas }} - {{ burger.qtdBebida
                                                }}</span></p>
                                            </div>
                                        </div>
                                        <!-- Modal footer -->
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger"
                                                data-bs-dismiss="modal">Fechar</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="msgVazio" v-if="burgersEP.length === 0">Não há pedidos em produção</div>
                    </div>
                    <button class="reloadBtn" @click="getDados('http://localhost:8800/burgersep', 'burgersEP')">
                        <i class="fa-solid fa-rotate-right"></i> Recarregar pedidos
                    </button>
                </div>
            </div>
            <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
                ...</div>
        </div>
    </div>
</template>

<script>
import Message from './Message.vue';
import axios from 'axios';

export default {
    name: 'Dashboard',
    data() {
        return {
            burgers: null,
            burger_id: null,
            status: [],
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


    },
    methods: {
        carregarDados() {
            if (!this.timerStarted) {
                this.getDados('http://localhost:8800/burgersep', 'burgersEP');
                this.timerStarted = true;
            }
        },
        iniciarContagem(burger) {
            clearInterval(burger.timerId); // Limpa o timer anterior, se houver
            burger.tempo = 10; // Defina o tempo inicial aqui (em segundos)
            burger.concluido = 0;
            burger.timerId = setInterval(() => this.contagemRegressiva(burger), 1000);

            // Salva o estado atual no localStorage
            this.salvarEstado();
        },
        contagemRegressiva(burger) {
            if (burger.tempo > 0) {
                burger.tempo--;
            } else {
                //Contagem regressiva concluida, faca algo aqui
                clearInterval(burger.timerId);
                burger.concluido = 1;
                this.updateConcluido(burger.idburger);
            }
            // Salva o estado atual no localStorage a cada atualização do tempo
            this.salvarEstado();
        },
        formatarTempo(tempo) {
            const minutos = Math.floor(tempo / 60).toString().padStart(2, '0');
            const segundos = (tempo % 60).toString().padStart(2, '0');
            return `Tempo para preparo: ${minutos}:${segundos}`;
        },
        salvarEstado() {
            localStorage.setItem('timerState', JSON.stringify(this.burgersEP));
        },
        carregarEstadoSalvo() {
            const savedState = localStorage.getItem('timerState');
            if (savedState) {
                this.burgersEP = JSON.parse(savedState);
            }
        },
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
                    this.msg = `Pedido  N° ${id} esta atrasado!`
                    this.tipo = "alert"
                    setTimeout(() => this.msg = "", 3000);
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
                    this.msg = `Pedido  N° ${id} atualizado para ${novoStatus}`
                    this.tipo = 'success'
                    setTimeout(() => this.msg = "", 3000);
                    this.getDados(`http://localhost:8800/burgers${sufixo}`, arrayNome);
                })
                .catch(error => {
                    console.error('Erro ao atualizar o status:', error);
                });
        },
        deleteBurger(id, sufixo, arrayNome) {
            axios.delete(`http://localhost:8800/burgers/${id}`)
                .then(response => {
                    this.msg = `Pedido N° ${id} removido com sucesso!`
                    this.tipo = 'success'
                    setTimeout(() => this.msg = "", 3000);
                    this.getDados(`http://localhost:8800/burgers${sufixo}`, arrayNome);
                })
                .catch(error => {
                    console.error('Erro ao excluir o pedido:', error);
                });
        }
    },
    mounted() {
        this.getDados('http://localhost:8800/burgerss', 'burgersN');
        this.getDados('http://localhost:8800/burgersep', 'burgersEP');
        this.getDados('http://localhost:8800/status', 'statusN');
        this.carregarEstadoSalvo();
    }
}
</script>

<style scoped lang="scss">
.timerPreparo .btnDisabled {
    background-color: #b7b7b7 !important;
}

#burgerTable {
    margin: 0 auto
}

.reloadBtn {
    margin: 20px auto 0;
    display: block;
    background-color: #ffb710;
    padding: .5em;
    border-radius: 10px;
    border: none;
    color: #222;
    transition: .5s
}

.reloadBtn:hover {
    background-color: #222;
    color: #ffb710
}

.sectionEmAndamento {
    padding: 1em;
    background-color: #e9e9e9;
    border-radius: 20px
}

.card .tempoTitle {
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 0
}

.card.countdownFinished {
    border: 2px solid #f76363;
    box-shadow: 0 0 10px -2px #ff0000a1
}

.modal-body,
.timerPreparo {
    text-align: left
}

.cardFooter {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: center;
    margin-top: 1em
}

.timerPreparo button {
    width: 100%;
    border-radius: 10px;
    margin-bottom: .5em;
    border: none;
    background-color: #f76363;
    color: #fff;
    padding-block: .5em
}

.horaPedido {
    background-color: #222;
    color: #fff;
    padding: .1em .4em;
    border-radius: 5px
}

.msgVazio {
    margin: auto;
    background-color: #c3e7f9;
    padding: 1em;
    margin-block: 20px;
    border: 2px solid #78bce6;
    border-radius: 10px;
    color: #1a74aa
}

.card p,
.cardTitle {
    margin-bottom: 10px
}

.cardClientInfo,
.infoCliente,
select {
    border-radius: 10px
}

.cardTitle {
    border-bottom: 2px solid #00000014;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: .5em
}

.card .cardTitle p {
    margin-bottom: 0
}

.cardClientInfo {
    background-color: #f1f1f1;
    color: #222;
    padding-block: .5em
}

.cardClientInfo i,
.infoCliente i {
    margin-right: 10px
}

.cardClientInfo a {
    text-decoration: none;
    transition: .5s
}

.cardClientInfo a:hover {
    color: #222 !important
}

.infoCliente {
    padding: .5em 1em;
    background-color: #222;
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center
}

select {
    background-color: #fff;
    border: 1px solid #fff;
    padding: .1em .5em;
    margin-right: .5em
}

.opcionaisModal {
    border-top: 1px solid rgba(0, 0, 0, .062);
    border-bottom: 1px solid rgba(0, 0, 0, .062);
    margin-block: 1em;
    padding-top: 1em
}

.complementosContent,
.hamburgerContent {
    background-color: #f2f2f2;
    padding: .5em 1em;
    border-radius: 10px;
    margin-block: 20px
}

.titleDestaque {
    font-size: 20px;
    border-bottom: 2px solid rgba(0, 0, 0, .062);
    padding-bottom: .5em
}

.detalhes {
    margin-top: 10px;
    color: #fff
}

.card {
    padding: 1em;
    margin: .5em;
    width: 250px;
    text-align: center;
    border-radius: 20px;
    border: 2px solid #fff;
    box-shadow: 0 0 10px -2px #0000003b
}

.cardsContainer {
    display: flex;
    flex-wrap: wrap
}

#burgerTableHeading {
    font-weight: 700;
    padding: 1em;
    border-bottom: 2px solid #333
}

.pontoC {
    display: block;
    font-size: 16px;
    margin-top: 2px
}

.btn {
    margin: 0
}

.deleteBtn {
    background-color: #dd5454;
    color: #fff;
    border: 2px solid #dd5454;
    padding: .2em .3em;
    cursor: pointer;
    transition: .5s;
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    height: 40px;
    border-radius: 6px
}

.deleteBtn:hover {
    background-color: #f18181;
    color: #fff
}

.infoCliente a {
    text-decoration: none;
    color: #feb610
}

#pills-tab {
    justify-content: center
}

.solicitadosContainer {
    display: flex;
    flex-wrap: wrap;

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
}
</style>