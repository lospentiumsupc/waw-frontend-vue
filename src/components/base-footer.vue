<script setup>
import Dropdown from "primevue/dropdown";
import { ref } from "vue";

const languages = [
  { label: "English", code: "en_US" },
  { label: "Spanish", code: "es_PE" },
];
const selectedLang = ref(languages[0]);
</script>

<template>
  <footer class="py-8 px-16 flex justify-between bg-slate-50">
    <div class="space-y-4 flex flex-col">
      <span class="mb-4 text-2xl font-bold">WAW</span>
      <span class="text-sm font-light">© Future Leaders Inc., 2022</span>
    </div>
    <nav class="space-x-24 flex text-xs text-slate-800">
      <div class="space-y-4 flex flex-col">
        <span>About</span>
        <span>Careers</span>
        <span>Advertising</span>
        <span>Small Business</span>
      </div>
      <div class="space-y-4 flex flex-col">
        <span>Safety Center</span>
        <span>Knowledge Base</span>
        <span>Contact Us</span>
      </div>
      <div class="space-y-4 flex flex-col">
        <span>Community Guidelines</span>
        <span>Privacy & Terms</span>
      </div>
    </nav>
    <div class="flex flex-col">
      <span class="mb-4 text-sm font-light">Language</span>
      <Dropdown
        v-model="selectedLang"
        class="text-xs"
        :options="languages"
        option-label="label"
        :placeholder="selectedLang.label" />
    </div>
  </footer>
</template>
