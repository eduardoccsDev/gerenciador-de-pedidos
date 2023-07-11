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
                    <FormItens @axios-success="handleAxiosSuccess" urlApi="http://localhost:8800/carnes"
                        :arrayDados="carnesN" sufixo="carnes" arrayNome="carnesN" idItem="idcarne" dadoParaEnvio="nomeCarne"
                        indicativoInput="Digite o nome da carne" titulo="Adicionar carne a lista:"
                        icon="fa-solid fa-burger" />
                    <FormItens @axios-success="handleAxiosSuccess" urlApi="http://localhost:8800/paes" :arrayDados="paesN"
                        sufixo="paes" arrayNome="paesN" idItem="idpao" dadoParaEnvio="nomePao"
                        indicativoInput="Digite o nome do pão" titulo="Adicionar pão a lista:"
                        icon="fa-solid fa-bread-slice" />
                    <FormItens @axios-success="handleAxiosSuccess" urlApi="http://localhost:8800/molhos"
                        :arrayDados="molhosN" sufixo="molhos" arrayNome="molhosN" idItem="idmolho" dadoParaEnvio="nomeMolho"
                        indicativoInput="Digite o nome do molho" titulo="Adicionar molho a lista:"
                        icon="fa-solid fa-droplet" />
                    <FormItens @axios-success="handleAxiosSuccess" urlApi="http://localhost:8800/opcionais"
                        :arrayDados="opcionaisN" sufixo="opcionais" arrayNome="opcionaisN" idItem="idopcional"
                        dadoParaEnvio="nomeOpcional" indicativoInput="Digite o nome do opcional"
                        titulo="Adicionar opcional a lista:" icon="fa-solid fa-plus" />
                    <FormItens @axios-success="handleAxiosSuccess" urlApi="http://localhost:8800/acompanhamentos"
                        :arrayDados="acompanhamentoN" sufixo="acompanhamentos" arrayNome="acompanhamentoN"
                        idItem="idacompanhamento" dadoParaEnvio="nomeAcompanhamento" dadoParaEnvio2="qtdAcompanhamento"
                        indicativoInput="Digite o nome do acompanhamento" indicativoInput2="Qtd do item"
                        titulo="Adicionar acompanhamento a lista:" icon="fa-solid fa-bowl-food" modelo="2" />
                    <FormItens @axios-success="handleAxiosSuccess" urlApi="http://localhost:8800/bebidas"
                        :arrayDados="bebidasN" sufixo="bebidas" arrayNome="bebidasN" idItem="idbebida"
                        dadoParaEnvio="nomeBebida" dadoParaEnvio2="qtdBebida" indicativoInput="Digite o nome da bebida"
                        indicativoInput2="Qtd do item" titulo="Adicionar bebida a lista:" icon="fa-solid fa-beer-mug-empty"
                        modelo="2" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FormItens from '../components/FormItens.vue';
import CombosForm from '../components/CombosForm.vue';
import axios from 'axios';
export default {
    name: "Administracao",
    components: {
        FormItens,
        CombosForm
    },
    data() {
        return {
            carnesN: [],
            paesN: [],
            molhosN: [],
            opcionaisN: [],
            acompanhamentoN: [],
            bebidasN: []
        };
    },
    methods: {
        getDados(url, propriedade) {
            axios.get(url)
                .then(response => {
                    this[propriedade] = response.data;
                })
                .catch(error => {
                    console.log('Erro ao obter os dados:', error);
                });
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
    mounted() {
        const baseUrl = 'http://localhost:8800';
        this.getDados(`${baseUrl}/carnes`, 'carnesN');
        this.getDados(`${baseUrl}/paes`, 'paesN');
        this.getDados(`${baseUrl}/molhos`, 'molhosN');
        this.getDados(`${baseUrl}/bebidas`, 'bebidasN');
        this.getDados(`${baseUrl}/opcionais`, 'opcionaisN');
        this.getDados(`${baseUrl}/acompanhamentos`, 'acompanhamentoN');
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