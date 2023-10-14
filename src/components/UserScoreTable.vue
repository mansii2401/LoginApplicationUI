<template>
    <div class="userScoreTable">
        <table>
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="marksheetItem, index in marksheet" :key="index">
                    <td>{{ marksheetItem.subject }}</td>
                    <td>{{ marksheetItem.grade }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const marksheet = ref<any[]>([])

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const userId = props.id


onMounted(async ()=>{
    const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/User/ScoreList/${userId}`);

    const responseJson = await response.json()

    if (responseJson.result != null) {
        marksheet.value = responseJson.result.marksheet
    }
    else {
        // alert(`Error: ${responseJson.statusMessage}`)
    }

})
</script>