<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Timeline from "primevue/timeline";
import { useJobs } from "../services/jobs.service";
import { ref, onMounted } from "vue";
import { PrimeIcons } from "primevue/api";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const service = useJobs();
const jobs = ref([]);

const confirm = useConfirm();
const toast = useToast();

const events = [
  { status: "Not applied" },
  { status: "Applied" },
  { status: "Accepted" },
  { status: "Rejected" },
];

const handleConfirmation = index => {
  confirm.require({
    header: "Confirmation",
    message: "Are you sure you want to apply for this job?",
    icon: PrimeIcons.EXCLAMATION_TRIANGLE,
    accept: () => {
      jobs.value[index].progress = "Applied";
      toast.add({
        severity: "success",
        summary: "Confirmed",
        detail: "You have succesfully applied for the job",
        life: 3000,
      });
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Cancelled",
        detail: "You have cancelled the application for the job",
        life: 3000,
      });
      close();
    },
  });
};

onMounted(async () => {
  const response = await service.getAll();
  jobs.value = response.data
    .filter(i => i.status)
    .map(i => ({ ...i, progress: "Not applied" }));
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
    <Column field="id" header="ID" :sortable="true" class="px-6 py-3 text-xs" />
    <Column
      field="title"
      header="Title"
      :sortable="true"
      class="px-6 py-3 text-xs" />
    <Column
      field="description"
      header="Description"
      :sortable="true"
      class="px-6 py-3 text-xs" />
    <Column
      field="salaryRange"
      header="Salary Range"
      :sortable="true"
      class="px-6 py-3 text-xs" />
    <Column field="progress" header="Progress" class="px-6 py-3 text-xs">
      <template #body="bodyprops">
        <Timeline :value="events">
          <template #marker="timelineprops">
            <span
              class="block w-5 h-5 bg-neutral-100 border border-stone-700"
              :class="{
                'bg-green-500':
                  bodyprops.data.progress === timelineprops.item.status,
              }"></span>
          </template>
          <template #content="props">
            {{ props.item.status }}
          </template>
        </Timeline>
      </template>
    </Column>
    <Column header="Action" class="px-6 py-3 text-xs">
      <template #body="props">
        <Button
          label="Apply"
          class="p-button-primary p-button-text"
          @click="handleConfirmation(props.index)">
        </Button>
      </template>
    </Column>
  </DataTable>
</template>

<style>
.p-timeline-event-opposite {
  display: none;
}
</style>
