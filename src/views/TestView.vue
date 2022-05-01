<script setup>
import InputText from "primevue/inputtext";
import { ref } from "vue";

const username = ref("User");
</script>

<template>
  <div>
    <span>Hello, {{ username }}!</span>
    <InputText v-model="username" type="text" />
  </div>
</template>

<style scoped>
span {
  display: block;
  font-size: 2rem;
  margin-bottom: 1rem;
}
</style>
