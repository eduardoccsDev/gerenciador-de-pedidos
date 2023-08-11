<template>
    <div class="container">
        <div class="main">
            <div class="combos">
                <h1 class="titleAdmin">
                    <i class="fa-solid fa-layer-group"></i>
                    Combos:
                </h1>
                <div class="combosContainer">
                    <CombosForm />
                </div>
            </div>
            <div class="administracao">
                <h1 class="titleAdmin">
                    <i class="fa-solid fa-gears"></i>
                    Administração:
                </h1>
                <div class="opcoesContainer">
                    <FormItens :arrayDados="productStockData" :itemType="'nomeCarne'" arrayNome="productStockData"
                        dadoParaEnvio="nomeCarne" indicativoInput="Digite o nome da carne" titulo="Adicionar carne a lista:"
                        icon="fa-solid fa-burger" />
                    <FormItens :arrayDados="productStockData" :itemType="'nomePao'" arrayNome="productStockData"
                        dadoParaEnvio="nomePao" indicativoInput="Digite o nome do pão" titulo="Adicionar pão a lista:"
                        icon="fa-solid fa-bread-slice" />
                    <FormItens :arrayDados="productStockData" :itemType="'nomeMolho'" arrayNome="productStockData"
                        dadoParaEnvio="nomeMolho" indicativoInput="Digite o nome do molho" titulo="Adicionar molho a lista:"
                        icon="fa-solid fa-droplet" />
                    <FormItens :arrayDados="productStockData" :itemType="'nomeOpcional'" arrayNome="productStockData"
                        dadoParaEnvio="nomeOpcional" indicativoInput="Digite o nome do opcional"
                        titulo="Adicionar opcional a lista:" icon="fa-solid fa-plus" />
                    <FormItens :arrayDados="productStockData" :itemType="'nomeAcompanhamento'" :itemComplement="'qtdItem'"
                        arrayNome="productStockData" dadoParaEnvio="nomeAcompanhamento" dadoParaEnvio2="qtdItem"
                        indicativoInput="Digite o nome do acompanhamento" indicativoInput2="Qtd do item"
                        titulo="Adicionar acompanhamento a lista:" icon="fa-solid fa-bowl-food" modelo="2" />
                    <FormItens :arrayDados="productStockData" :itemType="'nomeBebida'" :itemComplement="'qtdItem'"
                        arrayNome="productStockData" dadoParaEnvio="nomeBebida" dadoParaEnvio2="qtdBebida"
                        indicativoInput="Digite o nome da bebida" indicativoInput2="Qtd do item"
                        titulo="Adicionar bebida a lista:" icon="fa-solid fa-beer-mug-empty" modelo="2" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FormItens from '../components/FormItens.vue';
import CombosForm from '../components/CombosForm.vue';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
export default {
    name: "Administracao",
    components: {
        FormItens,
        CombosForm
    },
    data() {
        return {
            currentUser: null,
            productStockData: null
        };
    },
    methods: {
        async getProductStockData() {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const db = getDatabase();
                const productStockRef = ref(db, `stores/${user.uid}/productStock`);

                try {
                    const snapshot = await get(productStockRef);
                    if (snapshot.exists()) {
                        this.productStockData = snapshot.val();
                        // console.log('Dados do productStock:', this.productStockData); 
                    }
                } catch (error) {
                    console.error('Erro ao obter dados do productStock:', error);
                }
            }
        },
        handleAxiosSuccess(sufixo, nomeDoArray) {
            const baseUrl = 'http://localhost:8800';
            this.getDados(`${baseUrl}/${sufixo}`, nomeDoArray);

        }
    },
    watch: {
        parentProp(newValue, oldValue) {
            console.log('parentProp foi alterada:', newValue, oldValue);
        }
    },
    computed: {
        filteredProductStockData() {
            if (this.productStockData && this.itemType) {
                return this.productStockData[this.itemType] || [];
            }
            return [];
        }
    },
    mounted() {
        this.getProductStockData();
    }

}
</script>

<style lang="scss" scoped>
.opcoesContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.titleAdmin {
    background-color: var(--dark);
    color: var(--light);
    border-radius: 10px;
    font-size: 32px;
    padding: .2em;

    i {
        font-size: 26px;
        background-color: var(--primary);
        color: var(--dark);
        padding: .2em;
        border-radius: 10px;
    }
}
</style>