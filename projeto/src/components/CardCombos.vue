<template>
    <div class="combosContainer">
        <div v-for="combo in combosN" :key="combo.idcombo" class="cardCombo">
            <p>Nome: {{ combo.nomeCombo }}</p>
            <p>Preço: {{ formattedValue(combo.valorCombo) }}</p>
            <p>Carne: {{combo.carneCombo}}</p>
            <p>Pão: {{combo.paoCombo}}</p>
            <p>Molho: {{combo.molhoCombo}}</p>
            <p>Bebidas disponíveis</p>
            <ul class="listaAdcionais">
                <li v-for="(bebida, index) in itemList(combo.bebidaCombo)" :key="index">
                    {{bebida}}
                </li>
            </ul>
            <p>Opcionais disponíveis</p>
            <ul class="listaAdcionais">
                <li v-for="(opcional, index) in itemList(combo.opcionaisCombo)" :key="index">
                    {{opcional}}
                </li>
            </ul>
             <p>Acompanhamentos disponíveis</p>
            <ul class="listaAdcionais">
                <li v-for="(acompanhamento, index) in itemList(combo.acompanhamentoCombo)" :key="index">
                    {{acompanhamento}}
                </li>
            </ul>
    
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CardCombos',
    data() {
        return {
            combosN: []
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
        itemList(itemComboList){
            return itemComboList.split(",");
        }
    },
    computed: {
        formattedValue() {
            return (value) => {
                return `R$ ${value.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })},00`;
            };
        },
    },
    mounted() {
        const baseUrl = 'http://localhost:8800';
        this.getDados(`${baseUrl}/combos`, 'combosN');
    }
}
</script>

<style scoped lang="scss">

.combosContainer{
    display: flex;
    .cardCombo {
      padding: 1em;
      margin-bottom: 1em;
      margin-right: 2em;
      box-shadow: 0px 0px 8px -4px #0000008f;
      border-radius: 10px;
    }
}
</style>