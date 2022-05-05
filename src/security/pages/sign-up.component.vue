<script setup>
import InputText from "primevue/inputtext";
import ToggleButton from "primevue/togglebutton";
import { ref } from "vue";

const checked1 = ref(false);
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="flex flex-col container max-w-md items-center mt-8">
      <div class="py-6">
        <span class="text-2xl font-semibold">Create an account</span>
      </div>
      <span class="p-float-label w-full">
        <InputText id="firstname" type="text" class="rounded-xl my-4 w-full" />
        <label for="firstname">First name</label>
      </span>
      <span class="p-float-label w-full">
        <InputText id="lastname" type="text" class="rounded-xl my-4 w-full" />
        <label for="lastname">Last name</label>
      </span>
      <span class="p-float-label w-full">
        <InputText id="email" type="email" class="rounded-xl my-4 w-full" />
        <label for="email">Email</label>
      </span>
      <span class="p-float-label w-full">
        <InputText
          id="password"
          type="password"
          class="rounded-xl my-4 w-full" />
        <label for="password">Password</label>
      </span>
      <span class="p-float-label w-full">
        <InputText id="phone" type="tel" class="rounded-xl my-4 w-full" />
        <label for="phone">Phone</label>
      </span>
      <div class="py-4">
        <ToggleButton
          v-model="checked1"
          on-label="I agree with terms and conditions"
          off-label="I disagree with terms and conditions"
          on-icon="pi pi-check"
          off-icon="pi pi-times" />
      </div>
      <div class="py-2 w-full">
        <button
          type="submit"
          class="bg-slate-500 border-0 fs-bold hover:bg-slate-700 text-white fs-semibold rounded-2xl w-full h-12">
          Sign Up
        </button>
      </div>
      <div class="py-2">
        <span>Already on WAW?</span>
        <span type="button" class="font-semibold">Sign in</span>
      </div>
    </div>
  </div>
</template>
