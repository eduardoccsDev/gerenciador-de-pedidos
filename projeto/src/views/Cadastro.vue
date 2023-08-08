<template>
    <div class="container">
        <div class="main">
            <h1>Cadastro</h1>
            <form class="form-login-register" @submit.prevent="register">
                <div class="inputContainer">
                    <label for="email">
                        <i class="fa-solid fa-envelope"></i>
                        E-mail
                    </label>
                    <input type="email" v-model="email" id="email" placeholder="Seu e-mail de cadastro" required />
                </div>
                <div class="inputContainer">
                    <label for="password">
                        <i class="fa-solid fa-lock"></i>
                        Senha
                    </label>
                    <input type="password" v-model="password" id="password" placeholder="Sua senha" required />
                </div>
                <div class="inputContainer">
                    <div class="buttons">
                        <button type="submit"><i class="fa-solid fa-arrow-right-to-bracket"></i> Cadastrar</button>
                        <button class="google" @click="singInWithGoogle">
                            <i class="fa-brands fa-google"></i>
                            Criar conta com o Google
                        </button>
                    </div>
                </div>
                <p class="error" v-if="errMsg">{{ errMsg }}</p>
                <div class="cadastrar">
                    Já possui uma conta?
                    <router-link to="/" class="buttonLink">
                        Faça login aqui.
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'vue-router';
import {
    getDatabase,
    ref as dbRef, // Renomeando para evitar conflito de nomes
    set, // Importando função para escrever no banco de dados
} from 'firebase/database';
const auth = getAuth();
const email = ref('');
const password = ref('');
const errMsg = ref();
const router = useRouter()

const registerUserInDatabase = (user) => {
    const uid = user.uid;

    const db = getDatabase();
    const userRef = dbRef(db, 'users/' + uid);
    set(userRef, {
        uid: uid,
        function: 'customer',
        // Outros dados possíveis
    });

    console.log('Usuário registrado no banco de dados!');
}

const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((userCredential) => {
            // console.log(auth.currentUser);
            registerUserInDatabase(userCredential.user);
            console.log('Cadastrado com sucesso!');
            router.push('/dashboard');
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        })

};
const singInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            // console.log(user);


            registerUserInDatabase(user);

            router.push('/dashboard');
        })
        .catch((error) => {
            console.error(error);
        })
}


</script>

<style scoped lang="scss">
.form-login-register {
    background-color: #fff;
    padding: 1em;
    border-radius: 10px;
    margin: 0 auto;
    width: 450px;
    box-shadow: 2px 2px 10px -5px #00000070;

    .inputContainer {
        margin-bottom: 1em;

        input {
            width: 100%;
            border-radius: 5px;
            border: solid 1px #1a1a1a44;
            height: 35px;
            padding-inline: .5em;

            &::placeholder {
                font-weight: 300;
                font-size: 16px;
            }

            &:focus-visible {
                outline: solid 2px var(--primary);
            }
        }

        label {
            color: var(--dark);
            font-size: 18px;
            margin-bottom: .5em;

            i {
                background-color: var(--primary);
                padding: .3em;
                border-radius: 5px;
            }
        }

        .buttons {
            display: flex;
            justify-content: space-between;

            button {
                background-color: var(--primary);
                padding: .3em .5em;
                border-radius: 5px;
                transition: .5s;
                border: solid 2px var(--primary);

                &:hover {
                    background-color: var(--primary-alt);
                    border: solid 2px var(--primary-alt);
                }

                &.google {
                    background-color: #fff;
                    border: solid 2px #1a1a1a;

                    i {
                        color: #4889F4;
                    }

                    &:hover {
                        background-color: #1a1a1a;
                        color: #fff;
                    }
                }
            }
        }
    }

    .cadastrar {
        text-align: center;

        a {
            text-decoration: none;
            color: var(--primary);
            transition: .5s;

            &:hover {
                color: var(--primary-alt);
            }
        }
    }

    .error {
        text-align: center;
        background-color: rgb(255, 144, 144);
        color: rgb(134, 29, 29);
        padding: .5em;
        border-radius: 5px;

    }
}
</style>  