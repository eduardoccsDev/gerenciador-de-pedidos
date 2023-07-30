<template>
    <Message :msg="msg" :tipo="tipo" v-show="msg" />
    <div v-for="combo in combosN" :key="combo.idcombo" class="editContainer">
        <div class="comboFormContainer">
            <div class="descriptionContainer">
                <p>Nosso maravilhoso combo <span>{{ combo.nomeCombo }}</span> vem com nosso delicioso blend de <span>{{
                    combo.carneCombo }}
                        - 200g</span> com nosso molho de <span>{{ combo.molhoCombo }}</span> e esta recheado com <span>{{
                            combo.opcionaisCombo }}</span> e
                    <span>{{ combo.paoCombo }}</span> + um acompanhamento de sua escolha e uma bebida.
                </p>
            </div>
            <form id="comboForm" @submit.prevent="criarPedido(combo)">
                <div class="rowForm">
                    <div class="inputContainer">
                        <label for="acompanhamentos" id="acompanhamentoTitle">
                            <i class="fa-solid fa-bowl-food"></i>
                            Acompanhamento:
                            <span>*</span>
                        </label>
                        <select id="acompanhamento" name="acompanhamento" required v-model="acompanhamento">
                            <option value="" selected disabled>Selecione o acompanhamento</option>
                            <option v-for="acompanhamento in itemList(combo.acompanhamentoCombo)" :key="acompanhamento"
                                :value="acompanhamento">
                                {{ acompanhamento }}
                            </option>
                        </select>
                    </div>
                    <div class="inputContainer">
                        <label for="bebida" id="bebidaTitle">
                            <i class="fa-solid fa-beer-mug-empty"></i>
                            Bebidas:
                            <span>*</span>
                        </label>
                        <select id="acompanhamento" name="acompanhamento" required v-model="bebida">
                            <option value="" selected disabled>Selecione a bebida</option>
                            <option v-for="bebida in itemList(combo.bebidaCombo)" :key="bebida" :value="bebida">
                                {{ bebida }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="rowForm">
                    <div class="inputContainer">
                        <label for="nomeCliente" id="nomeClienteTitle">
                            <i class="fa-solid fa-user"></i>
                            Seu nome:
                            <span>*</span>
                        </label>
                        <input required id="nomeCliente" type="text" v-model="nomeCliente" placeholder="Digite seu nome">
                    </div>
                    <div class="inputContainer">
                        <label for="telefoneCliente" id="telefoneClienteTitle">
                            <i class="fa-brands fa-whatsapp"></i>
                            Seu whatsapp:
                            <span>*</span>
                        </label>
                        <input required type="text" id="telefoneCliente" v-model="telefoneCliente"
                            placeholder="Digite seu whatsapp">
                    </div>
                </div>
                <div class="rowForm">
                    <div class="inputContainer radioFlex">
                        <p>Opções de entrega</p>
                        <div class="radioContainer">
                            <input name="entrega" type="radio" id="Entrega" v-model="entrega">
                            <label for="Entrega">Delivery</label>
                        </div>
                        <div class="radioContainer">
                            <input name="entrega" type="radio" id="pegarPedido" v-model="entrega">
                            <label for="pegarPedido">Retirar no local</label>
                        </div>
                    </div>
                </div>
                <div class="rowForm">
                    <div class="inputContainer">
                        <label for="infoAdicional" id="infoAdicionalTitle">
                            <i class="fa-solid fa-info"></i>
                            Informação adicional:
                        </label>
                        <textarea id="infoAdicional" v-model="infoAdicional"
                            placeholder="Deixei alguma informação adicional" />
                    </div>
                </div>
                <div class="btnContainer">
                    <div class="precoCombo">
                        <p>
                            <i class="fa-solid fa-brazilian-real-sign"></i>
                            {{ formattedValue(combo.valorCombo) }}
                        </p>
                    </div>
                    <button type="submit" class="submitBtn">
                        <i class="fa-solid fa-burger"></i>
                        Realizar pedido
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Message from './Message.vue';
import { VueInputMask } from 'vue-inputmask';
const dataAtual = new Date();
const horario = dataAtual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
export default {
    name: 'editComboForm',
    components: {
        Message,
        VueInputMask
    },
    data() {
        return {
            comboId: null,
            acompanhamento: '',
            bebida: '',
            combosN: [],
            nomeCliente: '',
            telefoneCliente: '',
            infoAdicional: '',
            entrega: '',
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
        itemList(itemComboList) {
            return itemComboList.split(",");
        },
        async criarPedido(comboInfo) {
            try {
                const baseUrl = 'http://localhost:8800';
                const comboData = {
                    nomeCliente: this.nomeCliente,
                    telefoneCliente: this.telefoneCliente,
                    horaPedido: horario,
                    // nomeCombo: combo.nomeCombo,
                    // valorCombo: combo.valorCombo,
                    carne: comboInfo.carneCombo,
                    molhos: comboInfo.molhoCombo,
                    pao: comboInfo.paoCombo,
                    pontoCarne: 'Ao ponto',
                    opcionais: comboInfo.opcionaisCombo,
                    bebidas: this.bebida,
                    acompanhamento: this.acompanhamento,
                };

                await axios.post(`${baseUrl}/burgers`, comboData);
                this.msg = 'Pedido realizado com sucesso!'
                this.tipo = "success"
                setTimeout(() => this.msg = "", 3000);
                console.log('Pedido criado com sucesso!');
            } catch (error) {
                console.log('Erro ao criar o pedido: ', error);
                this.msg = 'Erro ao criar o pedido!'
                this.tipo = "alert"
                setTimeout(() => this.msg = "", 3000);
            }
        }
    },
    mounted() {
        this.comboId = this.$route.params.id;
        const baseUrl = 'http://localhost:8800';
        this.getDados(`${baseUrl}/combos/${this.comboId}`, 'combosN')
            .then(() => {
                // Certifique-se de que cada combo tenha um array vazio caso não tenha opcionais ou acompanhamentos
                this.combosN.forEach(combo => {
                    combo.opcionais = combo.opcionaisCombo ? this.itemList(combo.opcionaisCombo) : [];
                    combo.bebidas = combo.bebidaCombo ? this.itemList(combo.bebidaCombo) : [];
                    combo.acompanhamentos = combo.acompanhamentoCombo ? this.itemList(combo.acompanhamentoCombo) : [];
                });

                // Após garantir que os arrays opcionais e acompanhamentos estão definidos corretamente,
                // carregue os dados dos demais itens

            })
            .catch(error => {
                console.log('Erro ao obter os dados:', error);
            });
    },
    computed: {
        acompanhamentosArray() {
            if (!this.combo || !this.combo.acompanhamentoCombo) {
                return [];
            }
            return this.combo.acompanhamentoCombo.split(',');
        },
        formattedValue() {
            return (value) => {
                return `${value.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })},00`;
            };
        },
    },
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

    .descriptionContainer {
        background-color: #fff;
        padding: .5em;
        border-radius: 5px;
        margin-bottom: 2em;

        p {
            margin-block: .5em;

            span {
                font-weight: 600;
                color: var(--primary);
            }
        }
    }

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

        textarea {
            height: 150px;
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
            padding: .3em .5em;

            &:hover {
                background-color: var(--light);
            }

            i {
                margin-right: .5em;
            }
        }

        .precoCombo {
            p {
                background-color: var(--dark);
                color: #fff;
                padding: .5em;
                font-size: 20px;
                font-weight: 600;
                border-radius: 5px;
                margin: 0 auto;
                margin-block: 1em;
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
    .radioFlex{
        display: flex;
        flex-direction: row;

        .radioContainer{
            margin-right: 1em;

            input{
                margin-right: .5em;
            }
        }
    }
}
</style>