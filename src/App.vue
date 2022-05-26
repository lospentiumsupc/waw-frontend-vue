<script setup>
import BaseHeader from "@/core/components/base-header.vue";
import BaseFooter from "@/core/components/base-footer.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <BaseHeader />
  <div class="px-4 sm:px-8 py-4">
    <RouterView />
  </div>
  <BaseFooter />
</template>
