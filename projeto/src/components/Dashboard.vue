<template>
  <div id="burgerTable">
    <Message :msg="msg" v-show="msg"/>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Solicitados</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Em produção</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Finalizados</button>
        </li>
    </ul>
    <!-- CONTEUDO -->
    <div class="tab-content" id="pills-tabContent">
        <!-- SOLICITADOS -->
        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
            <div class="cardsContainer">
                <div class="card" v-for="burger in burgersN" :key="burger.idburger">
                    <div class="cardTitle">
                        <p>Pedido: #{{burger.idburger}}</p>
                        <button 
                        class="btn deleteBtn" 
                        title="Cancelar" 
                        @click="deleteBurger(burger.idburger)">
                            <i class="fa-solid fa-ban"></i>
                            Cancelar
                        </button>
                    </div>
                    <div class="cardClientInfo">
                        <p><i class="fa-solid fa-user"></i> {{burger.nomeCliente}}</p>
                        <p><i class="fa-brands fa-whatsapp"></i> 
                            <a :style="{'color':burger.corStatus}" :href="'https://api.whatsapp.com/send?phone='+burger.telefoneCliente" target="_blank">
                                {{burger.telefoneCliente}}
                            </a>
                        </p>
                    </div>
                    <div class="iconsPedido">
                        <p v-if="burger.opcionais !== ''"><i class="fa-solid fa-plus" :style="{'background-color':burger.corStatus}"></i> Opcionais: <span>{{ burger.opcionais.split(',').length }}</span></p>
                        <p v-if="burger.molhos !== ''"><i class="fa-solid fa-droplet" :style="{'background-color':burger.corStatus}"></i> Molhos: <span>{{ burger.molhos.split(',').length }}</span></p>
                        <p v-if="burger.acompanhamento !== ''"><i class="fa-solid fa-bowl-food" :style="{'background-color':burger.corStatus}"></i> Guarnição: <span>{{ burger.bebidas.split(',').length }}</span></p>
                        <p v-if="burger.bebidas !== ''"><i class="fa-solid fa-beer-mug-empty" :style="{'background-color':burger.corStatus}"></i> Bebidas: <span>{{ burger.bebidas.split(',').length }}</span></p>
                    </div>
                    <button type="button" class="btn detalhes" :style="{'background-color':burger.corStatus}" data-bs-toggle="modal" :data-bs-target="'#'+ burger.idburger">
                        Detalhes
                    </button>
                    <!-- The Modal -->
                    <div class="modal" :id="burger.idburger">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title"><p>Pedido: #{{burger.idburger}}</p></h4>
                            <button type="button" class="btn-close"  data-bs-dismiss="modal"></button>
                        </div>
                        <!-- Modal body -->
                        <div class="modal-body">
                            <div class="infoCliente">
                                <div>
                                    <p><i class="fa-solid fa-user"></i>{{burger.nomeCliente}}</p>
                                    <p><i class="fa-brands fa-whatsapp"></i> 
                                        <a :href="'https://api.whatsapp.com/send?phone='+burger.telefoneCliente" target="_blank">
                                            {{burger.telefoneCliente}}
                                        </a>
                                    </p>
                                </div>
                                <div>
                                    <select name="status" @change="updateBurger($event, burger.idburger)">
                                        <option 
                                        v-for="s in statusN" 
                                        :key="s.idstatus" 
                                        :value="s.nomeStatus" 
                                        :selected="burger.status == s.nomeStatus"
                                        >{{s.nomeStatus}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="hamburgerContent">
                                <p class="titleDestaque">Hamburguer: </p>
                                <p>Pão: <span class="pontoC">{{burger.pao}}</span></p>
                                <p>Carne: <span class="pontoC">{{burger.carne}} - ({{burger.pontoCarne}}) <i class="fa-solid fa-fire"></i></span> </p>
                                <div class="opcionaisModal" v-if="burger.opcionais !== ''">
                                    <p>Opcionais: </p>
                                    <ul>
                                        <li v-for="item in burger.opcionais.split(',')" :key="item">{{item}}</li>
                                    </ul>
                                </div>
                                <div class="molhosModal" v-if="burger.molhos !== ''">
                                    <p>Molhos: </p>
                                    <ul>
                                        <li v-for="item in burger.molhos.split(',')" :key="item">{{item}}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="complementosContent">
                                <p class="titleDestaque">Complementos: </p>
                                <p>Guarnição: <span class="pontoC">{{burger.acompanhamento}}</span></p>
                                <p>Bebidas: <span class="pontoC">{{burger.bebidas}} - {{burger.tipoBebida}} - {{burger.qtdBebida}}</span></p>
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
            <div class="cardsContainer">
                <div class="card"  v-for="burger in burgersEP" :key="burger.idburger">
                    <div class="cardTitle">
                        <p>Pedido: #{{burger.idburger}}</p>
                        <button 
                        class="btn deleteBtn" 
                        title="Cancelar" 
                        @click="deleteBurger(burger.idburger)">
                            <i class="fa-solid fa-ban"></i>
                            Cancelar
                        </button>
                    </div>
                    <div class="cardClientInfo">
                        <p><i class="fa-solid fa-user"></i> {{burger.nomeCliente}}</p>
                        <p><i class="fa-brands fa-whatsapp"></i> 
                            <a :style="{'color':burger.corStatus}" :href="'https://api.whatsapp.com/send?phone='+burger.telefoneCliente" target="_blank">
                                {{burger.telefoneCliente}}
                            </a>
                        </p>
                    </div>
                    <div class="iconsPedido">
                        <p v-if="burger.opcionais !== ''"><i class="fa-solid fa-plus" :style="{'background-color':burger.corStatus}"></i> Opcionais: <span>{{ burger.opcionais.split(',').length }}</span></p>
                        <p v-if="burger.molhos !== ''"><i class="fa-solid fa-droplet" :style="{'background-color':burger.corStatus}"></i> Molhos: <span>{{ burger.molhos.split(',').length }}</span></p>
                        <p v-if="burger.acompanhamento !== ''"><i class="fa-solid fa-bowl-food" :style="{'background-color':burger.corStatus}"></i> Guarnição: <span>{{ burger.bebidas.split(',').length }}</span></p>
                        <p v-if="burger.bebidas !== ''"><i class="fa-solid fa-beer-mug-empty" :style="{'background-color':burger.corStatus}"></i> Bebidas: <span>{{ burger.bebidas.split(',').length }}</span></p>
                    </div>
                    <button type="button" class="btn detalhes" :style="{'background-color':burger.corStatus}" data-bs-toggle="modal" :data-bs-target="'#'+ burger.idburger">
                        Detalhes
                    </button>
                    <!-- The Modal -->
                    <div class="modal" :id="burger.idburger">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title"><p>Pedido: #{{burger.idburger}}</p></h4>
                            <button type="button" class="btn-close"  data-bs-dismiss="modal"></button>
                        </div>
                        <!-- Modal body -->
                        <div class="modal-body">
                            <div class="infoCliente">
                                <div>
                                    <p><i class="fa-solid fa-user"></i>{{burger.nomeCliente}}</p>
                                    <p><i class="fa-brands fa-whatsapp"></i> 
                                        <a :href="'https://api.whatsapp.com/send?phone='+burger.telefoneCliente" target="_blank">
                                            {{burger.telefoneCliente}}
                                        </a>
                                    </p>
                                </div>
                                <div>
                                    <select name="status" @change="updateBurger($event, burger.idburger)">
                                        <option 
                                        v-for="s in statusN" 
                                        :key="s.idstatus" 
                                        :value="s.nomeStatus" 
                                        :selected="burger.status == s.nomeStatus"
                                        >{{s.nomeStatus}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="hamburgerContent">
                                <p class="titleDestaque">Hamburguer: </p>
                                <p>Pão: <span class="pontoC">{{burger.pao}}</span></p>
                                <p>Carne: <span class="pontoC">{{burger.carne}} - ({{burger.pontoCarne}}) <i class="fa-solid fa-fire"></i></span> </p>
                                <div class="opcionaisModal" v-if="burger.opcionais !== ''">
                                    <p>Opcionais: </p>
                                    <ul>
                                        <li v-for="item in burger.opcionais.split(',')" :key="item">{{item}}</li>
                                    </ul>
                                </div>
                                <div class="molhosModal" v-if="burger.molhos !== ''">
                                    <p>Molhos: </p>
                                    <ul>
                                        <li v-for="item in burger.molhos.split(',')" :key="item">{{item}}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="complementosContent">
                                <p class="titleDestaque">Complementos: </p>
                                <p>Guarnição: <span class="pontoC">{{burger.acompanhamento}}</span></p>
                                <p>Bebidas: <span class="pontoC">{{burger.bebidas}} - {{burger.tipoBebida}} - {{burger.qtdBebida}}</span></p>
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
            </div>
        </div>
        <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">...</div>
        <div class="tab-pane fade" id="pills-disabled" role="tabpanel" aria-labelledby="pills-disabled-tab" tabindex="0">...</div>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue';
import axios from 'axios';
export default {
    name:'Dashboard',
    data(){
        return{
            burgers: null,
            burger_id: null,
            status: [],
            burgersN:[],
            burgersEP:[],
            statusN:[],
            msg: null
        }
    },
    components:{
        Message,
        
    },
    methods:{
        getDados(url, propriedade) {
            axios.get(url)
            .then(response => {
                this[propriedade] = response.data;
            })
            .catch(error => {
                console.log('Erro ao obter os dados:', error);
            });
        },
        updateBurger(event, id){
            const novoStatus = event.target.value;

            axios.put(`http://localhost:8800/burgers/${id}`,{status:novoStatus})
            .then(response => {
                this.msg = `Pedido #${id} atualizado para ${novoStatus}`
                setTimeout(()=> this.msg = "", 3000);
                this.getDados('http://localhost:8800/burgersep', 'burgersEP');
            })
            .catch(error =>{
                console.error('Erro ao atualizar o status:', error);
            });
        },
        deleteBurger(id){
            axios.delete(`http://localhost:8800/burgers/${id}`)
            .then(response =>{
                this.msg = 'Pedido removido com sucesso!'
                setTimeout(()=> this.msg = "", 3000);
                this.getDados('http://localhost:8800/burgerss', 'burgersN');
            })
            .catch(error => {
                console.error('Erro ao excluir o pedido:', error);
            });
        }

        // async deleteBurger(id){
        //     const req =  await fetch(`http://localhost:3000/burgers/${id}`,{
        //         method: 'DELETE'
        //     });

        //     const res = await req.json();

        //     // Colocar mensagem do sistema
        //     this.msg = 'Pedido removido com sucesso!'

        //     //limpar mensagem
        //     setTimeout(()=> this.msg = "", 3000);

        //     this.getPedidos();
        // },
    },
    mounted(){
       this.getDados('http://localhost:8800/burgerss', 'burgersN');
       this.getDados('http://localhost:8800/burgersep', 'burgersEP');
       this.getDados('http://localhost:8800/status', 'statusN');
    }
}
</script>

<style scoped>
    #burgerTable{
        max-width: 1200px;
        margin: 0 auto;
    }
    .msgVazio {
        margin: auto;
        background-color: rgb(195, 231, 249);
        padding: 1em;
        margin-block: 20px;
        border: 2px solid rgb(120, 188, 230);
        border-radius: 10px;
        color: #1a74aa;
        }
    .cardTitle {
    border-bottom: solid 2px #00000014;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: .5em;
    }
    .card .cardTitle p{
        margin-bottom: 0px;
    }
    .cardClientInfo {
        background-color: #f1f1f1;
        color: #222;
        border-radius: 10px;
        padding-block: .5em;
        }
        .cardClientInfo i{
            margin-right: 10px;
        }
        .cardClientInfo a {
            text-decoration: none;
            transition: .5s;
        }
        .cardClientInfo a:hover{
            color: #222 !important;
        }
    .infoCliente{
        padding: .5em 1em;
        background-color: #222;
        border-radius: 10px;
        color: #fff;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }
    .infoCliente select{
        border-radius: 10px;
        background-color: #fff;
        border: solid 1px #fff;
    }
    .infoCliente i{
        margin-right: 10px;
    }
    .iconsPedido i{
        padding: .3em 6px;
        border-radius: 100%;
        margin-right: 5px;
        
    }
    .opcionaisModal{
        border-top: solid 1px rgba(0, 0, 0, 0.062);
        border-bottom: solid 1px rgba(0, 0, 0, 0.062);
        margin-block: 1em;
        padding-top: 1em;
    }
    .hamburgerContent, .complementosContent{
        background-color: #f2f2f2;
        padding: 0.5em 1em;
        border-radius: 10px;
        margin-block: 20px;
    }
    .titleDestaque{
        font-size: 20px;
        border-bottom: solid 2px rgba(0, 0, 0, 0.062);
        padding-bottom:.5em;
    }
    .modal-body {
    text-align: left;
    }
    .iconsPedido {
    margin-top: 10px;
    border-top: solid 2px #ebebeb;
    padding-top: 1em;
    min-height: 160px;
    }
    .iconsPedido{
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
    }
    .detalhes{
        margin-top: 10px;
        color: #fff;
    }
    #burgerTableHeading,
    #burgerTableRows,
    .burgerTableRow{
        display: flex;
        flex-wrap: wrap;
    }
    .card {
    padding: 1em;
    margin: .5em;
    width: 250px;
    text-align: center;
    border-radius: 20px;
    border: solid 0px #0000000d;
    box-shadow: 0px 0px 10px -2px #0000003b;
    }
    .card p{
        margin-bottom: 10px;
    }
    .cardsContainer {
    display: flex;
    flex-wrap: wrap;
    }
    .complementosTitle{
        font-weight: bold;
        margin-bottom: 5px;
    }
    .hamburgerBox{
        width: 100%;
    }
    .hamburgerH, 
    .hamburgerContainer
    {
    width: 35%;
    }
    .hamburgerContainer{
        padding-right: .5em;
    }
    .complementosH,  
    .complementosContainer{
    width: 25%;
    padding-left: .5em;
    }
    .clientH, .clientData{
        width: 16%;
    }
    .hamburgerContainer{
        display: flex;
        justify-content: space-between;
        word-break: break-all;
    }
    #burgerTableHeading{
        font-weight: bold;
        padding: 1em;
        border-bottom: 2px solid #333;
    }
    .pontoC{
        display: block;
        font-size: 16px;
        margin-top: 2px;
    }
    .burgerTableRow{
        width: 100%;
        padding: 1em;
        border-bottom: 1px solid #ccc;
    }
    #burgerTableHeading .orderId,
    .burgerTableRow .orderNumber{
        width: 2%;
    }
    .acoes, .acoesH{
        width: 22%;
    }
    select{
        padding: .5em;
        margin-right: .5em;
    }
    .deleteBtn{
        background-color: #dd5454;
        color: #fff;
        font-weight: bold;
        border: 2px solid #dd5454;
        border-radius: 10px;
        padding: .2em .3em;
        font-size: 16px;
        margin: 0 auto;
        cursor: pointer;
        transition: .5s;
        margin: 0px;
    }
    .deleteBtn:hover{
        background-color:rgb(241, 129, 129);
        color: #fff;
    }
    .infoCliente a{
        text-decoration: none;
        color: #FEB610;
    }
    #pills-tab {
  justify-content: center;
}
</style>