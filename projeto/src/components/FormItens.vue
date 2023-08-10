<template>
    <div class="painel">
        <div class="ContentInput">
            <p class="titleName"><i :class="icon" v-if="icon !== ''"></i>{{ titulo }}</p>
            <form>
                <div class="formContainer">
                    <div class="inputs">
                        <input v-model="itemF" type="text" :name="dadoParaEnvio" :placeholder="indicativoInput">
                        <input v-if="modelo == 2" v-model="itemG" type="text" :name="dadoParaEnvio2"
                            :placeholder="indicativoInput2">
                    </div>

                    <button class="btnF salvar" type="submit" @click.prevent="addItem">
                        <i class="fa-regular fa-floppy-disk"></i>
                        Salvar
                    </button>
                </div>
            </form>
        </div>
        <div class="ContainerList">
            <ul>
                <TransitionGroup name="fade" class="container">
                    <li v-for="(item, index) in dynamicArray" :key="index">
                        <div class="ContainerItem">
                            <p v-if="dadoParaEnvio2 === ''" class="itemNome">
                                {{ item }}
                            </p>
                            <p v-else class="itemNome">
                                {{ item.name }}
                                <span class="infoSecundaria">
                                    - {{ item.qtdItem }}
                                </span>
                            </p>
                            <div class="btns">
                                <button @click="deletarItem(index)" class="btnF delete">
                                    <i class="fa-regular fa-circle-xmark"></i>
                                </button>
                            </div>
                        </div>
                    </li>
                </TransitionGroup>
            </ul>
        </div>
    </div>
</template>

<script>
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, update, get, off } from 'firebase/database';
export default {
    name: "FormItens",
    props: {
        arrayNome: {
            type: String,
            required: true
        },
        arrayDados: {
            type: Object,
            default: () => []
        },
        itemType: {
            type: String
        },
        itemComplement: {
            type: String
        },
        idItem: {
            type: String,
            required: true
        },
        dadoParaEnvio: {
            type: String,
            required: true
        },
        dadoParaEnvio2: {
            type: String,
            required: false,
            default: () => ''
        },
        indicativoInput: {
            type: String,
            required: true
        },
        indicativoInput2: {
            type: String,
            required: false,
            default: () => ""
        },
        titulo: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: false,
            default: () => ""
        },
        modelo: {
            type: String,
            required: false,
            default: () => '1'
        }
    },
    data() {
        return {
            itemF: null,
            itemG: null,
        }
    },
    methods: {
        async addItem() {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user && user.uid) {
                const db = getDatabase();
                const storeProductRef = ref(db, `stores/${user.uid}/productStock`);

                // Obtenha a lista atual do nó
                let currentData = (await get(storeProductRef)).val() || {};

                // Verifique se a categoria já existe no objeto currentData
                if (!currentData[this.dadoParaEnvio]) {
                    currentData[this.dadoParaEnvio] = [];
                }

                // Adicione o novo item à lista da categoria
                if (this.modelo === '2') {
                    // Se o modelo for 2, adicione os dados para envio 2
                    currentData[this.dadoParaEnvio].push({
                        name: this.itemF,
                        qtdItem: this.itemG
                    });
                } else {
                    // Se o modelo não for 2, adicione apenas o dado para envio 1
                    currentData[this.dadoParaEnvio].push(this.itemF);
                }

                // Atualize o nó com os dados atualizados
                await update(storeProductRef, currentData);

                // Realize uma nova solicitação para obter os dados atualizados
                const updatedData = (await get(storeProductRef)).val() || {};

                // Atualize o array de dados com os dados obtidos
                this.arrayDados[this.itemType] = updatedData[this.itemType] || [];

            }

            // Emita um evento de sucesso após a operação
            this.$emit('axios-success', this.sufixo, this.arrayNome);
            this.itemF = "";
            this.itemG = "";
        },
        async deletarItem(index) {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user && user.uid) {
                const db = getDatabase();
                const storeProductRef = ref(db, `stores/${user.uid}/productStock`);

                // Obtenha a lista atual do nó
                let currentData = (await get(storeProductRef)).val() || {};

                // Verifique se a categoria existe no objeto currentData
                if (currentData[this.dadoParaEnvio]) {
                    // Remova o item do array de acordo com o índice
                    currentData[this.dadoParaEnvio].splice(index, 1);

                    // Atualize o nó com os dados atualizados
                    await update(storeProductRef, currentData);

                    // Realize uma nova solicitação para obter os dados atualizados
                    const updatedData = (await get(storeProductRef)).val() || {};

                    // Atualize o array de dados com os dados obtidos
                    this.arrayDados[this.itemType] = updatedData[this.itemType] || [];
                }
            }
        }


    },
    computed: {
        dynamicArray() {
            if (this.arrayDados && this.itemType) {
                return this.arrayDados[this.itemType] || [];
            }
            return [];
        }
    },


}
</script>

<style lang="scss" scoped>
.painel {
    width: 32%;
    margin-right: 1em;
    margin-bottom: 1em;

    .titleName {
        i {
            background-color: var(--primary);
            color: var(--dark);
            padding: .2em;
            border-radius: 5px;
            margin-right: .5em;
            width: 25px;
            text-align: center;
        }
    }

    .ContentInput {
        background-color: var(--dark);
        padding: 1em;
        border-radius: 20px;
        margin-bottom: 1em;
        box-shadow: 2px 2px 7px -6px var(--dark-alt);

        p {
            font-size: 18px;
            color: var(--light);
            border-bottom: solid 2px #ffffff24;
            padding-bottom: .5em;
        }

        .salvar {
            background-color: var(--primary);
            color: var(--dark);
        }
    }

    .ContainerList {
        background-color: #e9e9e9;
        padding: 1em;
        border-radius: 20px;
        margin-bottom: 1em;
        max-height: 260px;
        min-height: 260px;
        overflow-y: scroll;
        box-shadow: 2px 2px 7px -6px var(--dark-alt);

        .delete {
            background-color: transparent;
            color: rgb(238, 118, 118);
            font-size: 20px;
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

            .ContainerItem {
                display: flex;
                justify-content: space-between;
                align-items: baseline;

                .itemNome {
                    margin-bottom: 0px
                }

            }

        }
    }

    .btnF {
        padding: .2em .4em;
        border-radius: 5px;
        border: none;
        transition: .5s;

        &:hover {
            filter: brightness(120%);
            transform: scale(1.1);
        }
    }

    .formContainer {
        display: flex;

        .inputs {
            width: 75%;
            margin-right: .5em;
            display: flex;
            justify-content: center;

            input {
                border: none;
                width: 100%;
                border-radius: 5px;
                padding-inline: .5em;
                margin-right: .2em;

                &:nth-child(2) {
                    margin-left: .5em;
                }
            }
        }

    }
}

/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
    position: absolute;
}
</style>