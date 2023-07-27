<template>
    <div class="btnContainer">
        <button class="returnBtn" @click="voltarPagina">
            <i class="fa-solid fa-arrow-left-long"></i>{{ txtBtn }}
        </button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
    name: 'returnBtn',
    props: {
        txtBtn: {
            type: String,
            default: 'Voltar'
        }
    },
    methods: {
        voltarPagina() {
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped lang="scss">
.btnContainer {
    text-align: center;
    padding: .5em;

    .returnBtn {
        background-color: var(--primary);
        color: var(--dark);
        border-radius: 5px;
        padding: .3em .5em;
        transition: .5s;

        i {
            margin-right: .5em;
        }

        &:hover {
            background-color: var(--primary-alt);
            transform: scale(1.05);
        }
    }
}
</style>