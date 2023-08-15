<template>
    <Message :msg="msg" :tipo="tipo" v-show="msg" />
    <div class="editContainer">
        <div class="comboFormContainer">
            <form id="comboForm" @submit.prevent="updateCombo">
                <div class="rowForm">
                    <div class="inputContainer">
                        <label>
                            <i class="fa-solid fa-pen"></i>
                            Nome do combo:
                            <span>*</span>
                        </label>
                        <input type="text" required name="nameCombo" v-model="myData.nameCombo" placeholder="Nome do combo">
                    </div>
                    <div class="inputContainer">
                        <label>
                            <i class="fa-solid fa-brazilian-real-sign"></i>
                            Preço do combo:
                            <span>*</span>
                        </label>
                        <input type="number" required name="priceCombo" v-model="myData.priceCombo"
                            placeholder="Preço do combo">
                    </div>
                    <div class="inputContainer">
                        <label>
                            <i class="fa-solid fa-burger"></i>
                            Escolha a carne do combo:
                            <span>*</span>
                        </label>
                        <select id="carne" name="hamburger_meat" required v-model="myData.hamburger_meat">
                            <option value="" disabled>Selecione o tipo de carne</option>
                            <option v-for="carne in productsStock.nomeCarne" :key="carne" :value="carne">
                                {{ carne }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="rowForm">
                    <div class="inputContainer">
                        <label>
                            <i class="fa-solid fa-droplet"></i>
                            Escolha o molho do combo:
                            <span>*</span>
                        </label>
                        <select id="molho" name="sauce" required v-model="myData.sauce">
                            <option value="" selected disabled>Selecione o molho</option>
                            <option v-for="molho in productsStock.nomeMolho" :key="molho" :value="molho">
                                {{ molho }}
                            </option>
                        </select>
                    </div>
                    <div class="inputContainer">
                        <label>
                            <i class="fa-solid fa-bread-slice"></i>
                            Escolha o pão do combo:
                            <span>*</span>
                        </label>
                        <select id="pao" name="bread" required v-model="myData.bread">
                            <option value="" selected disabled>Selecione o pão</option>
                            <option v-for="pao in productsStock.nomePao" :key="pao" :value="pao">
                                {{ pao }}
                            </option>
                        </select>
                    </div>
                    <div class="inputContainer">
                        <label for="imgCombo">
                            <i class="fa-solid fa-image"></i>
                            Imagem do combo:
                        </label>
                        <input id="imgCombo" type="file" @change="handleImageChange" accept="image/*">
                    </div>
                </div>
                <div class="rowForm">
                    <div class="inputContainer">
                        <label for="opcionais" id="opcionaisTtitle"><i class="fa-solid fa-plus"></i> Opcionais do
                            combo:</label>
                        <div class="opcionaisContainer">
                            <div class="checkBoxContainer" v-for="opcional in productsStock.nomeOpcional" :key="opcional">
                                <input type="checkbox" :id="opcional" name="oprional" v-model="myData.optional"
                                    :checked="myData.optional.includes(opcional)" :value="opcional">
                                <label class="optionL" :for="opcional">{{ opcional }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="inputContainer">
                        <label for="acompanhamentos" id="acompanhamentoTitle"><i class="fa-solid fa-bowl-food"></i>
                            Acompanhamentos do combo:</label>
                        <div class="opcionaisContainer  listModel">
                            <div class="checkBoxContainer" v-for="acompanhamento in productsStock.nomeAcompanhamento"
                                :key="acompanhamento.name">
                                <input type="checkbox" :id="acompanhamento.name" name="accompaniments"
                                    v-model="myData.accompaniments"
                                    :value="acompanhamento.name + ' - ' + acompanhamento.qtdItem"
                                    :checked="myData.accompaniments.includes(acompanhamento.name)">
                                <label class="optionL" :for="acompanhamento.name">{{ acompanhamento.name }} - {{
                                    acompanhamento.qtdItem }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="inputContainer">
                        <label for="bebida" id="bebidaTitle"><i class="fa-solid fa-beer-mug-empty"></i> bebidas do
                            combo:</label>
                        <div class="opcionaisContainer">
                            <div class="checkBoxContainer" v-for="bebida in productsStock.nomeBebida" :key="bebida.name">
                                <input type="checkbox" :id="bebida.name" name="drinks" v-model="myData.drinks"
                                    :value="bebida.name + ' - ' + bebida.qtdItem"
                                    :checked="myData.drinks.includes(bebida.name)">
                                <label class="optionL" :for="bebida.name">{{ bebida.name }} - {{ bebida.qtdItem }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rowForm">
                    <div class="inputContainer">
                        <label for="description"><i class="fa-solid fa-message"></i> Descrição:</label>
                        <textarea id="description" v-model="myData.description"
                            placeholder="Descrição do combo (opcional)"></textarea>
                    </div>
                </div>
                <div class="btnContainer">
                    <button type="submit" class="submitBtn"><i class="fa-regular fa-floppy-disk"></i>Atualizar
                        combo</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { getAuth } from 'firebase/auth';
import { ref } from 'vue';
import { getDatabase, ref as dbRef, get, set } from 'firebase/database';
import { useRoute } from 'vue-router';
import Message from './Message.vue';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
export default {
    name: 'editComboForm',
    components: {
        Message
    },
    data() {
        return {
        }
    },
    setup(props) {
        const msg = ref(null);
        const tipo = ref(null);
        const myData = ref({});
        const productsStock = ref({});
        const route = useRoute();

        const auth = getAuth();
        const user = auth.currentUser;


        if (user && user.uid) {
            const db = getDatabase();
            const comboRef = dbRef(db, `stores/${user.uid}/availableCombos/${route.params.id}`);
            get(comboRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        myData.value = snapshot.val();
                    } else {
                        console.log('Combo não encontrado');
                    }
                })
                .catch((error) => {
                    console.log('Erro ao obter os dados:', error);
                });

            // Recuperar os dados de productStock

            const productStockRef = dbRef(db, `stores/${user.uid}/productStock`);
            get(productStockRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        productsStock.value = snapshot.val();
                    } else {
                        console.log('Dados de productStock não encontrados');
                    }
                })
                .catch((error) => {
                    console.log('Erro ao obter os dados de productStock:', error);
                });
        };
        let selectedImage = null; // Variável para armazenar temporariamente a imagem selecionada

        // Adicione esse método para lidar com a mudança na seleção da imagem
        const handleImageChange = (event) => {
            selectedImage = event.target.files[0];
        };

        // Atualiza o combo, considerando a nova imagem, se houver
        const updateCombo = () => {
            if (user && user.uid) {
                const db = getDatabase();
                const comboRef = dbRef(db, `stores/${user.uid}/availableCombos/${route.params.id}`);

                // Prepare the data to update
                const updatedComboData = {
                    nameCombo: myData.value.nameCombo,
                    priceCombo: myData.value.priceCombo,
                    hamburger_meat: myData.value.hamburger_meat,
                    sauce: myData.value.sauce,
                    bread: myData.value.bread,
                    optional: myData.value.optional,
                    accompaniments: myData.value.accompaniments,
                    drinks: myData.value.drinks,
                    description: myData.value.description
                };

                // Se uma nova imagem foi selecionada, atualize-a no Storage
                if (selectedImage) {
                    const storage = getStorage();
                    const imageFolderName = myData.value.nameCombo.replace(/\s+/g, '-').toLowerCase();
                    const storageReference = storageRef(storage, `featuredImageCombo/${imageFolderName}/${selectedImage.name}`);

                    uploadBytes(storageReference, selectedImage)
                        .then(() => {
                            return getDownloadURL(storageReference);
                        })
                        .then(imageURL => {
                            updatedComboData.imageURL = imageURL;

                            // Atualização do combo com os dados e a URL da imagem
                            set(comboRef, updatedComboData)
                                .then(() => {
                                    msg.value = 'Combo atualizado com sucesso!';
                                    tipo.value = 'success';
                                    setTimeout(() => {
                                        msg.value = '';
                                        tipo.value = '';
                                    }, 3000);
                                })
                                .catch((error) => {
                                    console.error('Erro ao atualizar o combo:', error);
                                });
                        })
                        .catch(error => {
                            console.error('Erro ao enviar imagem:', error);
                        });
                } else {
                    // Mantém a URL existente da imagem
                    updatedComboData.imageURL = myData.value.imageURL;

                    // Atualiza apenas os outros campos
                    set(comboRef, updatedComboData)
                        .then(() => {
                            msg.value = 'Combo atualizado com sucesso!';
                            tipo.value = 'success';
                            setTimeout(() => {
                                msg.value = '';
                                tipo.value = '';
                            }, 3000);
                        })
                        .catch((error) => {
                            console.error('Erro ao atualizar o combo:', error);
                        });
                }
            }
        };

        return {
            msg,
            tipo,
            myData,
            productsStock,
            handleImageChange,
            updateCombo, // Nome corrigido da função
            comboId: route.params.id
        };
    },
}
</script>

<style lang="scss" scoped>
.rowForm {
    display: flex;
    justify-content: space-between;
}

.comboFormContainer {
    background-color: #E9E9E9;
    padding: 1em;
    border-radius: 20px;
    margin-bottom: 2em;

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
        }
    }

    .btnContainer {
        display: block;
        margin: 0 auto;
        text-align: center;
        margin-block: .5em;

        button {
            background-color: var(--primary);
            color: var(--dark);
            border-radius: 5px;
            transition: .5s;
            padding: .3em;

            &:hover {
                background-color: var(--light);
            }

            i {
                margin-right: .5em;
            }
        }

    }

    .opcionaisContainer {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #fff;
        padding: .5em;
        border-radius: 5px;
        min-height: 200px;
        max-height: 200px;
        overflow-y: scroll;

        .checkBoxContainer {
            margin-right: 1em;

            input {
                margin-right: .5em;
            }
        }
    }

}
</style>