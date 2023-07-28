<template>
    <Message :msg="msg" :tipo="tipo" v-show="msg" />
    <div class="comboFormContainer">
        <form id="comboForm" @submit.prevent="enviarDados">
            <div class="rowForm">
                <div class="inputContainer">
                    <label>
                        <i class="fa-solid fa-pen"></i>
                        Nome do combo:
                        <span>*</span>
                    </label>
                    <input type="text" required name="nomeCombo" v-model="nomeCombo" placeholder="Nome do combo">
                </div>
                <div class="inputContainer">
                    <label>
                        <i class="fa-solid fa-brazilian-real-sign"></i>
                        Preço do combo:
                        <span>*</span>
                    </label>
                    <input type="number" required name="valorCombo" v-model="valorCombo" placeholder="Preço do combo">
                </div>
                <div class="inputContainer">
                    <label>
                        <i class="fa-solid fa-burger"></i>
                        Escolha a carne do combo:
                        <span>*</span>
                    </label>
                    <select id="carne" name="carne" required v-model="carne">
                        <option value="" selected disabled>Selecione o tipo de carne</option>
                        <option v-for="carne in carnesN" :key="carne.idcarne" :value="carne.nomeCarne">
                            {{ carne.nomeCarne }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="rowForm">
                <div class="inputContainer">
                    <label>
                        <i class="fa-solid fa-droplet"></i>
                        Escolha o molho do combo:
                        <span>*</span>
                    </label>
                    <select id="molho" name="molho" required v-model="molho">
                        <option value="" selected disabled>Selecione o molho</option>
                        <option v-for="molho in molhosN" :key="molho.idmolho" :value="molho.nomeMolho">
                            {{ molho.nomeMolho }}
                        </option>
                    </select>
                </div>
                <div class="inputContainer">
                    <label>
                        <i class="fa-solid fa-bread-slice"></i>
                        Escolha o pão do combo:
                        <span>*</span>
                    </label>
                    <select id="pao" name="pao" required v-model="pao">
                        <option value="" selected disabled>Selecione o pão</option>
                        <option v-for="pao in paesN" :key="pao.idpao" :value="pao.nomePao">
                            {{ pao.nomePao }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="rowForm">
                <div class="inputContainer">
                    <label for="opcionais" id="opcionaisTtitle"><i class="fa-solid fa-plus"></i> Opcionais do combo:</label>
                    <div class="opcionaisContainer">
                        <div class="checkBoxContainer" v-for="opcional in opcionaisN" :key="opcional.idopcional">
                            <input type="checkbox" :id="opcional.nomeOpcional" name="opcionais" v-model="opcionais"
                                :value="opcional.nomeOpcional">
                            <label class="optionL" :for="opcional.nomeOpcional">{{ opcional.nomeOpcional }}</label>
                        </div>
                    </div>
                </div>
                <div class="inputContainer">
                    <label for="acompanhamentos" id="acompanhamentoTitle"><i class="fa-solid fa-bowl-food"></i>
                        Acompanhamentos do combo:</label>
                    <div class="opcionaisContainer  listModel">
                        <div class="checkBoxContainer" v-for="acompanhamento in acompanhamentosN"
                            :key="acompanhamento.idacompanhamento">
                            <input type="checkbox" :id="acompanhamento.nomeAcompanhamento" name="acompanhamentos"
                                v-model="acompanhamentos" :value="acompanhamento.nomeAcompanhamento + ' - ' + acompanhamento.qtdAcompanhamento">
                            <label class="optionL" :for="acompanhamento.nomeAcompanhamento">{{
                                acompanhamento.nomeAcompanhamento }} - {{ acompanhamento.qtdAcompanhamento }}</label>
                        </div>
                    </div>
                </div>
                <div class="inputContainer">
                    <label for="bebida" id="bebidaTitle"><i class="fa-solid fa-beer-mug-empty"></i> bebidas do
                        combo:</label>
                    <div class="opcionaisContainer">
                        <div class="checkBoxContainer" v-for="bebida in bebidasN" :key="bebida.idbebida">
                            <input type="checkbox" :id="bebida.idbebida" name="bebida" v-model="bebidas"
                                :value="bebida.nomeBebida + ' - ' + bebida.qtdBebida">
                            <label class="optionL" :for="bebida.idbebida">{{ bebida.nomeBebida }} -
                                {{ bebida.qtdBebida }}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btnContainer">
                <button type="submit" class="submitBtn"><i class="fa-solid fa-plus"></i>Criar combo</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Message from './Message.vue';
export default {
    name: 'CombosForm',
    components:{
        Message
    },
    data() {
        return {
            carnesN: [],
            molhosN: [],
            paesN: [],
            opcionaisN: [],
            acompanhamentosN: [],
            bebidasN: [],
            nomeCombo: '',
            valorCombo: '',
            carne: '',
            molho: '',
            pao: '',
            opcionais: [],
            bebidas: [],
            acompanhamentos: [],
            msg: null,
            tipo: null
        }
    },
    methods: {
        async getDados(url, propriedade) {
            try {
                const response = await axios.get(url);
                this[propriedade] = response.data;
            } catch (error) {
                console.log('Erro ao obter os dados:', error);
            }
        },
        enviarDados() {
            const dados = {
                nomeCombo: this.nomeCombo,
                valorCombo: this.valorCombo,
                carneCombo:this.carne,
                molhoCombo:this.molho,
                paoCombo:this.pao,
                bebidaCombo:this.bebidas.join(','),
                opcionaisCombo: this.opcionais.join(','),
                acompanhamentoCombo: this.acompanhamentos.join(',')
            };
            // requisição POST
            axios.post('http://localhost:8800/combos', dados)
                .then(response => {
                    this.msg = 'Combo criado com sucesso'
                    this.tipo = 'success'
                    setTimeout(() => this.msg = "", 3000);
                    //limpar campos
                    this.nomeCombo = "";
                    this.valorCombo = "";
                    this.carne = "";
                    this.molho = "";
                    this.pao = "";
                    this.bebidas = [];
                    this.opcionais = [];
                    this.acompanhamentos = [];
                })
                .catch(error => {
                    console.log('Erro ao enviar os dados:', error);
                })
        }
    },
    mounted() {
        const baseUrl = 'http://localhost:8800';
        this.getDados(`${baseUrl}/carnes`, 'carnesN');
        this.getDados(`${baseUrl}/molhos`, 'molhosN');
        this.getDados(`${baseUrl}/paes`, 'paesN');
        this.getDados(`${baseUrl}/opcionais`, 'opcionaisN');
        this.getDados(`${baseUrl}/bebidas`, 'bebidasN');
        this.getDados(`${baseUrl}/acompanhamentos`, 'acompanhamentosN');
    }
}
</script>

<style lang="scss" scoped>
.rowForm {
    display: flex;
    justify-content: space-between;
}

.comboFormContainer {
    background-color: #E9E9E9;
    padding: 1em;
    border-radius: 20px;
    margin-bottom: 2em;

    .inputContainer {
        display: flex;
        flex-direction: column;
        margin: .5em;
        width: 100%;

        label {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: .5em;

            i {
                background-color: var(--primary);
                color: var(--dark);
                padding: 0.2em;
                border-radius: 5px;
                margin-right: 0.5em;
                width: 25px;
                text-align: center;
            }

            span {
                color: rgb(238, 118, 118);
            }
        }

        input,
        select {
            border-radius: 5px;
            border: none;
            padding: .5em;
            color: var(--dark);
            background-color: #fff;
        }
    }

    .btnContainer {
        display: block;
        margin: 0 auto;
        text-align: center;
        margin-block: .5em;

        button {
            background-color: var(--primary);
            color: var(--dark);
            border-radius: 5px;
            transition: .5s;
            padding: .3em;

            &:hover {
                background-color: var(--light);
            }

            i {
                margin-right: .5em;
            }
        }

    }

    .opcionaisContainer {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #fff;
        padding: .5em;
        border-radius: 5px;
        min-height: 200px;
        max-height: 200px;
        overflow-y: scroll;

        .checkBoxContainer {
            margin-right: 1em;

            input {
                margin-right: .5em;
            }
        }
    }

}
</style>