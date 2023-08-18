<template>
    <Message :msg="msg" :tipo="tipo" v-show="msg" />
    <div class="container">
        <div class="main">
            <div class="cardProfile">
                <div class="userInfo">
                    <p class="userName">{{ myData.nameStore }} -
                        <span v-if="myData.function === 'store'" class="userFunction">Lojista</span>
                        <span v-else class="userFunction">Cliente</span>
                    </p>
                    <div class="formUserInfoContainer">
                        <div class="adminFunction">
                            <button @click="handleEditFunction" :class="{ 'inEdition': inEdition }">Editar dados</button>
                        </div>
                        <form class="formUserInfo" @submit.prevent="saveUserInfo">
                            <div class="rowForm">
                                <div class="inputContainer">
                                    <label for="address">Endereço:</label>
                                    <input :disabled="editFunction" type="text" id="address" v-model="address"
                                        placeholder="Seu endereço">
                                </div>
                                <div class="inputContainer">
                                    <label for="phone">Telefone para contato:</label>
                                    <input :disabled="editFunction" type="text" id="phone" v-model="phone"
                                        placeholder="Seu telefone">
                                </div>
                            </div>
                            <div class="rowForm">
                                <div class="inputContainer">
                                    <label for="storeDescription">Descrição da loja:</label>
                                    <textarea :disabled="editFunction" v-model="storeDescription" name="storeDescription"
                                        id="storeDescription" placeholder="Sua descrição"></textarea>
                                </div>
                            </div>
                            <div class="submitBtnContainer">
                                <button :disabled="editFunction" class="submitBtn" type="submit">Salvar modificações</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
import { getAuth } from 'firebase/auth';
import { ref } from 'vue';
import { getDatabase, ref as dbRef, get, update } from 'firebase/database';
import { useRoute } from 'vue-router';
import Toggle from '@vueform/toggle';
import Message from '../components/Message.vue';
export default {
    name: 'Profile',
    data() {
        return {
        }
    },
    components: {
        Toggle,
        Message
    },
    setup(props) {
        const msg = ref(null);
        const tipo = ref(null);
        const myData = ref({});
        const route = useRoute();
        const editFunction = ref(true);
        const inEdition = ref(false);
        const storeDescription = ref(null);
        const address = ref(null);
        const phone = ref(null);

        const auth = getAuth();
        const user = auth.currentUser;


        if (user && user.uid) {
            const db = getDatabase();
            const comboRef = dbRef(db, `users/${route.params.id}`);
            get(comboRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        myData.value = snapshot.val();
                    } else {
                        console.log('Usuário não encontrado');
                    }
                })
                .catch((error) => {
                    console.log('Erro ao obter os dados:', error);
                });
        };

        if (user && user.uid) {
            const db = getDatabase();
            const comboRef = dbRef(db, `users/${user.uid}`);
            get(comboRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        myData.value = snapshot.val();

                        // Defina os valores recuperados nos campos do formulário
                        address.value = myData.value.address;
                        phone.value = myData.value.phone;
                        storeDescription.value = myData.value.storeDescription;
                    } else {
                        console.log('Usuário não encontrado');
                    }
                })
                .catch((error) => {
                    console.log('Erro ao obter os dados:', error);
                });
        }

        const saveUserInfo = async () => {
            const db = getDatabase();
            const comboRef = dbRef(db, `users/${user.uid}`);

            const userData = {
                address: address.value,
                phone: phone.value,
                storeDescription: storeDescription.value
            };

            try {
                await update(comboRef, userData);
                editFunction.value = true;
                msg.value = 'Informções salvas com sucesso';
                tipo.value = 'success';
                setTimeout(() => {
                    msg.value = "";
                }, 3000);
            } catch (error) {
                console.error('Erro ao salvar os dados:', error);
            }
        };

        const handleEditFunction = () => {
            editFunction.value = !editFunction.value;
            inEdition.value = !inEdition.value;
        };

        return {
            msg,
            tipo,
            myData,
            editFunction,
            inEdition,
            storeDescription,
            phone,
            address,
            saveUserInfo,
            handleEditFunction
        };
    },
}

</script>
<style src="@vueform/toggle/themes/default.css"></style>    
<style lang="scss" scoped>
.cardProfile {
    padding: 1em;
    border-radius: 20px;
    box-shadow: 7px 10px 27px -3px rgba(0, 0, 0, 0.33);
    background-color: #e9e9e9;
    background-image: url('/img/marca-dagua.png');
    background-size: 300px;
    background-position-x: 8em;
    background-repeat: no-repeat;
    background-position-y: 21em;

    .formUserInfoContainer {
        .formUserInfo {
            .rowForm {
                display: flex;
                justify-content: space-between;

                .inputContainer {
                    display: flex;
                    flex-direction: column;
                    margin: .5em;
                    width: 100%;

                    label {
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: .5em;

                        i {
                            background-color: var(--primary);
                            color: var(--dark);
                            padding: 0.2em;
                            border-radius: 5px;
                            margin-right: 0.5em;
                            width: 25px;
                            text-align: center;
                        }

                        span {
                            color: rgb(238, 118, 118);
                        }
                    }

                    input,
                    select,
                    textarea {
                        border-radius: 5px;
                        border: none;
                        padding: .5em;
                        color: var(--dark);
                        background-color: #fff;
                        transition: .5s;

                        &:focus-visible {
                            outline: solid 2px var(--primary);
                        }

                        &:disabled {
                            background-color: #cfcfcf;
                        }
                    }
                }
            }
        }
    }
}
</style>