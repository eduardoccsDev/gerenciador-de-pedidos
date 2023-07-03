<template>
  <div>
    <Message :msg="msg" v-show="msg"/>
    <div>
        <form id="burgerForm" @submit="createBurger">
            <div class="row">
                <div class="inputContainer col">
                    <label for="nome"><i class="fa-solid fa-user"></i> Seu nome:</label>
                    <input type="text" id="nome" name="nome" required v-model="nome" placeholder="Digite o seu nome">
                </div>
                <div class="inputContainer col">
                    <label for="telefone"><i class="fa-brands fa-whatsapp"></i> Seu whatapp:</label>
                    <input type="text" id="telefone" required name="telefone" v-model="telefone" placeholder="Digite o seu telefone">
                </div>
            </div>
            <div class="inputContainer">
                <label for="pao"><i class="fa-solid fa-bread-slice"></i> Escolha o pão:</label>
                <select id="pao" name="pao" v-model="pao">
                    <option selected>Selecione o seu pão</option>
                    <option 
                    v-for="pao in paes" 
                    :key="pao.id" 
                    :value="pao.tipo">
                        {{ pao.tipo }}
                    </option>
                </select>
            </div>
            <div class="inputContainer">
                <label for="carne"><i class="fa-solid fa-burger"></i> Escolha a carne do seu bunger:</label>
                <select id="carne" name="carne" required v-model="carne">
                    <option selected>Selecione o tipo de carne</option>
                    <option 
                    v-for="carne in carnes" 
                    :key="carne.tipo" 
                    :value="carne.tipo">
                        {{ carne.tipo }}
                    </option>
                </select>
            </div>
            <div id="opcionaisContainer" class="inputContainer">
                <label for="pontoCarne" id="pontoCarneTitle"><i class="fa-solid fa-fire"></i> Selecione o ponto da carne:</label>
                <div class="checkBoxContainer" v-for="pontocarne in pontocarnedata" :key="pontocarne.id">
                    <input type="radio"  name="pontocarne" v-model="pontocarnes" :value="pontocarne.tipo">
                    <span>{{ pontocarne.tipo }}</span>
                </div>
            </div>
            <div id="opcionaisContainer" class="inputContainer">
                <label for="opcionais" id="opcionaisTtitle"><i class="fa-solid fa-plus"></i> Selecione os opcionais:</label>
                <div class="checkBoxContainer radio" v-for="opcional in opcionaisdata" :key="opcional.id">
                    <input type="checkbox"  name="opcionais" v-model="opcionais" :value="opcional.tipo">
                    <span>{{ opcional.tipo }}</span>
                </div>
            </div>
            <div class="inputContainer">
                <button type="submit" class="submitBtn"><i class="fa-solid fa-share"></i> Realizar pedido</button>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'
export default {
    name:'BurgerForm',
    components:{
        Message
    },
    data(){
        return{
            paes: null,
            carnes: null,
            opcionaisdata: null,
            pontocarnedata: null,
            nome: null,
            telefone: null,
            pao: null,
            carne: null,
            opcionais: [],
            pontocarnes: [],
            msg: null
        }
    },
    methods:{
        async getIngredientes(){
           const req = await fetch("http://localhost:3000/ingredientes"); 
           const data  = await req.json();

           this.paes = data.paes;
           this.carnes = data.carnes;
           this.opcionaisdata = data.opcionais;
           this.pontocarnedata = data.pontocarnes;
        },
        async createBurger(e){
            e.preventDefault();
            const data={
                nome: this.nome,
                telefone: this.telefone,
                carne: this.carne,
                pao: this.pao,
                opcionais: Array.from(this.opcionais),
                pontocarnes: this.pontocarnes,
                status: "Solicitado"
            }
            const dataJson = JSON.stringify(data);
            const req = await fetch("http://localhost:3000/burgers",{
                method: "POST",
                headers:{"Content-Type": "application/json"},
                body: dataJson
            });

            const res = await req.json();
            // Colocar mensagem do sistema
            this.msg = `Pedido Nº ${res.id} realizado com sucesso`

            //limpar mensagem
            setTimeout(()=> this.msg = "", 3000);

            //Limpar campos após envio
            this.nome="";
            this.telefone="";
            this.carne="";
            this.pao="";
            this.opcionais="";
            this.pontocarnes="";

        }
    },
    mounted(){
       this.getIngredientes() 
    }
}
</script>

<style scoped>
    #burgerForm{
        max-width: 400px;
        margin: 0 auto;
    }
    .inputContainer{
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }
    label{
        font-weight: bold;
        margin-bottom: 18px;
        color: #222;
        padding: .5em .5em;
        width: 100%;
    }
    input[type=text], select{
        padding: .5em 1em;
        width: 100%;
        border-radius: 10px;
        border: 1px solid #0000002d;
        height: 35px;
        background-color: #fff;
        box-shadow: 0px 5px 3px -3px #0000003d;
    }
    input[type=text]:focus, select:focus{
        border: 1px solid #FEB711;
        outline: none;
    }
    i{
        background-color: #ffb711;
        padding: .3em 6px;
        border-radius: 100%;
    }
    .fa-share{
        color: #222;
    }
    #opcionaisContainer{
        flex-direction: row;
        flex-wrap: wrap;
    }
    #opcionaiustitle{
        width: 100%;
    }
    .checkBoxContainer{
        display: flex;
        align-items: flex-start;
        width: 50%;
        margin-bottom: 20px;
    }
    .checkBoxContainer span,
    .checkBoxContainer input{
        width: auto;
    }
    .checkBoxContainer span{
        margin-left: 6px;
        font-weight: bold;
        margin-top: -5px;
    }
    .submitBtn{
        background-color: #222;
        color: #FEB711;
        font-weight: bold;
        border: 2px solid #222;
        padding: 10px;
        font-size: 16px;
        margin: 0 auto;
        cursor: pointer;
        transition: .5s;
        border-radius: 10px;
    }
    .submitBtn:hover{
        background-color: transparent;
        color: #222;
    }
</style>