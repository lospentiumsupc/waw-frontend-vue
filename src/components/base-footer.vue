<script setup>
import Dropdown from "primevue/dropdown";
import { ref } from "vue";

const navigation = [
  {
    label: "Company",
    items: [
      { label: "About" },
      { label: "Careers" },
      { label: "Advertising" },
      { label: "Small Business" },
    ],
  },
  {
    label: "Help",
    items: [
      { label: "Safety Center" },
      { label: "Knowledge Base" },
      { label: "Contact Us" },
    ],
  },
  {
    label: "Legal",
    items: [{ label: "Community Guidelines" }, { label: "Privacy & Terms" }],
  },
];

const languages = [
  { label: "English", code: "en_US" },
  { label: "Spanish", code: "es_PE" },
];
const selectedLang = ref(languages[0]);
</script>

<template>
  <footer class="p-8 flex justify-between bg-slate-50">
    <div class="space-y-4 flex flex-col">
      <span class="mb-4 text-2xl font-bold">WAW</span>
      <span class="text-sm font-light">© Future Leaders Inc., 2022</span>
    </div>
    <nav class="space-x-24 flex text-xs text-slate-800">
      <div
        v-for="group in navigation"
        :key="group.label"
        class="space-y-4 flex flex-col">
        <span class="font-medium">{{ group.label }}</span>
        <span v-for="link in group.items" :key="link.label">{{
          link.label
        }}</span>
      </div>
    </nav>
    <div class="flex flex-col">
      <span class="mb-4 text-sm font-light">Language</span>
      <Dropdown
        v-model="selectedLang"
        class="lang-selector w-32"
        panel-class="text-xs"
        :options="languages"
        option-label="label"
        :placeholder="selectedLang.label" />
    </div>
  </footer>
</template>

<style>
.lang-selector > span,
.lang-selector > div[role="button"] {
  @apply text-xs;
}
</style>
