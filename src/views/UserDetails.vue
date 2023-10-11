<template>
    <div class="wrapper">
        <Navbar />
        <header>
            <h2>Users</H2>
        </header>

        <div class="container" v-if="userDetails !== undefined">
            <h3>Add Grades for {{ userDetails.firstName }} {{ userDetails.lastName }}</h3>

            <div>
                <button @click="addNewEntry">New Entry</button>
                <button @click="submit"
                    :disabled="marksheet.find(x => x.subjectId === 0 || x.gradeId === 0) || marksheet.length === 0">Submit</button>
            </div>

            <div class="marksheet">
                <div class="marksheetItem" v-for="marksheetItem, index in marksheet" :key="index">
                    <div>
                        <label for="subject">Subject</label>
                        <select name="subject" id="subject" v-model="marksheetItem.subjectId">
                            <option
                                v-for="subject in allSubjects.filter((x: any) => marksheet.map(y => y.subjectId).includes(x.subjectId) === false || x.subjectId === marksheetItem.subjectId)"
                                :key="subject.subjectId" :value="subject.subjectId">
                                {{ subject.subjectName }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label for="grade">Grade</label>
                        <select name="grade" id="grade" v-model="marksheetItem.gradeId">
                            <option v-for="grade in allGrades" :key="grade.gradeId" :value="grade.gradeId">
                                {{ grade.gradeName }}
                            </option>
                        </select>
                    </div>
                    <button @click="marksheet.splice(index, 1)">Delete</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import Navbar from '@/components/Navbar.vue';
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
        subjectId: 0,
        subject: '',
        gradeId: 0,
        grade: ''
    })
}

async function submit() {
    for (const marksheetItem of marksheet.value) {
        marksheetItem.subject = allSubjects.value.find((x: any) => x.subjectId === marksheetItem.subjectId).subjectName
        marksheetItem.grade = allGrades.value.find((x: any) => x.gradeId === marksheetItem.gradeId).gradeName
    }

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
    const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/User/UserDetails/id?userid=${userId}`);

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
}

.marksheet {
    display: flex;
    flex-direction: column;

    .marksheetItem {
        display: grid;
        gap: 20px;

        grid-template-columns: 1fr 1fr auto;

        div{
            display: flex;
            gap: 10px;
        }

        button {
            margin: 0;
        }
    }
}
</style>