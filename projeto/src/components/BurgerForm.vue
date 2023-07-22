<template>
  <div id="fetchAllForm">
    <Message :msg="msg" :tipo="tipo" v-show="msg"/>
    <div> 
        <form id="burgerForm" @submit.prevent="enviarDados">
            <div class="row">
                <div class="inputContainer col">
                    <label for="nome"><i class="fa-solid fa-user"></i> Seu nome<span class="obrigatorio">*</span>:</label>
                    <input type="text" id="nome" name="nome" required v-model="nome" placeholder="Digite o seu nome">
                </div>
                <div class="inputContainer col">
                    <label for="telefone"><i class="fa-brands fa-whatsapp"></i> Seu whatapp<span class="obrigatorio">*</span>:</label>
                    <input type="text" id="telefone" required name="telefone" v-model="telefone" placeholder="Digite o seu telefone">
                </div>
            </div>
            <div class="inputContainer">
                <label for="pao"><i class="fa-solid fa-bread-slice"></i> Escolha o pão<span class="obrigatorio">*</span>:</label>
                <select id="pao" name="pao" v-model="pao">
                    <option value="" selected disabled>Selecione o seu pão</option>
                    <option 
                    v-for="pao in paesN" 
                    :key="pao.idpao" 
                    :value="pao.nomePao">
                        {{ pao.nomePao }}
                    </option>
                </select>
            </div>
            <div class="inputContainer">
                <label for="carne"><i class="fa-solid fa-burger"></i> Escolha a carne do seu bunger<span class="obrigatorio">*</span>:</label>
                <select id="carne" name="carne" required v-model="carne">
                    <option value="" selected disabled>Selecione o tipo de carne</option>
                    <option 
                    v-for="carne in carnesN" 
                    :key="carne.idcarne" 
                    :value="carne.nomeCarne">
                        {{ carne.nomeCarne }}
                    </option>
                </select>
            </div>
            <label for="pontoCarne" id="pontoCarneTitle"><i class="fa-solid fa-fire"></i> Selecione o ponto da carne<span class="obrigatorio">*</span>:</label>
            <div class="opcionaisContainer inputContainer">
                <div class="checkBoxContainer" v-for="pontocarne in pontocarneN" :key="pontocarne.idpontocarne">
                    <input type="radio" :id="pontocarne.nomePontoCarne" name="pontocarne" v-model="pontocarnes" :value="pontocarne.nomePontoCarne">
                    <label class="optionL" :for="pontocarne.nomePontoCarne">{{ pontocarne.nomePontoCarne }}</label>
                </div>
            </div>
            <label for="opcionais" id="opcionaisTtitle"><i class="fa-solid fa-plus"></i> Selecione os opcionais:</label>
            <div class="opcionaisContainer inputContainer">
                <div class="checkBoxContainer" v-for="opcional in opcionaisN" :key="opcional.idopcional">
                    <input type="checkbox" :id="opcional.nomeOpcional" name="opcionais" v-model="opcionais" :value="opcional.nomeOpcional">
                    <label class="optionL" :for="opcional.nomeOpcional">{{ opcional.nomeOpcional }}</label>
                </div>
            </div>
            <label for="molhos" id="molhosTitle"><i class="fa-solid fa-droplet"></i> Selecione os molhos<span> (dentro do burger)</span>:</label>
            <div class="opcionaisContainer inputContainer">
                <div class="checkBoxContainer" v-for="molho in molhosN" :key="molho.idmolho">
                    <input type="checkbox" :id="molho.nomeMolho" name="molhos" v-model="molhos" :value="molho.nomeMolho">
                    <label class="optionL" :for="molho.nomeMolho">{{ molho.nomeMolho }}</label>
                </div>
            </div>
            <label for="acompanhamentos" id="acompanhamentoTitle"><i class="fa-solid fa-bowl-food"></i> Selecione os acompanhamentos:</label>
            <div class="opcionaisContainer inputContainer listModel">
                <div class="checkBoxContainer" v-for="acompanhamento in acompanhamentosN" :key="acompanhamento.idacompanhamento">
                    <input type="checkbox" :id="acompanhamento.nomeAcompanhamento" name="acompanhamentos" v-model="acompanhamentos" :value="acompanhamento.nomeAcompanhamento">
                    <label class="optionL" :for="acompanhamento.nomeAcompanhamento">{{ acompanhamento.nomeAcompanhamento }} - {{acompanhamento.qtdAcompanhamento}}</label>
                </div>
            </div>
            <label for="bebida" id="bebidaTitle"><i class="fa-solid fa-beer-mug-empty"></i> Selecione a bebida:</label>
            <div class="opcionaisContainer inputContainer listModel">
                <div class="checkBoxContainer" v-for="bebida in bebidasN" :key="bebida.idbebida">
                    <input type="radio" :id="bebida.idbebida" name="bebida" v-model="bebidas" :value="bebida.nomeBebida">
                    <label class="optionL" :for="bebida.idbebida">{{ bebida.nomeBebida }} - {{bebida.qtdBebida}}</label>
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
import Message from './Message.vue';
import axios from 'axios';
const dataAtual = new Date();
const horario = dataAtual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
export default {
    name:'BurgerForm',
    components:{
        Message
    },
    data(){
        return{
            nome: null,
            telefone: null,
            pao: '',
            carne: '',
            opcionais: [],
            pontocarnes: [],
            molhos:[],
            bebidas:[],
            acompanhamentos:[],
            carnesN:[],
            paesN:[],
            pontocarneN:[],
            opcionaisN:[],
            molhosN:[],
            acompanhamentosN:[],
            bebidasN:[],
            msg: null,
            tipo: null
        }
    },
    methods:{
        async getDados(url, propriedade) {
            try {
                const response = await axios.get(url);
                this[propriedade] = response.data;
            } catch (error) {
                console.log('Erro ao obter os dados:', error);
            }
        },
        enviarDados(){
            const dados = {
                horaPedido: horario,
                nomeCliente: this.nome,
                telefoneCliente: this.telefone,
                carne: this.carne,
                pontoCarne: this.pontocarnes,
                pao: this.pao,
                opcionais: this.opcionais.join(','),
                molhos: this.molhos.join(','),
                acompanhamento: this.acompanhamentos.join(','),
                bebidas: this.bebidas

            };
            // requisição POST
            axios.post('http://localhost:8800/burgers', dados)
            .then(response => {
                this.msg = 'Pedido realizado com sucesso'
                this.tipo = 'success'
                setTimeout(()=> this.msg = "", 3000);
                //limpar campos
                this.nome="";
                this.telefone="";
                this.carne="";
                this.pontocarnes="";
                this.pao="";
                this.opcionais=[];
                this.molhos=[];
                this.acompanhamentos=[];
                this.bebidas=[];
            })
            .catch(error => {
                console.log('Erro ao enviar os dados:', error);
            })
        }
        
    },
    mounted(){
        const baseUrl = 'http://localhost:8800';
        this.getDados(`${baseUrl}/carnes`, 'carnesN');
        this.getDados(`${baseUrl}/pontocarne`, 'pontocarneN');
        this.getDados(`${baseUrl}/paes`, 'paesN');
        this.getDados(`${baseUrl}/opcionais`, 'opcionaisN');
        this.getDados(`${baseUrl}/molhos`, 'molhosN');
        this.getDados(`${baseUrl}/acompanhamentos`, 'acompanhamentosN');
        this.getDados(`${baseUrl}/bebidas`, 'bebidasN');

    }
}
</script>

<style scoped>
    #burgerForm{
        max-width: 450px;
        margin: 0 auto;
        padding: 1em;
        border: solid 2px #0000000d;
        border-radius: 20px;
        box-shadow: 3px 3px 3px 1px #0000004d;
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
    .obrigatorio {
    color: #ec5656;
    }
    .opcionaisContainer.inputContainer.listModel{
        display: block;
    }
    .opcionaisContainer.inputContainer.listModel .checkBoxContainer{
        width: 100%;
    }
    .optionL{
        width: auto;
        margin-top: -5px;
        margin-bottom: 0px;
        padding: 0px 5px;
        font-weight: 500;
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
    .opcionaisContainer{
        flex-direction: row;
        flex-wrap: wrap;
        overflow-y: scroll;
        max-height: 117px;
        background-color: rgb(248, 248, 248);
        padding: 1em;
        border-radius: 10px;
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