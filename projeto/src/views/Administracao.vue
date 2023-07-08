<template>
    <div class="container">
        <div class="main">
            <h1>Administração:</h1>
            <div class="opcoesContainer">
                <FormItens 
                @axios-success="handleAxiosSuccess" 
                urlApi="http://localhost:8800/carnes" 
                :arrayDados="carnesN"
                sufixo="carnes"
                arrayNome="carnesN"
                idItem="idcarne"
                dadoParaEnvio="nomeCarne"
                indicativoInput="Digite o nome da carne"
                titulo="Adicionar carne a lista:" 
                icon="fa-solid fa-burger"
                />
                <FormItens 
                @axios-success="handleAxiosSuccess" 
                urlApi="http://localhost:8800/paes" 
                :arrayDados="paesN"
                sufixo="paes"
                arrayNome="paesN"
                idItem="idpao"
                dadoParaEnvio="nomePao" 
                indicativoInput="Digite o nome do pão"
                titulo="Adicionar pão a lista:"
                icon="fa-solid fa-bread-slice" 
                />
                <FormItens 
                @axios-success="handleAxiosSuccess" 
                urlApi="http://localhost:8800/molhos" 
                :arrayDados="molhosN"
                sufixo="molhos"
                arrayNome="molhosN"
                idItem="idmolho"
                dadoParaEnvio="nomeMolho" 
                indicativoInput="Digite o nome do molho"
                titulo="Adicionar molho a lista:"
                icon="fa-solid fa-droplet" 
                />
                <FormItens 
                @axios-success="handleAxiosSuccess" 
                urlApi="http://localhost:8800/opcionais" 
                :arrayDados="opcionaisN"
                sufixo="opcionais"
                arrayNome="opcionaisN"
                idItem="idopcional"
                dadoParaEnvio="nomeOpcional"
                indicativoInput="Digite o nome do opcional"
                titulo="Adicionar opcional a lista:"
                icon="fa-solid fa-plus"
                />
                <FormItens 
                @axios-success="handleAxiosSuccess" 
                urlApi="http://localhost:8800/acompanhamentos" 
                :arrayDados="acompanhamentoN"
                sufixo="acompanhamentos"
                arrayNome="acompanhamentoN"
                idItem="idacompanhamento"
                dadoParaEnvio="nomeAcompanhamento"
                dadoParaEnvio2="qtdAcompanhamento" 
                indicativoInput="Digite o nome do acompanhamento"
                indicativoInput2="Qtd do item"
                titulo="Adicionar acompanhamento a lista:"
                icon="fa-solid fa-bowl-food"
                modelo="2" 
                />
            </div>
        </div>
    </div>
</template>

<script>
import FormItens from '../components/FormItens.vue';
import axios from 'axios';
export default {
    name: "Administracao",
    components: {
        FormItens
    },
    data() {
        return {
            carnesN: [],
            paesN:[],
            molhosN:[],
            opcionaisN:[],
            acompanhamentoN:[]
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
        this.getDados(`${baseUrl}/opcionais`, 'opcionaisN');
        this.getDados(`${baseUrl}/acompanhamentos`, 'acompanhamentoN');
    }

}
</script>

<style scoped>
.opcoesContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}
</style>