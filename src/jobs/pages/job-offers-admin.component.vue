<script setup>
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import InputText from "primevue/inputtext";
import InputSwitch from "primevue/inputswitch";
import TextArea from "primevue/textarea";
import Dialog from "primevue/dialog";
import {
  PrimeIcons,
  FilterMatchMode,
  FilterOperator,
  ToastSeverity,
} from "primevue/api";
import { useToast } from "primevue/usetoast";
import { onMounted, ref } from "vue";
import { useJobs } from "@/jobs/services/jobs.service";

const toastService = useToast();

const jobsService = useJobs();
const offers = ref([]);
const loading = ref(false);

/** @type {import("vue").Ref<import("primevue/datatable").default>} */
const datatable = ref();
/** @type {import("vue").Ref<any[]>} */
const selection = ref();
/** @type {import("vue").Ref<import("primevue/datatable").DataTableFilterMeta>} */
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  title: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
});

/** @type {import("vue").Ref<any>} */
const currentOffer = ref(null);
const dialogVisible = ref(false);
const submitted = ref(false);

const deleteDialogVisible = ref(false);
/** @type {import("vue").Ref<any[]>} */
const pendingDeletion = ref();

const fetchData = async () => {
  selection.value = null;
  loading.value = true;
  const res = await jobsService.getAll();
  offers.value = res.data;
  loading.value = false;
};

const isBlank = field => {
  if (currentOffer.value === null) return false;
  return submitted.value && !currentOffer.value[field];
};

const updateItem = item => {
  currentOffer.value = { ...item };
  dialogVisible.value = true;
  submitted.value = false;
};

const createItem = () => updateItem({});

const cancelDialog = () => {
  currentOffer.value = null;
  dialogVisible.value = false;
};

const submitItem = async item => {
  const isUpdate = !!item.id;
  const type = isUpdate ? "update" : "create";

  submitted.value = true;

  if (isBlank("title")) return;
  if (isBlank("salaryRange")) return;

  let res = null;

  try {
    if (isUpdate) {
      res = await jobsService.update(item.id, item);
      offers.value = offers.value.map(current => {
        if (current.id === item.id) return res.data;
        return current;
      });
    } else {
      res = await jobsService.create(item);
      offers.value.push(res.data);
    }

    toastService.add({
      severity: ToastSeverity.SUCCESS,
      summary: "Success",
      detail: `Item ${type}d successfully`,
      life: 3000,
    });

    cancelDialog();
  } catch (err) {
    toastService.add({
      severity: ToastSeverity.ERROR,
      summary: "Failed",
      detail: `There was an error while trying to ${type} the item`,
      life: 10000,
    });
  }
};

const cancelDelete = () => {
  deleteDialogVisible.value = false;
  pendingDeletion.value = null;
};

const confirmDelete = items => {
  if (!Array.isArray(items)) {
    return confirmDelete([items]);
  }
  deleteDialogVisible.value = true;
  pendingDeletion.value = items;
};

const deleteItems = async () => {
  try {
    await Promise.all(
      pendingDeletion.value.map(item => {
        return jobsService.delete(item.id);
      })
    );
    toastService.add({
      severity: ToastSeverity.SUCCESS,
      summary: "Success",
      detail: "Items deleted successfully",
      life: 3000,
    });
  } catch (err) {
    toastService.add({
      severity: ToastSeverity.ERROR,
      summary: "Failed",
      detail: "There was an error while trying to delete the items",
      life: 10000,
    });
  }
  await fetchData();
  cancelDelete();
};

const exportCSV = () => datatable.value.exportCSV();

onMounted(() => fetchData());
</script>

<template>
  <div>
    <Toolbar class="mb-4">
      <template #start>
        <div class="space-x-2">
          <Button
            label="New"
            :icon="PrimeIcons.PLUS"
            class="p-button-success"
            @click="createItem()" />
          <Button
            label="Delete"
            :icon="PrimeIcons.TRASH"
            class="p-button-danger"
            :disabled="selection === null || selection?.length === 0"
            @click="confirmDelete(selection)" />
        </div>
      </template>

      <template #end>
        <Button
          label="Export"
          :icon="PrimeIcons.UPLOAD"
          class="p-button-help"
          @click="exportCSV()" />
      </template>
    </Toolbar>

    <DataTable
      ref="datatable"
      v-model:selection="selection"
      v-model:filters="filters"
      :global-filter-fields="['title']"
      filter-display="menu"
      :loading="loading"
      data-key="id"
      :value="offers"
      :paginator="true"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rows-per-page-options="[10, 15, 20]"
      current-page-report-template="Showing {first} to {last} of {totalRecords} job offers"
      responsive-layout="scroll"
      :show-gridlines="true"
      :row-hover="true"
      :rows="10">
      <template #header>
        <div
          class="flex flex-col md:flex-row md:justify-between md:items-center">
          <h5 class="text-xl mb-2 md:mb-0 md:mr-2">Active offers</h5>
          <div>
            <span class="p-input-icon-left">
              <i :class="PrimeIcons.SEARCH"></i>
              <InputText
                v-model="filters['global'].value"
                class="rounded"
                type="text"
                placeholder="Search..." />
            </span>
          </div>
        </div>
      </template>

      <template #empty>No offers were found.</template>

      <template #loading>Loading...</template>

      <Column
        selection-mode="multiple"
        header-class="w-12"
        :exportable="false" />

      <Column field="title" header="Title" class="px-6 py-3 text-xs w-48">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Search by title"
            @keydown.enter="filterCallback()" />
        </template>
        <template #filterclear="{ filterCallback }">
          <Button
            type="button"
            :icon="PrimeIcons.TIMES"
            class="p-button-secondary"
            @click="filterCallback()" />
        </template>
        <template #filterapply="{ filterCallback }">
          <Button
            type="button"
            :icon="PrimeIcons.CHECK"
            class="p-button-success"
            @click="filterCallback()" />
        </template>
      </Column>

      <Column
        field="image"
        header="Image"
        header-class="w-40"
        class="px-6 py-3 text-xs">
        <template #body="{ data }">
          <img :src="data.image" class="w-full" />
        </template>
      </Column>

      <Column
        field="description"
        header="Description"
        :sortable="false"
        class="px-6 py-3 text-xs w-64" />

      <Column
        ref="salaryRange"
        field="salaryRange"
        header="Salary Range"
        :sortable="true"
        class="px-6 py-3 text-xs w-64" />

      <Column
        field="published"
        header="Status"
        :sortable="true"
        class="px-6 py-3 text-xs w-48">
        <template #body="{ data }">
          <Tag v-if="data.published" severity="success">Published</Tag>
          <Tag v-else severity="info">Unpublished</Tag>
        </template>
      </Column>

      <Column :exportable="false" class="w-32">
        <template #body="{ data }">
          <Button
            :icon="PrimeIcons.PENCIL"
            class="p-button-text p-button-rounded"
            @click="updateItem(data)" />
          <Button
            :icon="PrimeIcons.TRASH"
            class="p-button-text p-button-rounded"
            @click="confirmDelete(data)" />
        </template>
      </Column>

      <template #footer>
        Found {{ offers.length ?? 0 }} offers in your account
      </template>

      <template #paginatorstart>
        <Button
          type="button"
          :icon="PrimeIcons.REFRESH"
          class="p-button-text"
          @click="fetchData()" />
      </template>
    </DataTable>

    <Dialog
      v-model:visible="dialogVisible"
      header="Create new offer"
      :modal="true"
      class="p-fluid mx-4 w-full sm:w-1/2">
      <div class="my-2">
        <div>
          <span class="p-float-label">
            <InputText
              id="dialog-title"
              v-model.trim="currentOffer.title"
              type="text"
              required="true"
              autofocus
              class="rounded"
              :class="{ 'p-invalid': isBlank('title') }" />
            <label for="dialog-title">Title</label>
          </span>
          <small v-if="isBlank('title')" class="p-error">Required</small>
        </div>
        <div class="mt-4">
          <span class="p-float-label">
            <InputText
              id="dialog-image-url"
              v-model.trim="currentOffer.image"
              type="text"
              class="rounded" />
            <label for="dialog-image-url">Image URL</label>
          </span>
        </div>
        <div class="mt-4">
          <span class="p-float-label">
            <TextArea
              id="dialog-description"
              v-model.trim="currentOffer.description"
              class="rounded"
              rows="3" />
            <label for="dialog-description">Description</label>
          </span>
        </div>
        <div class="mt-2">
          <span class="p-float-label">
            <InputText
              id="dialog-salary-range"
              v-model.trim="currentOffer.salaryRange"
              type="text"
              required="true"
              class="rounded"
              :class="{ 'p-invalid': isBlank('salaryRange') }" />
            <label for="dialog-salary-range">Salary Range</label>
          </span>
          <small v-if="isBlank('salaryRange')" class="p-error">Required</small>
        </div>
        <div class="mt-4">
          <label class="mr-2" for="dialog-published">Published</label>
          <InputSwitch id="dialog-published" v-model="currentOffer.published" />
        </div>
      </div>

      <template #footer>
        <Button
          label="Cancel"
          :icon="PrimeIcons.TIMES"
          class="p-button-text"
          @click="cancelDialog()" />
        <Button
          label="Save"
          :icon="PrimeIcons.CHECK"
          class="p-button-text"
          @click="submitItem(currentOffer)" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteDialogVisible"
      class="p-fluid mx-4 w-full sm:w-1/2"
      header="Delete"
      :modal="true">
      <div class="flex items-center">
        <i class="mr-3 text-3xl" :class="PrimeIcons.EXCLAMATION_TRIANGLE"></i>
        <span>
          Are you sure you want to delete
          <span class="font-medium">
            <template v-if="pendingDeletion.length === 1">
              {{ pendingDeletion[0].title }}
            </template>
            <template v-else>{{ pendingDeletion.length }} items</template>
          </span>
          <span>?</span>
        </span>
      </div>

      <template #footer>
        <Button
          label="Cancel"
          :icon="PrimeIcons.TIMES"
          class="p-button-info"
          @click="cancelDelete()" />
        <Button
          label="Delete"
          :icon="PrimeIcons.TRASH"
          class="p-button-danger"
          @click="deleteItems()" />
      </template>
    </Dialog>
  </div>
</template>
