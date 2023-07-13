<template>
    <div class="comboFormContainer">
        <form>
            <div class="rowForm">
                <div class="inputContainer">
                    <label>
                        <i class="fa-solid fa-pen"></i>
                        Nome do combo:
                        <span>*</span>
                    </label>
                    <input type="text" name="nomeCombo" v-model="nomeCombo" placeholder="Nome do combo">
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
                        <i class="fa-solid fa-beer-mug-empty"></i>
                        Escolha a(s) bebida(s) do combo:
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
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CombosForm',
    data() {
        return {
            carnesN: [],
            molhosN: [],
            paesN: [],
            nomeCombo: null,
            carne: '',
            molho: '',
            pao: ''
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
    },
    mounted() {
        const baseUrl = 'http://localhost:8800';
        this.getDados(`${baseUrl}/carnes`, 'carnesN');
        this.getDados(`${baseUrl}/molhos`, 'molhosN');
        this.getDados(`${baseUrl}/paes`, 'paesN');
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

}
</style>