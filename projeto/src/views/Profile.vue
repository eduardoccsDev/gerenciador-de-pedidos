<template>
    <Message :msg="msg" :tipo="tipo" v-show="msg" />
    <div class="container">
        <div class="main">
            <h1>Perfil</h1>
            <div class="cardProfile">
                <div class="userInfo">
                    <img :src="myData.userPhotoUrl" alt="userPhoto" class="userPhoto">
                    <p class="userName">{{ myData.nameStore }} -
                        <span v-if="myData.function === 'store'" class="userFunction">Lojista</span>
                        <span v-else class="userFunction">Cliente</span>
                    </p>
                    <div class="formUserInfoContainer">
                        <div class="storeBannerContainer">
                            <p>Banner da loja:</p>
                            <img :src="myData.storeBannerUrl" alt="storeBanner" class="storeBanner">
                        </div>
                        <div class="adminFunction">
                            <button @click="handleEditFunction" :class="{ 'inEdition': inEdition }">
                                <i class="fa-solid fa-pen-to-square"></i>
                                Editar dados
                            </button>
                        </div>
                        <form class="formUserInfo" @submit.prevent="saveUserInfo">
                            <div class="rowForm">
                                <div class="inputContainer">
                                    <label for="userPhoto"><i class="fa-solid fa-photo-film"></i> Foto de perfil: </label>
                                    <input type="file" @change="handleImageUpload" accept="image/*" :disabled="editFunction"
                                        id="userPhoto">
                                </div>
                                <div class="inputContainer">
                                    <label for="storeBanner"><i class="fa-solid fa-panorama"></i> Banner Loja: </label>
                                    <input type="file" @change="handleImageUpload" accept="image/*" :disabled="editFunction"
                                        id="storeBanner">
                                </div>
                                <div class="inputContainer">
                                    <label for="storeCategory"><i class="fa-solid fa-spell-check"></i> Categoria da loja:</label>
                                    <select id="storeCategory" name="storeCategory" required v-model="storeCategory"
                                        :disabled="editFunction">
                                        <option value="" selected disabled>Selecione a categoria</option>
                                        <option v-for="(item, index) in storesCategories" :key="index" :value="item">
                                            {{ item }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="rowForm">
                                <div class="inputContainer">
                                    <label for="address"><i class="fa-regular fa-map"></i> Endereço:</label>
                                    <input :disabled="editFunction" type="text" id="address" v-model="address"
                                        placeholder="Seu endereço">
                                </div>
                                <div class="inputContainer">
                                    <label for="phone"><i class="fa-brands fa-whatsapp"></i> Telefone para contato:</label>
                                    <input :disabled="editFunction" type="text" id="phone" v-model="phone"
                                        placeholder="Seu telefone">
                                </div>
                            </div>
                            <div class="rowForm">
                                <div class="inputContainer">
                                    <label for="instagram"><i class="fa-brands fa-instagram"></i> Instagram:</label>
                                    <input type="text" :disabled="editFunction" id="instagram" v-model="instagram"
                                        placeholder="Seu instagram">
                                </div>
                                <div class="inputContainer">
                                    <label for="facebook"><i class="fa-brands fa-facebook"></i> Facebook:</label>
                                    <input type="text" :disabled="editFunction" id="facebook" v-model="facebook"
                                        placeholder="Seu facebook">
                                </div>
                            </div>
                            <div class="rowForm">
                                <div class="inputContainer">
                                    <label for="storeDescription"><i class="fa-regular fa-message"></i> Descrição da
                                        loja:</label>
                                    <textarea :disabled="editFunction" v-model="storeDescription" name="storeDescription"
                                        id="storeDescription" placeholder="Sua descrição"></textarea>
                                </div>
                            </div>
                            <div class="submitBtnContainer">
                                <button :disabled="editFunction" class="submitBtn" type="submit">Salvar
                                    modificações</button>
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
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { useRoute } from 'vue-router';
import Message from '../components/Message.vue';
export default {
    name: 'Profile',
    data() {
        return {
        }
    },
    components: {
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
        const facebook = ref(null);
        const storeCategory = ref(null);
        const instagram = ref(null);
        const comboRef = ref(null); // Declarada no escopo do setup
        const imageUrls = ref([]);
        const storesCategories = ref({});

        const auth = getAuth();
        const user = auth.currentUser;

        if (user && user.uid) {
            const db = getDatabase();
            comboRef.value = dbRef(db, `users/${route.params.id}`);
            get(comboRef.value) // Use comboRef.value aqui
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
        }
        if (user && user.uid) {
            const db = getDatabase();
            const comboRef = dbRef(db, 'storesCategories');

            get(comboRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        // Converta o valor do snapshot para um objeto JavaScript
                        storesCategories.value = snapshot.val();
                    } else {
                        console.log('Categorias não encontradas');
                    }
                })
                .catch((error) => {
                    console.log('Erro ao obter os dados:', error);
                });
        }

        if (user && user.uid) {
            const db = getDatabase();
            comboRef.value = dbRef(db, `users/${user.uid}`);
            get(comboRef.value) // Use comboRef.value aqui
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        myData.value = snapshot.val();

                        // Defina os valores recuperados nos campos do formulário
                        address.value = myData.value.address;
                        phone.value = myData.value.phone;
                        storeDescription.value = myData.value.storeDescription;
                        facebook.value = myData.value.facebook;
                        instagram.value = myData.value.instagram;
                        storeCategory.value = myData.value.storeCategory
                    } else {
                        console.log('Usuário não encontrado');
                    }
                })
                .catch((error) => {
                    console.log('Erro ao obter os dados:', error);
                });
        }

        const handleImageUpload = async (event) => {
            const imageFile = event.target.files[0];
            if (!imageFile) return;

            try {
                const storage = getStorage();
                const inputId = event.target.id;

                const storageRefUser = storageRef(
                    storage,
                    `${user.uid}/${inputId}`
                );

                const uploadTask = await uploadBytes(storageRefUser, imageFile);
                const downloadURL = await getDownloadURL(uploadTask.ref);

                const db = getDatabase();
                if (inputId === 'userPhoto') {
                    myData.value.userPhotoUrl = downloadURL; // Salvar a URL da imagem em myData
                    await update(comboRef.value, { userPhotoUrl: downloadURL });
                } else if (inputId === 'storeBanner') {
                    myData.value.storeBannerUrl = downloadURL; // Salvar a URL da imagem em myData
                    await update(comboRef.value, { storeBannerUrl: downloadURL });
                }

                // Adicionar a URL da imagem ao array imageUrls
                imageUrls.value.push(downloadURL);

                msg.value = 'Imagem carregada com sucesso';
                tipo.value = 'success';
                setTimeout(() => {
                    msg.value = '';
                }, 3000);
            } catch (error) {
                console.error('Erro ao carregar a imagem:', error);
                msg.value = 'Erro ao carregar a imagem';
                tipo.value = 'error';
            }
        };


        const saveUserInfo = async () => {
            const db = getDatabase();
            const comboRef = dbRef(db, `users/${user.uid}`);

            const userData = {
                address: address.value,
                phone: phone.value,
                storeDescription: storeDescription.value,
                facebook: facebook.value,
                instagram: instagram.value,
                storeCategory: storeCategory.value,
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
            storesCategories,
            phone,
            address,
            facebook,
            storeCategory,
            instagram,
            comboRef,
            imageUrls,
            saveUserInfo,
            handleEditFunction,
            handleImageUpload,
        };
    },
}

</script>
<style lang="scss" scoped>
.cardProfile {
    padding: 1em;
    border-radius: 20px;
    box-shadow: 7px 10px 27px -3px rgba(0, 0, 0, 0.33);
    background-color: #e9e9e9;
    background-size: 300px;
    background-position-x: 8em;
    background-repeat: no-repeat;
    background-position-y: 21em;
    padding-bottom: 2em;

    .userInfo {
        .userPhoto {
            width: 100px;
            height: auto;
            border-radius: 100%;
            display: block;
            margin: 0 auto;
        }

        .userName {
            font-size: 26px;
            text-align: center;
            border-bottom: solid 3px #c0c0c084;
            line-height: 3em;
            margin-bottom: 30px;

            span {
                background-color: #fff;
                padding-inline: .2em;
                border-radius: 5px;
            }
        }
    }

    .formUserInfoContainer {
        .storeBannerContainer {
            margin-bottom: 2em;
            padding-bottom: 2em;
            border-bottom: solid 3px #c0c0c084;

            p {
                font-size: 20px;
                font-weight: bold;
            }

            .storeBanner {
                border-radius: 20px;
                width: 100%;
            }
        }

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

            .submitBtnContainer {
                .submitBtn {
                    background-color: var(--primary);
                    padding: .5em;
                    border-radius: 5px;
                    margin-inline: .5em;
                    margin-top: 10px;
                    transition: .5s;

                    &:disabled {
                        filter: saturate(50%);
                        cursor: default;
                    }

                    &:hover {
                        box-shadow: 0px 0px 10px 5px #ffb811b9;
                    }
                }
            }
        }

        .adminFunction {
            display: flex;
            justify-content: flex-end;

            button {
                background-color: #b8b8b8;
                padding: .5em;
                border-radius: 5px;
                transition: .5s;

                &:hover {
                    background-color: var(--primary);
                }

                &.inEdition {
                    background-color: var(--primary);
                    box-shadow: 0px 0px 10px 5px #ffb811b9;
                }
            }

        }
    }
}
</style>