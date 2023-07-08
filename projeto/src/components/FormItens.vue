<template>
    <div class="painel">
        <div class="ContentInput">
            <p>{{titulo}}</p>
            <form>
                <div class="formContainer">
                    <input v-model="itemF" type="text" :name="returnName" :placeholder="indicativoInput">
                    <button class="btnF salvar" type="submit" @click.prevent="addItem">
                        <i class="fa-regular fa-floppy-disk"></i>
                        Salvar
                    </button>
                </div>
            </form>
        </div>
        <div class="ContainerList">
            <ul>
                <li v-for="item in arrayDados" :key="'item.' + idItem">
                    <div class="ContainerItem">
                        <p class="itemNome">
                            {{ item[returnName] }}
                        </p>
                        <div class="btns">
                            <button @click="deletarItem(item[idItem])" class="btnF delete">
                                <i class="fa-solid fa-trash"></i>
                                Deletar
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "FormItens",
    props: [
        'arrayNome',
        'urlApi',
        'returnName',
        'arrayDados',
        'sufixo',
        'idItem',
        'dadosParaEnvio',
        'indicativoInput',
        'titulo'
    ],
    data() {
        return {
            itemF: null,
            item: null,
            editingItemId: -1
        }
    },
    methods: {
        deletarItem(id) {
            axios.delete(this.urlApi + '/' + id)
                .then(response => {
                    this.$emit('axios-success', this.sufixo, this.arrayNome);
                })
                .catch(error => {
                    console.error('Erro ao excluir o item:', error);
                });
        },
        addItem() {
            const dados = {};
            dados[this.dadosParaEnvio] = this.itemF;
            // requisição POST
            axios.post(this.urlApi, dados)
                .then(response => {
                    this.$emit('axios-success', this.sufixo, this.arrayNome);
                    this.itemF = "";
                })
                .catch(error => {
                    console.log('Erro ao enviar os dados:', error);
                })
        },

    },


}
</script>

<style scoped>
.painel {
    width: 33%;
}
.ContentInput{
    background-color: #222;
    padding: 1em;
    border-radius: 20px;
    margin-bottom: 1em;
}

.ContainerList{
    background-color: #e9e9e9;
    padding: 1em;
    border-radius: 20px;
    margin-bottom: 1em;
}

.ContainerList {
    max-height: 260px;
    min-height: 260px;
    overflow-y: scroll;
}

.ContentInput p {
    font-size: 18px;
    color: #fff;
    border-bottom: solid 2px #ffffff24;
    padding-bottom: .5em;
}

.btnF {
    padding: .2em .4em;
    border-radius: 5px;
    border: none;
    transition: .5s;
}

.btnF:hover {
    filter: brightness(120%);
}


.salvar {
    background-color: #FEB611;
    color: #222;
}

.delete {
    background-color: rgb(238, 118, 118);
}

input {
    border: none;
    margin-right: 1em;
    width: 65%;
    border-radius: 5px;
    padding-inline: .5em;
}

.formContainer {
    display: flex;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

li {
    background-color: #fff;
    margin-bottom: 8px;
    padding: .3em .5em;
    border-radius: 5px;
}

.ContainerItem {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}

.itemNome {
    margin-bottom: 0px
}
</style>