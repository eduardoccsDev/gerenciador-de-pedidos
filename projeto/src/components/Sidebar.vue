<template>
    <aside :class="`${is_expanded && 'is-expanded'}`">
        <div class="logo">
            <router-link to="/">
                <img src="/img/logo_circle_t.png" alt="logo">
            </router-link>
        </div>
        <div class="menu-toggle-wrap">
            <button class="menu-toggle" @click="ToggleMenu">
                <span class="icons">
                    <i class="fa-solid fa-angle-right"></i>
                </span>
            </button>
        </div>
        <h3>Menu</h3>
        <div class="menu">
            <router-link to="/" class="buttonLink">
                <span class="icons">
                    <i class="fa-solid fa-house"></i>
                </span>
                <span class="text">
                    Home
                </span>
            </router-link>
            <router-link to="/sobre" class="buttonLink">
                <span class="icons">
                    <i class="fa-solid fa-eye"></i>
                </span>
                <span class="text">
                    Sobre
                </span>
            </router-link>
            <router-link to="/pedidos" class="buttonLink">
                <span class="icons">
                    <i class="fa-solid fa-boxes-stacked"></i>
                </span>
                <span class="text">
                    Pedidos
                </span>
            </router-link>
            <router-link to="/administracao" class="buttonLink">
                <span class="icons">
                    <i class="fa-solid fa-gears"></i>
                </span>
                <span class="text">
                    Administração
                </span>
            </router-link>
            <router-link to="/contato" class="buttonLink">
                <span class="icons">
                    <i class="fa-solid fa-address-book"></i>
                </span>
                <span class="text">
                    Contato
                </span>
            </router-link>
        </div>
        <div class="flex"></div>
        <div class="menu">
            <router-link to="/configurações" class="buttonLink">
                <span class="icons">
                    <i class="fa-solid fa-gear"></i>
                </span>
                <span class="text">
                    Configurações
                </span>
            </router-link>
        </div>
    </aside>
</template>

<script setup>
import { ref } from "vue"

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
    is_expanded.value = !is_expanded.value
    localStorage.setItem("is_expanded", is_expanded.value)
}
</script>

<style lang="scss" scoped>
aside {
    display: flex;
    flex-direction: column;
    width: calc(2rem + 32px);
    min-height: 100vh;
    overflow: hidden;
    padding: 1rem;

    background-color: var(--dark);
    color: var(--light);

    transition: 0.2s ease-out;
    .flex {
        flex: 1 1 0;
    }
    .logo {
        margin-bottom: 1rem;

        img {
            width: 2.5rem;
            background-color: var(--light);
            border-radius: 100%;
        }
    }
    .menu-toggle-wrap {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
        position: relative;
        top: 0;
        transition: 0.2s ease-out;
        .menu-toggle {
            transition: 0.2s ease-out;
            .icons i {
                font-size: 1.5rem;
                background-color: var(--gray);
                padding: .1em .3em;
                border-radius: 100%;
                color: var(--light);
                transition: 0.2s ease-out;
            }
            &:hover {
                .icons i {
                    color: var(--primary);
                    transform: translateX(0.5rem);
                }
            }
        }
    }
    h3,
    .buttonLink .text {
        opacity: 0;
        transition: 0.3s ease-out;
    }
    h3 {
        color: var(--gray);
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
    }
    .menu {
        margin: 0 -1rem;
        .buttonLink {
            display: flex;
            align-items: center;
            text-decoration: none;

            padding: 0.5rem 1rem;
            transition: 0.2s ease-out;
            .icons i {
                font-size: 2rem;
                color: var(--light);
                transition: 0.2s ease-out;
            }
            .text {
                color: var(--light);
                transition: 0.2s ease-out;
            }
            &:hover,
            &.router-link-exact-active {
                background-color: var(--dark-alt);
                .icons i,
                .text {
                    color: var(--primary);
                }
            }
            &.router-link-exact-active {
                border-right: 3px solid var(--primary);
            }
        }
    }
    &.is-expanded {
        width: var(--sidebar-width);
        .menu-toggle-wrap {
            top: -3rem;
            .menu-toggle {
                transform: rotate(-180deg);
            }
        }
        h3,
        .buttonLink .text {
            opacity: 1;
        }
        .buttonLink {
            .icons i {
                margin-right: 1rem;
            }
        }
    }
    @media(max-width: 768px) {
        position: fixed;
        z-index: 99;
    }
}
</style>