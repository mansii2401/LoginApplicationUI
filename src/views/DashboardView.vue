<template>
    <div class="wrapper">
        <Navbar />
        <header>
            <h2>Dashboard</H2>
        </header>

        <div class="dashboardView" v-if="userDetails !== undefined && userDetails !== undefined">
            <h2>Hello {{ userDetails.firstName }}!</h2>
            <div class="container">
                <div class="item">
                    <table>
                        <tr>
                            <th>
                                Employee Details
                            </th>

                        </tr>

                        <tr>
                            <td>
                                Full Name
                            </td>

                            <td>
                                {{ userDetails.firstName }} {{ userDetails.lastName }}
                            </td>

                        </tr>

                        <tr>
                            <td>
                                Email
                            </td>

                            <td>
                                {{ userDetails.userEmail }}
                            </td>

                        </tr>

                        <tr>
                            <td>
                                Role
                            </td>

                            <td>
                                {{ userDetails.role }}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue'

const router = useRouter()
const userDetails = ref<any>({})

onMounted(() => {
    userDetails.value = JSON.parse(localStorage.getItem('user') ?? "{}")
    if (userDetails.value.userId === undefined) {
        router.push('/')
    }
})

</script>

<style>
td,
table {
    border: 1px solid black;
    text-align: left;
    height: 40px;
    width: 100%;
    background-color: rgb(151, 228, 228);
}
</style>