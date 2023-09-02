<template>
    <div class="container">
        <div class="main">
            <h1>Restaurantes:</h1>
            <section class="storesContainer">
                <div v-for="(user, uid) in filteredUsers" :key="uid">
                    <router-link to="#">
                        <img class="storeImg" :src="user.userPhotoUrl || './img/no-photo-available.png'" :alt="user.nameStore">
                        <p class="storeName">{{user.nameStore}}</p>
                        <p class="storeCategory">{{user.storeCategory}}</p>
                    </router-link> 
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import { getAuth } from 'firebase/auth';
import { ref, computed } from 'vue';
import { getDatabase, ref as dbRef, get } from 'firebase/database';
export default {
    name: 'Lojas',
    data() {
        return {
        }
    },
    setup(props) {
        const usersStore = ref({});
        const auth = getAuth();
        const user = auth.currentUser;

        if (user && user.uid) {
            const db = getDatabase();
            const comboRef = dbRef(db, 'users');

            get(comboRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        // Converta o valor do snapshot para um objeto JavaScript
                        usersStore.value = snapshot.val();
                    } else {
                        console.log('Categorias não encontradas');
                    }
                })
                .catch((error) => {
                    console.log('Erro ao obter os dados:', error);
                });
        }

        // Filtrar os usuários com função igual a "store"
        const filteredUsers = computed(() => {
            const filtered = {};
            for (const uid in usersStore.value) {
                const user = usersStore.value[uid];
                if (user.function === 'store') {
                    filtered[uid] = user;
                }
            }
            return filtered;
        });

        return {
            filteredUsers,
        };
    },
}

</script>

<style scoped lang="scss">
.storesContainer{
    display: flex;
    gap: 50px;
    a{
        text-decoration: none;
        color: var(--dark);
        transition: .5s;

        &:hover{
            color: var(--primary);
        }
        .storeImg{
            border-radius: 100%;
            width: 120px;
            height: 120px;
            box-shadow: 0px 0px 10px -1px #00000052;
            margin-bottom: .5em;
        }
        .storeName, .storeCategory{
            text-align: center;
            margin: 0;
        }
        .storeCategory{
            background-color: var(--dark);
            color: #fff;
            width: 0 auto;
            border-radius: 5px;
        }
    }
}
</style>