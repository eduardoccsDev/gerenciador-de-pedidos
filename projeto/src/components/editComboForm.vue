<template>
    <Message :msg="msg" :tipo="tipo" v-show="msg" />
    <div v-for="combo in combosN" :key="combo.idcombo" class="editContainer">
        <div class="comboFormContainer">
            <form id="comboForm" @submit.prevent="() => submitForm(combo)">
                <div class="rowForm">
                    <div class="inputContainer">
                        <label>
                            <i class="fa-solid fa-pen"></i>
                            Nome do combo:
                            <span>*</span>
                        </label>
                        <input type="text" required name="nomeCombo" v-model="combo.nomeCombo" placeholder="Nome do combo">
                    </div>
                    <div class="inputContainer">
                        <label>
                            <i class="fa-solid fa-brazilian-real-sign"></i>
                            Preço do combo:
                            <span>*</span>
                        </label>
                        <input type="number" required name="valorCombo" v-model="combo.valorCombo"
                            placeholder="Preço do combo">
                    </div>
                    <div class="inputContainer">
                        <label>
                            <i class="fa-solid fa-burger"></i>
                            Escolha a carne do combo:
                            <span>*</span>
                        </label>
                        <select id="carne" name="carne" required v-model="combo.carneCombo">
                            <option value="" disabled>Selecione o tipo de carne</option>
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
                        <select id="molho" name="molho" required v-model="combo.molhoCombo">
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
                        <select id="pao" name="pao" required v-model="combo.paoCombo">
                            <option value="" selected disabled>Selecione o pão</option>
                            <option v-for="pao in paesN" :key="pao.idpao" :value="pao.nomePao">
                                {{ pao.nomePao }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="rowForm">
                    <div class="inputContainer">
                        <label for="opcionais" id="opcionaisTtitle"><i class="fa-solid fa-plus"></i> Opcionais do
                            combo:</label>
                        <div class="opcionaisContainer">
                            <div class="checkBoxContainer" v-for="opcional in opcionaisN" :key="opcional.idopcional">
                                <input type="checkbox" :id="opcional.nomeOpcional" name="opcionais"
                                    v-model="combo.opcionais" :checked="combo.opcionais.includes(opcional.nomeOpcional)"
                                    :value="opcional.nomeOpcional">
                                <label class="optionL" :for="opcional.nomeOpcional">{{ opcional.nomeOpcional
                                }}</label>
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
                                    v-model="combo.acompanhamentos" :value="acompanhamento.nomeAcompanhamento + ' - ' + acompanhamento.qtdAcompanhamento"
                                    :checked="combo.acompanhamentos.includes(acompanhamento.nomeAcompanhamento)">
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
                                <input type="checkbox" :id="bebida.idbebida" name="bebida" v-model="combo.bebidas"
                                    :value="bebida.nomeBebida + ' - ' + bebida.qtdBebida" :checked="combo.bebidas.includes(bebida.nomeBebida)">
                                <label class="optionL" :for="bebida.idbebida">{{ bebida.nomeBebida }} -
                                    {{ bebida.qtdBebida }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btnContainer">
                    <button type="submit" class="submitBtn"><i class="fa-regular fa-floppy-disk"></i>Atualizar
                        combo</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Message from './Message.vue';
export default {
    name: 'editComboForm',
    components: {
        Message
    },
    data() {
        return {
            comboId: null,
            combosN: [],
            carnesN: [],
            molhosN: [],
            paesN: [],
            opcionaisN: [],
            acompanhamentosN: [],
            bebidasN: [],
           
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
        submitForm(combo) {
            this.atualizarDados(combo);
        },
        async atualizarDados(combo) {
            try {
                const baseUrl = 'http://localhost:8800';
                const comboData = {
                    nomeCombo: combo.nomeCombo,
                    valorCombo: combo.valorCombo,
                    carneCombo: combo.carneCombo,
                    molhoCombo: combo.molhoCombo,
                    paoCombo: combo.paoCombo,
                    opcionaisCombo: combo.opcionais.join(","),
                    bebidaCombo: combo.bebidas.join(","),
                    acompanhamentoCombo: combo.acompanhamentos.join(","),
                };

                await axios.put(`${baseUrl}/combos/${this.comboId}`, comboData);
                this.msg = 'Combo atualizado com sucesso!'
                this.tipo = "success"
                setTimeout(() => this.msg = "", 3000);
                console.log('Dados do combo atualizados com sucesso!');
            } catch (error) {
                console.log('Erro ao atualizar os dados do combo: ', error);
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
                this.getDados(`${baseUrl}/carnes`, 'carnesN');
                this.getDados(`${baseUrl}/molhos`, 'molhosN');
                this.getDados(`${baseUrl}/paes`, 'paesN');
                this.getDados(`${baseUrl}/opcionais`, 'opcionaisN');
                this.getDados(`${baseUrl}/bebidas`, 'bebidasN');
                this.getDados(`${baseUrl}/acompanhamentos`, 'acompanhamentosN');
            })
            .catch(error => {
                console.log('Erro ao obter os dados:', error);
            });
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