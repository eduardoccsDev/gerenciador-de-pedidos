<template>
    <Message :msg="msg" :tipo="tipo" v-show="msg" />
    <div v-for="combo in combosN" :key="combo.idcombo" class="editContainer">
        <div class="comboFormContainer">
            <p>nome: {{ combo.nomeCombo }}</p>
            <p>preço: {{ combo.valorCombo }}</p>
            <p>carne: {{ combo.carneCombo }}</p>
            <p>molho: {{ combo.molhoCombo }}</p>
            <p>pão: {{ combo.paoCombo }}</p>
            <p>descrição : Nosso maravilhoso combo {{ combo.nomeCombo }} vem com nosso delicioso blend de {{
                combo.carneCombo }}
                - 200g com nosso molho {{combo.molhoCombo}} e esta recheado com {{ combo.opcionaisCombo }} + um acompanhamento de sua escolha e uma bebida. </p>
            <form id="comboForm" @submit.prevent="() => submitForm(combo)">
                <div class="rowForm">
                    <div class="inputContainer">
                        <label for="acompanhamentos" id="acompanhamentoTitle"><i class="fa-solid fa-bowl-food"></i>
                            Acompanhamento:</label>
                        <div class="inputContainer">
                            <select id="acompanhamento" name="acompanhamento" required v-model="acompanhamento">
                                <option value="" selected disabled>Selecione o acompanhamento</option>
                                <option v-for="acompanhamento in itemList(combo.acompanhamentoCombo)" :key="acompanhamento"
                                    :value="acompanhamento">
                                    {{ acompanhamento }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="inputContainer">
                        <label for="bebida" id="bebidaTitle"><i class="fa-solid fa-beer-mug-empty"></i> Bebidas:</label>
                        <div class="inputContainer">
                            <select id="acompanhamento" name="acompanhamento" required v-model="bebida">
                                <option value="" selected disabled>Selecione a bebida</option>
                                <option v-for="bebida in itemList(combo.bebidaCombo)" :key="bebida" :value="bebida">
                                    {{ bebida }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="btnContainer">
                    <button type="submit" class="submitBtn"><i class="fa-regular fa-floppy-disk"></i>Realizar pedido</button>
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
            acompanhamento: '',
            bebida: '',
            combosN: [],
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
        }
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