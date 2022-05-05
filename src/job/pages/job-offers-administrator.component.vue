<script setup>
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Dropdown from "primevue/dropdown";
import TextArea from "primevue/textarea";
</script>
<template>
  <div>
    <div class="job-offers-admin">
      <Toolbar class="mb-4">
        <template #start>
          <Button
            label="New"
            icon="pi pi-plus"
            class="p-button-success mr-2"
            @click="openNew" />

          <Button
            label="Delete"
            icon="pi pi-trash"
            class="p-button-danger"
            :disabled="!selectedJobOffers || !selectedJobOffers.length"
            @click="confirmDeleteSelected" />
        </template>

        <template #end>
          <Button
            label="Export"
            icon="pi pi-upload"
            class="p-button-help"
            @click="exportToCSV($event)" />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        v-model:selection="selectedJobOffers"
        :value="jobOffers"
        data-key="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rows-per-page-options="[10, 15, 20]"
        current-page-report-template="Showing {first} to {last} of {totalRecords} jobOffers"
        responsive-layout="scroll">
        <template #header>
          <div
            class="table-header flex flex-column md:flex-row md:justify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center text-xl">
              Job offers administrator
            </h5>
            <span class="p-input-icon-left"
              ><i class="pi pi-search" />
              <InputText
                v-model="filters['global'].value"
                placeholder="Search..." />
            </span>
          </div>
        </template>

        <Column
          selection-mode="multiple"
          :style="{ width: `3rem` }"
          :exportable="false">
        </Column>
        <Column
          field="id"
          header="Id"
          :sortable="true"
          :style="{ minWidth: `12rem` }"></Column>
        <Column
          field="title"
          header="Title"
          :sortable="true"
          :style="{ minWidth: `16rem` }">
        </Column>
        <Column
          field="description"
          header="Description"
          :sortable="true"
          :style="{ minWidth: `16rem` }"></Column>
        <Column
          field="salaryRange"
          header="Salary Range"
          :sortable="true"
          :style="{ minWidth: `16rem` }">
        </Column>
        <Column
          field="status"
          header="Status"
          :sortable="true"
          :style="{ minWidth: `12rem` }">
          <template #body="slotProps">
            <Tag
              v-if="slotProps.data.status === 'Published'"
              severity="success"
              >{{ slotProps.data.status }}</Tag
            >
            <Tag v-else severity="info">{{ slotProps.data.status }}</Tag>
          </template>
        </Column>

        <Column :exportable="false" :style="{ minWidth: `8rem` }">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-text p-button-rounded"
              @click="editJobOffer(slotProps.data)" />
            <Button
              icon="pi pi-trash"
              class="p-button-text p-button-rounded"
              @click="confirmDeleteJobOffer(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="jobOfferDialog"
      header="job offer Information"
      :modal="true"
      class="p-fluid"
      :style="{ width: `450px` }">
      <div class="field">
        <span class="p-float-label">
          <InputText
            id="title"
            v-model.trim="jobOffer.title"
            type="text"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !jobOffer.title }" />
          <label for="title">Title</label>
          <small v-if="submitted && !jobOffer.title" class="p-error"
            >Job offer title is required.</small
          >
        </span>
      </div>
      <div class="field">
        <span class="p-float-label">
          <TextArea
            id="description"
            v-model="jobOffer.description"
            :required="false"
            rows="2"
            cols="2" />
          <label for="description">Description</label>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <TextArea
            id="salaryRange"
            v-model="jobOffer.salaryRange"
            :required="false"
            rows="2"
            cols="2" />
          <label for="salaryRange">Salary Range</label>
        </span>
      </div>

      <div class="field">
        <Dropdown
          id="published"
          v-model="jobOffer.status"
          :options="statuses"
          option-label="label"
          placeholder="Select an Status">
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span>{{ slotProps.value.label }}</span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span>{{ slotProps.value }}</span>
            </div>
            <span v-else>{{ slotProps.placeholder }}</span>
          </template>
        </Dropdown>
      </div>

      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog" />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveJobOffer" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteJobOfferDialog"
      :style="{ width: `450px` }"
      header="Confirm"
      :modal="true">
      <div class="confirmation-content">
        <i
          class="pi pi-exclamation-triangle mr-3"
          :style="{ fontSize: `2rem` }" />
        <span v-if="jobOffer"
          >Are you sure you want to delete <b>{{ jobOffer.title }}</b></span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteJobOfferDialog = false" />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteJobOffer" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteJobOffersDialog"
      :style="{ width: `450px` }"
      header="Confirm"
      :modal="true">
      <div class="confirmation-content">
        <i
          class="pi pi-exclamation-triangle mr-3"
          :style="{ fontSize: `2rem` }" />
        <span v-if="selectedJobOffers"
          >Are you sure you want to delete the selected job offers?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteJobOffersDialog = false" />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedJobOffers" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { JobOffersApiService } from "../services/job-offers-api.service";
import { FilterMatchMode } from "primevue/api";

export default {
  name: "JobOfferList",
  data() {
    return {
      jobOffers: [],
      jobOfferDialog: false,
      deleteJobOfferDialog: false,
      deleteJobOffersDialog: false,
      jobOffer: {},
      selectedJobOffers: null,
      filters: {},
      submitted: false,
      statuses: [
        { label: "Published", value: "published" },
        { label: "Unpublished", value: "unpublished" },
      ],
      jobOffersService: null,
    };
  },
  created() {
    this.jobOffersService = new JobOffersApiService();
    this.jobOffersService.getAll().then(response => {
      this.jobOffers = response.data;
      // eslint-disable-next-line array-callback-return
      this.jobOffers.forEach(jobOffer => this.getDisplayableJobOffer(jobOffer));
      console.log(this.jobOffers);
    });
    this.initFilters();
  },
  methods: {
    getDisplayableJobOffer(jobOffer) {
      jobOffer.status = jobOffer.published
        ? this.statuses[0].label
        : this.statuses[1].label;
      return jobOffer;
    },
    getStorableJobOffer(displayableJobOffer) {
      return {
        id: displayableJobOffer.id,
        title: displayableJobOffer.title,
        description: displayableJobOffer.description,
        salaryRange: displayableJobOffer.salaryRange,
        published: displayableJobOffer.status.label === "Published",
      };
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
    findIndexById(id) {
      return this.jobOffer.findIndex(jobOffer => jobOffer.id === id);
    },
    openNew() {
      this.jobOffer = {};
      this.submitted = false;
      this.jobOfferDialog = true;
    },
    hideDialog() {
      this.jobOfferDialog = false;
      this.submitted = false;
    },
    saveJobOffer() {
      this.submitted = true;
      if (this.jobOffer.title.trim())
        if (this.jobOffer.id) {
          this.jobOffer = this.getStorableJobOffer(this.jobOffer);
          this.jobOffersService
            .update(this.jobOffer.id, this.jobOffer)
            .then(response => {
              this.jobOffers[this.findIndexById(response.data.id)] =
                this.getDisplayableJobOffer(response.data);
              this.$toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Job offer Updated",
                life: 3000,
              });
              console.log(response);
            });
        } else {
          this.jobOffer.id = 0;
          this.jobOffer = this.getStorableJobOffer(this.jobOffer);
          this.jobOffersService.create(this.jobOffer).then(response => {
            this.jobOffer = this.getDisplayableJobOffer(response.data);
            this.jobOffers.push(this.jobOffer);
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Job offer Created",
              life: 3000,
            });
            console.log(response);
          });
        }

      this.jobOfferDialog = false;
      this.jobOffer = {};
    },
    editJobOffer(jobOffer) {
      this.jobOffer = { ...jobOffer };
      this.jobOfferDialog = true;
    },
    confirmDeleteJobOffer(jobOffer) {
      this.jobOffer = jobOffer;
      this.deleteJobOfferDialog = true;
    },
    deleteJobOffer() {
      this.jobOffersService.delete(this.jobOffer.id).then(response => {
        this.jobOffers = this.jobOffers.filter(t => t.id !== this.jobOffer.id);
        this.deleteJobOfferDialog = false;
        this.jobOffer = {};
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Job offer Deleted",
          life: 3000,
        });
        console.log(response);
      });
    },
    exportToCSV() {
      this.$refs.dt.exportCSV();
    },
    confirmDeleteSelected() {
      this.deleteJobOffersDialog = true;
    },
    deleteSelectedJobOffers() {
      this.selectedJobOffers.forEach(jobOffer => {
        this.jobOffersService.delete(jobOffer.id).then(response => {
          this.jobOffers = this.jobOffers.filter(
            t => t.id !== this.jobOffer.id
          );
          console.log(response);
        });
      });
      this.deleteJobOffersDialog = false;
    },
  },
};
</script>
