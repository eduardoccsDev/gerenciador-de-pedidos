<template>
  <div id="burgerTable">
    <Message :msg="msg" v-show="msg"/>
    <div>
        <div id="burgerTableHeading">
            <div class="orderId">#:</div>
            <div class="clientH">Cliente:</div>
            <div class="hamburgerH">Hamburguer:</div>
            <div class="complementosH">Complementos:</div>
            <div class="acoesH">Ações:</div>
        </div>
    </div>
    <div id="burgerTableRows">
        <div class="burgerTableRow" v-for="burger in burgersN" :key="burger.idburger">
            <div class="orderNumber">{{burger.idburger}}</div>
            <div class="clientData">
                {{burger.nomeCliente}}
                <span>
                    <a :href="'https://api.whatsapp.com/send?phone='+burger.telefoneCliente" target="_blank">
                        {{burger.telefoneCliente}}
                    </a>
                </span>
            </div>
            <div class="hamburgerContainer">
                <div class="hamburgerBox">
                    <p class="complementosTitle">Pão:</p>
                    <p>{{burger.pao}}</p>
                    <p class="complementosTitle">Carne:</p>
                    <p>{{burger.carne}}<span class="pontoC">({{burger.pontoCarne}})</span></p>
                </div>
                <div class="hamburgerBox">
                    <p class="complementosTitle">Opcionais:</p>
                    <p>{{burger.opcionais}}</p>
                    <p class="complementosTitle">Molhos:</p>
                    <p>{{burger.molhos}}</p>
                </div>
            </div>
            <div class="complementosContainer">
                <p class="complementosTitle">Acompanhamentos:</p>
                <p>{{burger.acompanhamento}}</p>
                <p class="complementosTitle">Bebidas:</p>
                <p>{{burger.bebidas}}</p>
            </div>
            <div class="acoes">
                <select name="status" class="status" @change="updateBurger($event, burger.id)">
                    <option 
                    v-for="s in status" 
                    :key="s.id" 
                    :value="s.tipo" 
                    :selected="burger.status == s.tipo">
                        {{s.tipo}}
                    </option>
                </select>
                <button 
                class="btn deleteBtn" 
                title="Cancelar" 
                @click="deleteBurger(burger.id)">
                    <i class="fa-solid fa-ban"></i>
                </button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'
import axios from 'axios'
export default {
    name:'Dashboard',
    data(){
        return{
            burgers: null,
            burger_id: null,
            status: [],
            burgersN:[],
            msg: null
        }
    },
    components:{
        Message
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

        // async getStatus(){
        //     const req = await fetch('http://localhost:3000/status');
        //     const data = await req.json();
        //     this.status = data;
        // },
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
        // async updateBurger(event, id){
        //     const option = event.target.value;
        //     const dataJason = JSON.stringify({status: option});
        //     const req = await fetch(`http://localhost:3000/burgers/${id}`,{
        //         method: "PATCH",
        //         headers:{'Content-Type': 'application/json'},
        //         body: dataJason
        //     });
        //     const res = await req.json();

        //     // Colocar mensagem do sistema
        //     this.msg = `O pedido Nº ${res.id} foi atualizado para ${res.status}!`

        //     //limpar mensagem
        //     setTimeout(()=> this.msg = "", 3000);


        // }
    },
    mounted(){
       this.getDados('http://localhost:8800/burgers', 'burgersN');
    }
}
</script>

<style scoped>
    #burgerTable{
        max-width: 1200px;
        margin: 0 auto;
    }
    #burgerTableHeading,
    #burgerTableRows,
    .burgerTableRow{
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

    /* #burgerTableHeading div,
    .burgerTableRow div{
        width: 16%;
    } */
    .pontoC{
        display: block;
        font-size: 13px;
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
        color: #222;
        font-weight: bold;
        border: 2px solid #dd5454;
        border-radius: 100%;
        padding: .3em .5em;
        font-size: 16px;
        margin: 0 auto;
        cursor: pointer;
        transition: .5s;
    }
    .deleteBtn:hover{
        background-color:rgb(241, 129, 129);
        color: #222;
    }
    a{
        text-decoration: none;
        color: #3B753C;
    }
</style>