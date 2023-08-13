<template>
    <Message :msg="msg" :tipo="tipo" v-show="msg" />
    <div v-if="adminFunctions == true" class="adminFunction">
        <Toggle v-model="value" offLabel='Off' onLabel="On" class="toggle-primary" />
        <p class="functionText">Função admin</p>
    </div>
    <div class="combosContainer">
        <div v-for="(item, index) in myData" :key="index" class="cardCombo">
            <div class="imageComboContainer">
                <div class="adminBtns">
                    <Transition name="grow-in" mode="out-in">
                        <router-link v-if="adminFunctions && value" :to="'/editarCombo/' + item.key">
                            <button class="btn edit" title="Editar">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </router-link>
                    </Transition>
                    <Transition name="grow-in" mode="out-in">
                        <button v-if="adminFunctions && value" class="btn excluirCombo" @click="deleteCombo(item.key)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </Transition>
                </div>
                <img :src="item.imageURL || './img/no-photo-available.png'" alt="featuredImageCombo" class="featuredImage">
            </div>
            <div class="cardHeader">
                <div class="titleContainer">
                    <p class="comboName">{{ item.nameCombo }}</p>
                </div>
            </div>
            <div class="infosCombo">
                <div class="info">
                    <p>Carne: {{ item.hamburger_meat }} | Pão: {{ item.bread }} | Molho: {{ item.sauce }}</p>
                </div>
                <p class="valorCombo">R${{ formattedValue(item.priceCombo) }}
                </p>
            </div>
            <div class="btnContainer">
                <button type="button" class="btn abrirModal" data-bs-toggle="modal" :data-bs-target="'#modal-' + index">
                    <i class="fa-solid fa-plus"></i> Detalhes
                </button>
                <router-link v-if="adminFunctions == false" :to="'/pedido/' + item.key">
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


    .imageComboContainer {
        width: 100%;
        height: 250px;

        .featuredImage {
            border-radius: 20px 20px 0px 0px;
            width: 100%;
            height: inherit;

        }
    }


    .cardCombo {
        margin-bottom: 2em;
        box-shadow: 7px 10px 27px -3px rgba(0, 0, 0, 0.33);
        border-radius: 20px;
        width: 350px;
        background-color: var(--primary);
        background-image: url('./img/marca-dagua.png');
        background-size: 300px;
        background-position-x: 8em;
        background-repeat: no-repeat;
        background-position-y: 21em;

        @media(max-width: 468px) {
            width: 100%;
        }
    }

    .adminBtns {
        display: flex;
        justify-content: flex-end;
        margin-inline: 1em;
        position: absolute;
        margin-top: 10px;

        a {
            margin-right: .5em;
            transition: .5s;

            &:hover {
                color: var(--dark);
                transform: scale(1.2);
            }

            .edit {
                padding: 0px;

                i {
                    background-color: #fff;
                    padding: .3em;
                    border-radius: 100%;

                }
            }
        }

        .excluirCombo {
            padding: 0px;
            transition: .5s;

            &:hover {
                transform: scale(1.2);
            }

            i {
                background-color: #fff;
                padding: .3em;
                border-radius: 100%;
            }
        }

    }

    .cardHeader {
        display: flex;
        justify-content: space-between;

        .titleContainer {
            margin-top: 1em;
            padding: .5em .3em;
            width: 100%;
            text-align: center;

            .comboName {
                margin-bottom: 0px;
                color: #fff;
                padding-inline: .3em;
                font-size: 26px;

            }
        }
    }

    .btnContainer {
        text-align: center;
        display: flex;
        margin-inline: 1em;

        .abrirModal {
            background-color: var(--dark);
            width: 90%;
            transition: .5s;
            color: #fff;
            margin: auto;
            margin-bottom: 1em;

            &:hover {
                background-color: var(--gray);
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
        padding: .5em;
        border-radius: 5px;
        margin-bottom: .5em;
        text-align: center;

        .info {
            text-align: center;

            p {
                color: #fff;
            }
        }

        .valorCombo {
            font-weight: bold;
            font-size: 24px;
            color: var(--dark);
            margin-bottom: 0px;
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

.toggle-primary {
    --toggle-bg-on: var(--primary);
    --toggle-border-on: var(--primary);
}

.grow-in-enter-from,
.grow-in-leave-to {
    opacity: 0;
    transform: scale(0.3);
}

.grow-in-enter-active,
.grow-in-leave.active {
    transition: 0.3s ease-out;
}
</style>