<template>
    <div class="loginView">
        <form @submit.prevent="onLoginFormSubmit">
            <label for="username">Username</label>
            <input type="text" name="username" v-model="username">

            <label for="password">Password</label>
            <input type="password" name="password" v-model="password">

            <input type="submit" value="Login">
        </form>

        <div>
            {{ username }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const username = ref()
const password = ref()


function onLoginFormSubmit() {
    fetch('https://verbose-carnival-jjqqgv49qj925pr4-5242.app.github.dev/api/Login', {
        method: "POST",
        body: JSON.stringify({
            "userName": username.value,
            "password": password.value
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(x=>x.json()).then(x=>alert(JSON.stringify(x)))
}

</script>