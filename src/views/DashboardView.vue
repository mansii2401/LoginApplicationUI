<template>
   <body class="wrapper"> 
    <header>
        <h2>Dashboard</H2>
    </header>
    <navbar/>
    
<div class="dashboardView">
    <h2>Hello {{userDetails.firstName}}!</h2>
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
                {{userDetails.firstName}} {{userDetails.lastName}}
            </td>

        </tr>

        <tr>
            <td>
                Email
            </td>

            <td>
                {{userDetails.userEmail}}
            </td>

        </tr>

        <tr>
            <td>
                Role
            </td>

            <td>
                {{userDetails.role}}
            </td>

        </tr>

    </table>
    
<br>
<br>
    <button @click="logout" id="btn">Logout   </button>

    <!-- <button @click="user" id="btn">User   </button> -->
    
</div>
</div>
</div>

   </body>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
// // import navbar from '../navbar.vue';
// views:{
//         navbar

//     }

const router  = useRouter()
const userDetails  = ref<any>({})

function logout(){
    localStorage.removeItem('user')
    router.push('/')
}

// function user(){
    
//     router.push('/user')
// }


onMounted(()=>{
    userDetails.value = JSON.parse(localStorage.getItem('user') ?? "{}" )
    if (userDetails.value.id === undefined) {
        router.push('/')
    }

    // {
    //     "id": 1,
    //     "firstName": "Mansi",
    //     "lastName": "Rani",
    //     "userEmail": "mansi@gmail.com",
    //     "role": "Employee",
    //     "isStudent": false,
    //     "userId": 1
    // }
})

</script>

<style>
td,table {
  border: 1px solid black;
  text-align: left;
  height: 40px;
  width: 100%;
  background-color: rgb(151, 228, 228);
}

.container{
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }


    #btn{
        background-color: rgb(160, 157, 157);
    }
    



    
    

    
</style>