<script setup>
import Card from "primevue/card";
import Button from "primevue/button";
import { ref, onMounted } from "vue";
import { CompaniesService } from "../services/companies.service";
import { PrimeIcons } from "primevue/api";
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import Rating from "primevue/rating";

const service = new CompaniesService();
const companies = ref([]);
const modalVisible = ref(false);
const currentCompany = ref({});
const confirm = useConfirm();

const fetchData = async () => {
  const response = await service.getAll();
  companies.value = response.data;
};

onMounted(fetchData);

const editCompany = item => {
  modalVisible.value = true;
  currentCompany.value = { ...item };
};

const create = () => editCompany({});

const closeEdit = () => {
  modalVisible.value = false;
  currentCompany.value = {};
};

const saveCompany = async () => {
  if (!currentCompany.value.name) return;
  if (!currentCompany.value.email) return;

  const isUpdate = !!currentCompany.value.id;

  if (isUpdate) {
    await service.update(currentCompany.value.id, currentCompany.value);
  } else {
    await service.create(currentCompany.value);
  }

  closeEdit();
  fetchData();
};

const deleteCompany = item => {
  confirm.require({
    header: "Confirmation",
    message: `Are you sure you want to delete ${item.name}`,
    icon: PrimeIcons.EXCLAMATION_TRIANGLE,
    accept: async () => {
      await service.delete(item.id);
      fetchData();
    },
  });
};
</script>

<template>
  <Toolbar class="p-4 flex flex-auto">
    <template #start>
      <h1 class="text-xl font-semibold">Associate Companies</h1>
    </template>
    <template #end>
      <div class="space-x-1 mr-4">
        <Button
          label="New"
          class="p-button-success"
          :icon="PrimeIcons.PLUS"
          icon-pos="right"
          @click="create" />
      </div>
    </template>
  </Toolbar>
  <div class="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
    <div v-for="company in companies" :key="company.id">
      <Card>
        <template #title>
          <h1 class="text-center">{{ company.name }}</h1>
        </template>
        <template #subtitle>
          <h2 class="text-center">
            {{ company.email }}
          </h2>
        </template>
        <template #content>
          <h3>
            {{ company.address }}
          </h3>
        </template>
        <template #footer>
          <div class="flex justify-between space-x-4">
            <Rating v-model="company.rating" :cancel="false"></Rating>
            <div class="flex justify-end space-x-4">
              <Button
                :icon="PrimeIcons.PENCIL"
                class="p-button-info p-button-rounded"
                @click="editCompany(company)" />

              <Button
                class="p-button-danger p-button-rounded"
                :icon="PrimeIcons.TRASH"
                @click="deleteCompany(company)" />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
  <Dialog
    v-model:visible="modalVisible"
    :header="!currentCompany.id ? 'Add company' : 'Edit company information'"
    :modal="true"
    class="w-1/2">
    <div class="flex flex-col mt-2 space-y-4">
      <span class="p-float-label">
        <InputText
          id="company-name"
          v-model="currentCompany.name"
          class="w-full"
          :required="true"
          type="text" />
        <label for="company-name">Name</label>
      </span>
      <span class="p-float-label">
        <InputText
          id="company-address"
          v-model="currentCompany.address"
          class="w-full"
          type="text" />
        <label for="company-address">Address</label>
      </span>
      <span class="p-float-label">
        <InputText
          id="company-email"
          v-model="currentCompany.email"
          class="w-full"
          type="email" />
        <label for="company-email">Email</label>
      </span>
    </div>
    <template #footer>
      <div class="space-x-1 justify-between">
        <Button
          label="Save"
          class="p-button-success p-button-text"
          @click="saveCompany" />
        <Button
          label="Cancel"
          class="p-button-danger p-button-text"
          @click="closeEdit" />
      </div>
    </template>
  </Dialog>
  <ConfirmDialog />
</template>
