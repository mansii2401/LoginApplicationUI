<template>
    <div class="wrapper">
        <h2>LOGIN</h2>

        <div class="container">
            <div class="loginView">
                <form @submit.prevent="onLoginFormSubmit">
                    <label for="username">Username </label>
                    <input type="text" id="us" name="username" v-model="username">
                    <br>
                    <br>
                    <br>

                    <label for="password">Password </label>
                    <input type="password" id="pw" name="password" v-model="password">
                    <br>
                    <br>
                    <div>
                        <input type="submit" id="btn" value="Login">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref()
const password = ref()

const router = useRouter()


async function onLoginFormSubmit() {
    const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/Login`, {
        method: "POST",
        body: JSON.stringify({
            "userName": username.value,
            "password": password.value
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const responseJson = await response.json()
    if (responseJson.result != null) {
        localStorage.setItem('user', JSON.stringify(responseJson.result))
        router.push('/dashboard')
    }
    else {
        alert(`Error: ${responseJson.statusMessage}`)
    }

}

</script>

<style>
.loginView {
    border: 1px solid black;
    border-radius: 5px;
    height: 200px;
    box-sizing: border-box;
    padding-top: 20px;
    padding-left: 8px;
    padding-right: 8px;
    box-shadow: 0 0 2em hsl(231deg 62% 94%);
    background-color: hsl(250, 27%, 52%)
}
</style>