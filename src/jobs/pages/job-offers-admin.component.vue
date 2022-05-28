<script setup>
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Dropdown from "primevue/dropdown";
import TextArea from "primevue/textarea";
import Dialog from "primevue/dialog";
import { PrimeIcons } from "primevue/api";
</script>

<template>
  <div>
    <div class="job-offers-admin">
      <Toolbar class="mb-4">
        <template #start>
          <Button
            label="New"
            :icon="PrimeIcons.PLUS"
            class="p-button-success mr-2"
            @click="openNew" />

          <Button
            label="Delete"
            :icon="PrimeIcons.TRASH"
            class="p-button-danger"
            :disabled="!selectedJobOffers || !selectedJobOffers.length"
            @click="confirmDeleteSelected" />
        </template>

        <template #end>
          <Button
            label="Export"
            :icon="PrimeIcons.UPLOAD"
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
        filter-display="row"
        :loading="loading"
        :row-hover="true"
        :global-filter-fields="['title']"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rows-per-page-options="[10, 15, 20]"
        current-page-report-template="Showing {first} to {last} of {totalRecords} jobOffers"
        responsive-layout="scroll">
        <template #header>
          <div
            class="flex flex-column md:flex-row md:justify-between md:align-items-center">
            <h5 class="mb-2 md:m-0 p-as-md-center text-xl">
              Job offers administrator
            </h5>
            <span class="block mt-2 md:mt-0 p-input-icon-left"
              ><i :class="PrimeIcons.SEARCH" />
              <InputText
                v-model="filters['global'].value"
                placeholder="Search..." />
            </span>
          </div>
        </template>
        <template #empty> No offers found. </template>
        <template #loading> Loading offers data. Please wait. </template>

        <Column selection-mode="multiple" :exportable="false" class="w-12">
        </Column>
        <Column
          field="id"
          header="Id"
          :sortable="true"
          class="px-6 py-3 text-xs w-48"></Column>

        <Column field="title" header="Title" class="px-6 py-3 text-xs w-48">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              v-tooltip.top.focus="'Hit enter key to filter'"
              type="text"
              class="p-column-filter"
              :placeholder="`Search by title - `"
              @keydown.enter="filterCallback()" />
          </template>
        </Column>
        <Column
          header="Image"
          field="image"
          header-class="w-40"
          class="px-6 py-3 text-xs">
          <template #body="slotProps">
            <img
              :src="slotProps.data.image"
              :alt="slotProps.data.image"
              class="shadow-2 w-full" />
          </template>
        </Column>
        <Column
          field="description"
          header="Description"
          :sortable="true"
          class="px-6 py-3 text-xs w-64"></Column>
        <Column
          field="salaryRange"
          header="Salary Range"
          :sortable="true"
          class="px-6 py-3 text-xs w-64">
        </Column>
        <Column
          field="status"
          header="Status"
          :sortable="true"
          class="px-6 py-3 text-xs w-48">
          <template #body="slotProps">
            <Tag
              v-if="slotProps.data.status === 'Published'"
              severity="success"
              >{{ slotProps.data.status }}</Tag
            >
            <Tag v-else severity="info">{{ slotProps.data.status }}</Tag>
          </template>
        </Column>

        <Column :exportable="false" class="w-32">
          <template #body="slotProps">
            <Button
              :icon="PrimeIcons.PENCIL"
              class="p-button-text p-button-rounded"
              @click="editJobOffer(slotProps.data)" />
            <Button
              :icon="PrimeIcons.TRASH"
              class="p-button-text p-button-rounded"
              @click="confirmDeleteJobOffer(slotProps.data)" />
          </template>
        </Column>
        <template #footer>
          In total there are {{ jobOffers ? jobOffers.length : 0 }} job offers
          registered in your account.
        </template>
        <template #paginatorstart>
          <Button
            type="button"
            :icon="PrimeIcons.REFRESH"
            class="p-button-text" />
        </template>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="jobOfferDialog"
      header="job offer Information"
      :modal="true"
      class="p-fluid mx-4 w-full sm:w-1/2">
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
          :icon="PrimeIcons.TIMES"
          class="p-button-text"
          @click="hideDialog" />
        <Button
          label="Save"
          :icon="PrimeIcons.CHECK"
          class="p-button-text"
          @click="saveJobOffer" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteJobOfferDialog"
      class="p-fluid mx-4 w-full sm:w-1/2"
      header="Confirm"
      :modal="true">
      <div class="confirmation-content">
        <i class="mr-3 text-3xl" :class="PrimeIcons.EXCLAMATION_TRIANGLE" />
        <span v-if="jobOffer">
          Are you sure you want to delete
          <span class="font-medium">{{ jobOffer.title }}</span>
        </span>
      </div>
      <template #footer>
        <Button
          label="No"
          :icon="PrimeIcons.TIMES"
          class="p-button-text"
          @click="deleteJobOfferDialog = false" />
        <Button
          label="Yes"
          :icon="PrimeIcons.CHECK"
          class="p-button-text"
          @click="deleteJobOffer" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteJobOffersDialog"
      class="p-fluid mx-4 w-full sm:w-1/2"
      header="Confirm"
      :modal="true">
      <div class="confirmation-content">
        <i class="mr-3 text-3xl" :class="PrimeIcons.EXCLAMATION_TRIANGLE" />
        <span v-if="jobOffer">
          Are you sure you want to delete the selected job offers?
        </span>
      </div>
      <template #footer>
        <Button
          label="No"
          :icon="PrimeIcons.TIMES"
          class="p-button-text"
          @click="deleteJobOffersDialog = false" />
        <Button
          label="Yes"
          :icon="PrimeIcons.CHECK"
          class="p-button-text"
          @click="deleteSelectedJobOffers" />
      </template>
    </Dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-duplicate-imports
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { JobsService } from "@/jobs/services/jobs.service";
import Tooltip from "primevue/tooltip";

export default {
  name: "JobOfferList",
  directives: {
    tooltip: Tooltip,
  },
  data() {
    return {
      jobOffers: [],
      jobOfferDialog: false,
      deleteJobOfferDialog: false,
      deleteJobOffersDialog: false,
      jobOffer: {},
      filters: {
        title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      loading: true,
      selectedJobOffers: [],
      submitted: false,
      statuses: [
        { label: "Published", value: "published" },
        { label: "Unpublished", value: "unpublished" },
      ],
    };
  },
  jobOffersService: null,
  created() {
    this.jobOffersService = new JobsService();
    this.jobOffersService.getAll().then(response => {
      this.jobOffers = response.data;
      // eslint-disable-next-line array-callback-return
      this.jobOffers.forEach(jobOffer => this.getDisplayableJobOffer(jobOffer));
      this.loading = false;
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
        image: displayableJobOffer.image,
        description: displayableJobOffer.description,
        salaryRange: displayableJobOffer.salaryRange,
        published: displayableJobOffer.status.label === "Published",
      };
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
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
          this.jobOffer.image =
            "https://unsplash.com/photos/T6fDN60bMWY/download?w=640";
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
      this.jobOffers = this.jobOffers.filter(v => v.id !== this.jobOffer.id);
      this.deleteJobOffersDialog = false;
      this.jobOffer = {};
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Job offer Deleted",
        life: 3000,
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
      this.selectedJobOffers = [];
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Job Offers Deleted",
        life: 3000,
      });
    },
  },
};
</script>
