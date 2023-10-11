<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <header>
    Login Application UI
  </header> -->

  <RouterView />
</template>

<style scoped lang="scss">
header {
  font-size: larger;
}
</style>

<style lang="scss">
head, body {
  padding: 0;
  margin: 0;
  min-height: 100vh;
  background-color: hsl(290, 34%, 77%);
}

.wrapper {
  height: 100vh;
  width: 100vw;  
}

#btn,
#us,
#pw {
  background-color: rgb(160, 157, 157);
}

h2 {
  text-align: center;
}

.container {
  width: 100vw;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>
