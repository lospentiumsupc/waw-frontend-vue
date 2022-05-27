<script setup>
import InputText from "primevue/inputtext";
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="flex flex-col container max-w-md items-center mt-8 space-y-4">
      <div class="mb-6">
        <span class="text-2xl font-semibold">Change Password</span>
      </div>
      <span class="p-float-label w-full">
        <InputText
          id="password"
          v-model="password"
          type="password"
          class="rounded-xl w-full" />
        <label for="password">Password</label>
      </span>
      <span class="p-float-label w-full">
        <InputText
          id="password"
          v-model="password"
          type="password"
          class="rounded-xl w-full" />
        <label for="password">Repeat Password</label>
      </span>

      <div class="my-2 w-full">
        <button
          type="submit"
          class="w-full py-2 px-3 rounded-xl transition-colors text-white bg-slate-500 hover:bg-slate-700 font-semibold">
          Change Password
        </button>
      </div>
      <div class="my-2">
        <span>Click here to </span>
        <RouterLink to="/account/signin" class="font-semibold">
          Login
        </RouterLink>
      </div>
    </div>
  </div>
</template>
