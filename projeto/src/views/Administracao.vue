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
                returnName="nomeCarne"
                idItem="idcarne"
                dadosParaEnvio="nomeCarne"
                indicativoInput="Digite o nome da carne"
                titulo="Adicionar carne a lista de opções:" 
                />
                <FormItens 
                @axios-success="handleAxiosSuccess" 
                urlApi="http://localhost:8800/paes" 
                :arrayDados="paesN"
                sufixo="paes"
                arrayNome="paesN"
                returnName="nomePao"
                idItem="idpao"
                dadosParaEnvio="nomePao" 
                indicativoInput="Digite o nome do pão"
                titulo="Adicionar pão a lista de opções:" 
                />
                <FormItens 
                @axios-success="handleAxiosSuccess" 
                urlApi="http://localhost:8800/paes" 
                :arrayDados="paesN"
                sufixo="paes"
                arrayNome="paesN"
                returnName="nomePao"
                idItem="idpao"
                dadosParaEnvio="nomePao" 
                indicativoInput="Digite o nome do pão"
                titulo="Adicionar pão a lista de opções:" 
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
            paesN:[]
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
    }

}
</script>

<style scoped>
.opcoesContainer {
    display: flex;
    align-items: center;
    justify-content: start;
}

.opcoesContainer .painel {
    margin-right: 1em;
}
</style>