<template>
    <div class="wrapper">
        <Navbar />
        <header>
            <h2>Users</H2>
        </header>

        <div class="container" v-if="userDetails !== undefined">
            <h3>Add Grades for {{ userDetails.firstName }} {{ userDetails.lastName }}</h3>

            <div class="column">
                <UserScoreTable :id="userId.toString()" />
                <div>
                    <div>
                        <button @click="addNewEntry">New Entry</button>
                        <button @click="submit"
                            :disabled="marksheet.find(x => x.subject === '' || x.grade === '') || marksheet.length === 0">Submit</button>
                    </div>
                    <div class="marksheet">
                        <div class="marksheetItem" v-for="marksheetItem, index in marksheet" :key="index">
                            <div>
                                <label for="subject">Subject</label>
                                <select name="subject" id="subject" v-model="marksheetItem.subject">
                                    <option
                                        v-for="subject in allSubjects.filter((subject: any) => marksheet.map(y => y.subject).includes(subject) === false || subject === marksheetItem.subject)"
                                        :key="subject" :value="subject">
                                        {{ subject }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label for="grade">Grade</label>
                                <select name="grade" id="grade" v-model="marksheetItem.grade">
                                    <option v-for="grade in allGrades" :key="grade" :value="grade">
                                        {{ grade }}
                                    </option>
                                </select>
                            </div>
                            <button @click="marksheet.splice(index, 1)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import Navbar from '@/components/Navbar.vue';
import UserScoreTable from '@/components/UserScoreTable.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const userId = route.params.id;

const allSubjects = ref()
const allGrades = ref()
const userDetails = ref()

const marksheet = ref<any[]>([])

async function addNewEntry() {
    marksheet.value.push({
        subject: '',
        grade: ''
    })
}

async function submit() {
    const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/User/ScoreList`, {
        method: "POST",
        body: JSON.stringify({
            "userId": userId,
            "marksheet": marksheet.value
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const responseJson = await response.json()
    if (responseJson.result != null) {
        alert('Success')
        window.location.reload()
    }
    else {
        alert(`Error: ${responseJson.statusMessage}`)
    }
}

async function getSubjects() {
    const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/StaticData/subjects`);

    const responseJson = await response.json()

    allSubjects.value = responseJson
}

async function getGrades() {
    const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/StaticData/grades`);

    const responseJson = await response.json()

    allGrades.value = responseJson
}

async function getUserDetails() {
    const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/User/UserDetails/${userId}`);

    const responseJson = await response.json()

    if (responseJson.result != null) {
        userDetails.value = responseJson.result
    }
}

onMounted(async () => {
    await getGrades()
    await getSubjects()
    await getUserDetails()
})

</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    gap: 20px;

    button {
        margin: 10px;
    }

    .column {
        width: 80%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
}

.marksheet {
    display: flex;
    flex-direction: column;

    .marksheetItem {
        display: grid;
        gap: 20px;

        grid-template-columns: 1fr 1fr auto;

        div {
            display: flex;
            gap: 10px;
        }

        button {
            margin: 0;
        }
    }
}
</style>