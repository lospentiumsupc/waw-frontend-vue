<script setup>
import Card from "primevue/card";
import Button from "primevue/button";
import { ref, onMounted } from "vue";
import { CompaniesService } from "../services/companies.service";
import { PrimeIcons } from "primevue/api";

const service = new CompaniesService();
const companies = ref([]);

onMounted(async () => {
  const response = await service.getAll();
  companies.value = response.data;
  console.log(companies.value);
});
</script>

<template>
  <h1 class="m-4">Associate Companies</h1>
  <div class="flex flex-wrap m-4">
    <div v-for="company in companies" :key="company.id" class="w-1/2 p-4">
      <Card>
        <template #title>
          <h1>{{ company.name }}</h1>
        </template>
        <template #subtitle>
          <h2>
            {{ company.email }}
          </h2>
        </template>
        <template #content>
          <h3>
            {{ company.address }}
          </h3>
        </template>
        <template #footer>
          <div class="flex justify-end">
            <Button
              :icon="PrimeIcons.PENCIL"
              class="p-button-success p-button-rounded mr-4" />
            <Button
              class="p-button-success p-button-rounded mr-4"
              :icon="PrimeIcons.TRASH" />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: x-large;
  font-weight: 500;
  text-align: center;
}
</style>
