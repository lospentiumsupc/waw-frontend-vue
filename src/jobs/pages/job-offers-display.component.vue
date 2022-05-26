<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import { JobsService } from "../services/jobs.service";
import { ref, onMounted } from "vue";

const service = new JobsService();
const jobs = ref([]);

onMounted(async () => {
  const response = await service.getAll();
  jobs.value = response.data;
});
</script>

<template>
  <DataTable
    :value="jobs"
    data-key="id"
    :paginator="true"
    paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rows="10"
    :rows-per-page-options="[5, 10, 15]"
    current-page-report-template="Showing {first} to {last} of {totalRecords} job offers"
    responsive-layout="scroll">
    <template #header>
      <div
        class="table-header flex flex-column md:flex-row md:justify-content-between">
        <h5 class="mb-2 md:m-0 p-as-md-center text-xl">Available job offers</h5>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText placeholder="Search..." />
        </span>
      </div>
    </template>
    <Column field="id" header="ID" :sortable="true"></Column>
    <Column field="title" header="Title" :sortable="true"></Column>
    <Column field="description" header="Description" :sortable="true"></Column>
    <Column field="salaryRange" header="Salary Range" :sortable="true"></Column>
    <Column header="Action">
      <Button label="Apply"></Button>
    </Column>
  </DataTable>
</template>
