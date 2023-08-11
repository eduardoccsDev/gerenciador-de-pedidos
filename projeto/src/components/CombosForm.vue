<template>
    <Message :msg="msg" :tipo="tipo" v-show="msg" />
    <div class="comboFormContainer">
        <form id="comboForm" @submit.prevent="createCombo">
            <div class="rowForm">
                <div class="inputContainer">
                    <label>
                        <i class="fa-solid fa-pen"></i>
                        Nome do combo:
                        <span>*</span>
                    </label>
                    <input type="text" required name="nomeCombo" v-model="nameCombo" placeholder="Nome do combo">
                </div>
                <div class="inputContainer">
                    <label>
                        <i class="fa-solid fa-brazilian-real-sign"></i>
                        Preço do combo:
                        <span>*</span>
                    </label>
                    <input type="number" required name="valorCombo" v-model="priceCombo" placeholder="Preço do combo">
                </div>
                <div class="inputContainer">
                    <label>
                        <i class="fa-solid fa-burger"></i>
                        Escolha a carne do combo:
                        <span>*</span>
                    </label>
                    <select id="carne" name="carne" required v-model="hamburger_meat">
                        <option value="" selected disabled>Selecione o tipo de carne</option>
                        <option v-for="(item, index) in myData.nomeCarne" :key="index" :value="item">
                            {{ item }}
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
                    <select id="molho" name="molho" required v-model="sauce">
                        <option value="" selected disabled>Selecione o molho</option>
                        <option v-for="(item, index) in myData.nomeMolho" :key="index" :value="item">
                            {{ item }}
                        </option>
                    </select>
                </div>
                <div class="inputContainer">
                    <label>
                        <i class="fa-solid fa-bread-slice"></i>
                        Escolha o pão do combo:
                        <span>*</span>
                    </label>
                    <select id="pao" name="pao" required v-model="bread">
                        <option value="" selected disabled>Selecione o pão</option>
                        <option v-for="(item, index) in myData.nomePao" :key="index" :value="item">
                            {{ item }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="rowForm">
                <div class="inputContainer">
                    <label for="opcionais" id="opcionaisTtitle"><i class="fa-solid fa-plus"></i> Opcionais do combo:</label>
                    <div class="opcionaisContainer">
                        <div class="checkBoxContainer" v-for="(item, index) in myData.nomeOpcional" :key="index">
                            <input type="checkbox" :id="item" name="opcionais" v-model="optional" :value="item">
                            <label class="optionL" :for="item">{{ item }}</label>
                        </div>
                    </div>
                </div>
                <div class="inputContainer">
                    <label for="acompanhamentos" id="acompanhamentoTitle"><i class="fa-solid fa-bowl-food"></i>
                        Acompanhamentos do combo:</label>
                    <div class="opcionaisContainer  listModel">
                        <div class="checkBoxContainer" v-for="(item, index) in myData.nomeAcompanhamento" :key="index">
                            <input type="checkbox" :id="item.name" name="acompanhamentos" v-model="accompaniments"
                                :value="item.name + ' - ' + item.qtdItem">
                            <label class="optionL" :for="item.name">{{
                                item.name }} - {{ item.qtdItem }}</label>
                        </div>
                    </div>
                </div>
                <div class="inputContainer">
                    <label for="bebida" id="bebidaTitle"><i class="fa-solid fa-beer-mug-empty"></i> bebidas do
                        combo:</label>
                    <div class="opcionaisContainer">
                        <div class="checkBoxContainer" v-for="(item, index) in myData.nomeBebida" :key="index">
                            <input type="checkbox" :id="item.name" name="bebida" v-model="drinks"
                                :value="item.name + ' - ' + item.qtdItem">
                            <label class="optionL" :for="item.name">{{ item.name }} -
                                {{ item.qtdItem }}</label>
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

import Message from './Message.vue';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get, push } from 'firebase/database';
export default {
    name: 'CombosForm',
    components: {
        Message
    },
    data() {
        return {
            nameCombo: '',
            priceCombo: '',
            hamburger_meat: '',
            sauce: '',
            bread: '',
            optional: [],
            drinks: [],
            accompaniments: [],
            msg: null,
            tipo: null,
            myData: {}
        }
    },
    methods: {
        async getDados(ref, propriedade) {
            try {
                const snapshot = await get(ref);
                this[propriedade] = snapshot.val();
            } catch (error) {
                console.log('Erro ao obter os dados:', error);
            }
        },
        createCombo() {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user && user.uid) {
                const db = getDatabase();
                const availableCombosRef = ref(db, `stores/${user.uid}/availableCombos`);

                const comboData = {
                    nameCombo: this.nameCombo,
                    priceCombo: this.priceCombo,
                    hamburger_meat: this.hamburger_meat,
                    sauce: this.sauce,
                    bread: this.bread,
                    optional: this.optional,
                    drinks: this.drinks,
                    accompaniments: this.accompaniments
                };

                // Use 'push' para criar uma nova chave única para o combo'
                push(availableCombosRef, comboData)
                    .then(() => {
                        this.msg = 'Combo criado com sucesso'
                        this.tipo = 'success'
                        setTimeout(() => this.msg = "", 3000);
                        //limpar campos
                        this.nameCombo = "";
                        this.priceCombo = "";
                        this.hamburger_meat = "";
                        this.sauce = "";
                        this.bread = "";
                        this.optional = [];
                        this.drinks = [];
                        this.accompaniments = [];
                    })
                    .catch(error => {
                        console.log('Erro ao criar combo:', error);
                    });
            }
        }
    },
    mounted() {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user && user.uid) {
            const db = getDatabase();
            const productStockRef = ref(db, `stores/${user.uid}/productStock`);

            this.getDados(productStockRef, 'myData');
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