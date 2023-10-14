<template>
    <nav class="navbar">
        <ul>
            <li><router-link to="/dashboard">Home</router-link></li>
            <li><router-link to="/users">Users</router-link></li>
            <li><a @click="logout">Logout</a></li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
    localStorage.removeItem('user')
    router.push('/')
}
</script>

<style lang="scss" scoped>
nav {
    background-color: rgb(124, 13, 13);
    padding: 10px;
    margin-bottom: 10px;

    ul {
        list-style-type: none;
        display: flex;
        justify-content: space-around;
        align-items: center;

        li {
            a {
                text-decoration: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 10px;

                &:hover {
                    color: rgb(124, 13, 13);
                    background-color: white;
                }
            }
        }
    }
}
</style>