<script setup>
import InputText from "primevue/inputtext";
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="flex flex-col container max-w-md items-center mt-8 space-y-4">
      <div class="mb-6">
        <span class="text-2xl font-semibold">Forgot Password?</span>
      </div>
      <span class="p-float-label w-full">
        <InputText
          id="email"
          v-model="email"
          type="email"
          class="rounded-xl w-full" />
        <label for="email">Email</label>
      </span>

      <div class="my-2 w-full">
        <button
          type="submit"
          class="w-full py-2 px-3 rounded-xl transition-colors text-white bg-slate-500 hover:bg-slate-700 font-semibold">
          Send
        </button>
      </div>
      <div class="my-2">
        <span>follow the instructions that will be sent by mail </span>
      </div>
      <div>
        <RouterLink to="/account/changepassword" class="font-semibold">
          Change Password
        </RouterLink>
      </div>
    </div>
  </div>
</template>
