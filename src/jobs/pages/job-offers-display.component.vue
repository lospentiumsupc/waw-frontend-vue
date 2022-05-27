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
    responsive-layout="scroll"
    class="rounded overflow-hidden">
    <template #header>
      <div
        class="table-header flex flex-column md:flex-row md:justify-content-between">
        <h2 class="mb-2 md:m-0 p-as-md-center text-xl">Available job offers</h2>
      </div>
    </template>
    <Column field="id" header="ID" :sortable="true" />
    <Column field="title" header="Title" :sortable="true" />
    <Column field="description" header="Description" :sortable="true" />
    <Column field="salaryRange" header="Salary Range" :sortable="true" />
    <Column header="Action">
      <template #body>
        <Button label="Apply" class="p-button-primary p-button-text"></Button>
      </template>
    </Column>
  </DataTable>
</template>
