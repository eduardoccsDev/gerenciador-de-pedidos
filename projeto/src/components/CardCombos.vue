<template>
    <Message :msg="msg" :tipo="tipo" v-show="msg" />
    <div class="combosContainer">
        <div v-for="combo in combosN" :key="combo.idcombo" class="cardCombo">
            <div class="titleContainer">
                <p class="comboName"><i class="fa-solid fa-layer-group"></i>{{ combo.nomeCombo }}</p>
            </div>
            <div class="infosCombo">
                <p class="valorCombo"><i class="fa-solid fa-brazilian-real-sign"></i>{{ formattedValue(combo.valorCombo) }}
                </p>
                <p><i class="fa-solid fa-burger"></i>{{ combo.carneCombo }}</p>
                <p><i class="fa-solid fa-bread-slice"></i>{{ combo.paoCombo }}</p>
                <p><i class="fa-solid fa-droplet"></i>{{ combo.molhoCombo }}</p>
            </div>
            <div class="btnContainer">
                <button type="button" class="btn abrirModal" data-bs-toggle="modal" :data-bs-target="'#' + combo.idcombo">
                    <i class="fa-solid fa-plus"></i> Detalhes
                </button>
                <button class="btn excluirCombo" @click="deletarCombo(combo.idcombo)">
                    <i class="fa-solid fa-trash-can"></i> Excluir
                </button>
            </div>
            <!-- Modal -->
            <div class="modal fade" :id="combo.idcombo" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">{{ combo.nomeCombo }}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h3>Detalhes do combo:</h3>
                            <p>Bebidas disponíveis</p>
                            <ul class="listaAdcionais">
                                <li v-for="(bebida, index) in itemList(combo.bebidaCombo)" :key="index">
                                    {{ bebida }}
                                </li>
                            </ul>
                            <p>Opcionais disponíveis</p>
                            <ul class="listaAdcionais">
                                <li v-for="(opcional, index) in itemList(combo.opcionaisCombo)" :key="index">
                                    {{ opcional }}
                                </li>
                            </ul>
                            <p>Acompanhamentos disponíveis</p>
                            <ul class="listaAdcionais">
                                <li v-for="(acompanhamento, index) in itemList(combo.acompanhamentoCombo)" :key="index">
                                    {{ acompanhamento }}
                                </li>
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Message from './Message.vue';
export default {
    name: 'CardCombos',
    components: {
        Message
    },
    data() {
        return {
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
        deletarCombo(id) {
            axios.delete(`http://localhost:8800/combos/${id}`)
                .then(response => {
                    this.msg = `Combo N° ${id} removido com sucesso!`
                    this.tipo = 'success'
                    setTimeout(() => this.msg = "", 3000);
                    this.getDados('http://localhost:8800/combos', 'combosN');
                })
                .catch(error => {
                    console.error('Erro ao excluir o pedido:', error);
                });
        }
    },
    computed: {
        formattedValue() {
            return (value) => {
                return `${value.toLocaleString("pt-BR", {
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
.combosContainer {
    display: flex;

    .cardCombo {
        padding: 1em;
        margin-bottom: 1em;
        margin-right: 2em;
        box-shadow: 0px 0px 8px -4px #0000008f;
        border-radius: 10px;
        width: 300px;
    }

    .titleContainer {
        margin-bottom: 1em;
        background-color: var(--dark);
        padding: .5em .3em;
        border-radius: 5px;

        .comboName {
            margin-bottom: 0px;
            color: #fff;

            i {
                margin-right: .5em;
                color: var(--dark);
                background-color: var(--primary);
                padding: .3em;
                border-radius: 5px;
                width: 30px;
                text-align: center;
            }
        }
    }

    .btnContainer {
        text-align: center;
        display: flex;

        .abrirModal {
            background-color: var(--primary);
            width: 100%;
            transition: .5s;
            margin-right: .3em;

            &:hover {
                background-color: var(--primary-alt);
            }
        }

        .excluirCombo {
            background-color: rgb(253, 128, 128);
            width: 100%;
            transition: .5s;

            &:hover {
                background-color: rgb(206, 89, 89);
            }
        }
    }

    .infosCombo {
        background-color: #e9e9e9;
        padding: .5em;
        border-radius: 5px;
        margin-bottom: .5em;

        p {
            margin-bottom: .8em;

            i {
                margin-right: .5em;
                color: var(--dark);
                background-color: var(--primary);
                padding: .3em;
                border-radius: 5px;
                width: 30px;
                text-align: center;
            }
        }

        .valorCombo {
            font-weight: bold;
            text-decoration: underline;
            font-size: 18px;
        }
    }
}
</style>