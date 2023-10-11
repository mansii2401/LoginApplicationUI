<template>
    <div class="wrapper">
        <Navbar />
        <header>
            <h2>Users</H2>
        </header>

        <div class="container">
            <div class="usersView">
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Is Student</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in allUsers" :key="user.userId">
                            <td>{{ user.userName }}</td>
                            <td>{{ user.firstName }}</td>
                            <td>{{ user.lastName }}</td>
                            <td>{{ user.userEmail }}</td>
                            <td>{{ user.isStudent }}</td>
                            <td>
                                <router-link :to="{ name: 'userDetails', params: { id: user.userId } }"
                                    v-if="user.isStudent">
                                    View
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Navbar from '@/components/Navbar.vue';
import { onMounted, ref } from 'vue';

const allUsers = ref()

onMounted(async () => {
    const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/User/UserDetails`);

    const responseJson = await response.json()

    if (responseJson.result != null) {
        allUsers.value = responseJson.result
    }
    else {
        alert(`Error: ${responseJson.statusMessage}`)
    }

});


</script>
