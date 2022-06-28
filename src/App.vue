<script setup>
import Toast from "primevue/toast";
import { RouterView } from "vue-router";

import BaseHeader from "@/core/components/base-header.vue";
import BaseFooter from "@/core/components/base-footer.vue";
</script>

<template>
  <BaseHeader />
  <div class="px-4 sm:px-8 py-4">
    <RouterView />
  </div>
  <BaseFooter />
  <Toast />
</template>
