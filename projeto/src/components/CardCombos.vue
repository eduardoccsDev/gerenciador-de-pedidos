<template>
    <Message :msg="msg" :tipo="tipo" v-show="msg" />
    <div v-if="adminFunctions == true" class="adminFunction">
        <Toggle v-model="value" offLabel='Off' onLabel="On" class="toggle-primary"/>
        <p class="functionText">Função admin</p>
    </div>
    <div class="combosContainer">
        <div v-for="(item, index) in myData" :key="index" class="cardCombo">
            <div class="cardHeader">
                <div class="titleContainer">
                    <p class="comboName">{{ item.nameCombo }}</p>
                </div>
                <div v-if="adminFunctions && value" class="editContainer">
                    <router-link :to="'/editarCombo/' + item.key">
                        <button class="btn edit" title="Editar">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </router-link>
                </div>
            </div>
            <div class="infosCombo">
                <p class="valorCombo"><i class="fa-solid fa-brazilian-real-sign"></i>{{ formattedValue(item.priceCombo) }}
                </p>
                <p><i class="fa-solid fa-burger"></i>{{ item.hamburger_meat }}</p>
                <p><i class="fa-solid fa-bread-slice"></i>{{ item.bread }}</p>
                <p><i class="fa-solid fa-droplet"></i>{{ item.sauce }}</p>
            </div>
            <div class="btnContainer">
                <button type="button" class="btn abrirModal" data-bs-toggle="modal" :data-bs-target="'#modal-' + index">
                    <i class="fa-solid fa-plus"></i> Detalhes
                </button>
                <button v-if="adminFunctions && value" class="btn excluirCombo" @click="deleteCombo(item.key)">
                    <i class="fa-solid fa-trash-can"></i> Excluir
                </button>
                <router-link v-else-if="adminFunctions == false" :to="'/pedido/' + item.key">
                    <button class="btn pedirCombo">
                        <i class="fa-regular fa-circle-check"></i> Pedir
                    </button>
                </router-link>
            </div>
            <!-- Modal -->
            <div class="modal fade" :id="'modal-' + index" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">{{ item.nameCombo }} - <span>R$
                                    {{ formattedValue(item.priceCombo) }}</span></h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="detalhesContainer">
                                <p v-if="item.optional && item.optional.length > 0">Opcionais disponíveis</p>
                                <ul class="listaAdcionais" v-if="item.optional && item.optional.length > 0">
                                    <li v-for="(opcional, index) in item.optional" :key="index">
                                        {{ opcional }}
                                    </li>
                                </ul>
                                <span v-else>Não há opcionais disponíveis para este combo.</span>
                            </div>
                            <div class="detalhesContainer">
                                <p v-if="item.drinks && item.drinks.length > 0">Bebidas disponíveis</p>
                                <ul v-if="item.drinks && item.drinks.length > 0" class="listaAdcionais">
                                    <li v-for="(bebida, index) in item.drinks" :key="index">
                                        {{ bebida }}
                                    </li>
                                </ul>
                                <span v-else>Não há bebidas disponíveis para este combo.</span>
                            </div>
                            <div class="detalhesContainer">
                                <p v-if="item.accompaniments && item.accompaniments.length > 0">Acompanhamentos
                                    disponíveis</p>
                                <ul v-if="item.accompaniments && item.accompaniments.length > 0" class="listaAdcionais">
                                    <li v-for="(acompanhamento, index) in item.accompaniments" :key="index">
                                        {{ acompanhamento }}
                                    </li>
                                </ul>
                                <span v-else>Não há acompanhamentos disponíveis para este combo.</span>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btnFechar btn-secondary"
                                data-bs-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import Message from './Message.vue';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref as dbRef, get, remove } from 'firebase/database';
import Toggle from '@vueform/toggle'
export default {
    name: 'CardCombos',
    components: {
        Message,
        Toggle
    },
    props: {
        adminFunctions: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            value: false,
        }
    },
    setup(props) {
        const msg = ref(null);
        const tipo = ref(null);
        const myData = ref({});

        const auth = getAuth();
        const user = auth.currentUser;

        if (user && user.uid) {
            const db = getDatabase();
            const productStockRef = dbRef(db, `stores/${user.uid}/availableCombos`);

            get(productStockRef)
                .then((snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        const comboId = childSnapshot.key;
                        const comboData = childSnapshot.val();
                        myData.value[comboId] = { ...comboData, key: comboId };
                    });
                })
                .catch((error) => {
                    console.log('Erro ao obter os dados:', error);
                });
        }

        const deleteCombo = (comboKey) => {
            if (user && user.uid) {
                const db = getDatabase();
                const comboRef = dbRef(
                    db,
                    `stores/${user.uid}/availableCombos/${comboKey}`
                );

                remove(comboRef)
                    .then(() => {
                        // Atualize myData para refletir a exclusão localmente
                        if (myData.value[comboKey]) {
                            delete myData.value[comboKey];
                        }
                        msg.value = 'Combo removido com sucesso'; // Usando msg.value para atribuir valor a uma variável reativa
                        tipo.value = 'success'; // Usando tipo.value para atribuir valor a uma variável reativa
                        setTimeout(() => {
                            msg.value = ''; // Limpar a mensagem após 3 segundos
                            tipo.value = ''; // Limpar o tipo após 3 segundos
                        }, 3000);
                    })
                    .catch((error) => {
                        console.error('Erro ao excluir o combo:', error);
                    });
            }
        };

        return {
            msg,
            tipo,
            myData,
            deleteCombo,
        };
    },
    computed: {
        formattedValue() {
            return (value) => {
                return `${value.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}`;
            };
        },
    },
};
</script>

<style src="@vueform/toggle/themes/default.css"></style>
<style scoped lang="scss">
.adminFunction {
    padding: 1em;
    display: flex;
    background-color: #c0c0c097;
    margin-bottom: 2em;
    border-radius: 5px;
    justify-content: flex-end;

    .functionText {
        color: var(--dark);
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 0px;
        margin-left: .5em;
    }
}

.combosContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .cardCombo {
        padding: 1em;
        margin-bottom: 2em;
        box-shadow: 0px 0px 8px -4px #0000008f;
        border-radius: 10px;
        width: 400px;
        background-color: var(--light);

        @media(max-width: 468px) {
            width: 100%;
        }
    }

    .cardHeader {
        display: flex;
        justify-content: space-between;

        .titleContainer {
            margin-bottom: 1em;
            background-color: var(--dark);
            padding: .5em .3em;
            border-radius: 5px;
            width: 100%;

            .comboName {
                margin-bottom: 0px;
                color: #fff;
                padding-inline: .3em;
            }
        }

        .editContainer {
            a {
                color: var(--dark);
            }

            .edit {
                background-color: #00cfff;
                transition: .5s;
                padding: .5em .8em;
                color: var(--dark);
                margin-left: .3em;

                &:hover {
                    background-color: #007792;
                }
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

            &:hover {
                background-color: var(--primary-alt);
            }
        }

        .excluirCombo {
            background-color: rgb(253, 128, 128);
            width: 100%;
            transition: .5s;
            margin-left: .3em;

            &:hover {
                background-color: rgb(206, 89, 89);
            }
        }

        a {
            width: 100%;
            text-decoration: none;

            &:hover {
                color: var(--dark);
            }
        }

        .pedirCombo {
            background-color: #00cfff;
            width: 100%;
            transition: .5s;
            margin-left: .3em;

            &:hover {
                background-color: #007792;
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

    .modal-dialog {
        height: 90vh;
        display: flex;
        align-items: center;
    }

    .modal-body {
        .detalhesContainer {
            background-color: #e9e9e9;
            padding: .5em;
            border-radius: 5px;
            margin-bottom: .5em;

            p {
                border-bottom: solid 2px #c0c0c0;
                padding-bottom: .2em;
            }
        }
    }

    .modal-footer {
        .btnFechar {
            background-color: rgb(253, 128, 128);
            color: var(--dark);
            border: none;
            transition: .5s;

            &:hover {
                background-color: #D05B5B;
            }
        }
    }
}
.toggle-primary{
    --toggle-bg-on: var(--primary);
    --toggle-border-on: var(--primary);
    }
</style>