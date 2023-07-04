<template>
  <div id="burgerTable">
    <Message :msg="msg" v-show="msg"/>
    <div>
        <div id="burgerTableHeading">
            <div class="orderId">#:</div>
            <div>Cliente:</div>
            <div>Whatsapp:</div>
            <div>Pão:</div>
            <div>Carne:</div>
            <!-- <div class="pontoCarneH">Ponto/carne:</div> -->
            <div>Opcionais:</div>
            <div class="acoesH">Ações:</div>
        </div>
    </div>
    <div id="burgerTableRows">
        <div class="burgerTableRow" v-for="burger in burgers" :key="burger.id">
            <div class="orderNumber">{{burger.id}}</div>
            <div>{{burger.nome}}</div>
            <div><a :href="'https://api.whatsapp.com/send?phone='+burger.telefone" target="_blank">{{burger.telefone}}</a></div>
            <div>{{burger.pao}}</div>
            <div>{{burger.carne}}<span class="pontoC">({{burger.pontocarnes}})</span></div>
            <!-- <div class="pontoCarne">{{burger.pontocarnes}}</div> -->
            <div>
                <ul>
                    <li 
                    v-for='(opcional, index) in burger.opcionais' 
                    :key="index">
                        {{opcional}}
                    </li>
                </ul>
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
export default {
    name:'Dashboard',
    data(){
        return{
            burgers: null,
            burger_id: null,
            status: [],
            msg: null
        }
    },
    components:{
        Message
    },
    methods:{
        async getPedidos(){
            const req = await fetch('http://localhost:3000/burgers');
            const data = await req.json();
            this.burgers = data;
            //resgatar status
            this.getStatus();
        },
        async getStatus(){
            const req = await fetch('http://localhost:3000/status');
            const data = await req.json();
            this.status = data;
        },
        async deleteBurger(id){
            const req =  await fetch(`http://localhost:3000/burgers/${id}`,{
                method: 'DELETE'
            });

            const res = await req.json();

            // Colocar mensagem do sistema
            this.msg = 'Pedido removido com sucesso!'

            //limpar mensagem
            setTimeout(()=> this.msg = "", 3000);

            this.getPedidos();
        },
        async updateBurger(event, id){
            const option = event.target.value;
            const dataJason = JSON.stringify({status: option});
            const req = await fetch(`http://localhost:3000/burgers/${id}`,{
                method: "PATCH",
                headers:{'Content-Type': 'application/json'},
                body: dataJason
            });
            const res = await req.json();

            // Colocar mensagem do sistema
            this.msg = `O pedido Nº ${res.id} foi atualizado para ${res.status}!`

            //limpar mensagem
            setTimeout(()=> this.msg = "", 3000);


        }
    },
    mounted(){
        this.getPedidos();
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

    #burgerTableHeading{
        font-weight: bold;
        padding: 1em;
        border-bottom: 2px solid #333;
    }

    #burgerTableHeading div,
    .burgerTableRow div{
        width: 16%;
    }
    .pontoC{
        display: block;
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
        width: 17% !important;
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