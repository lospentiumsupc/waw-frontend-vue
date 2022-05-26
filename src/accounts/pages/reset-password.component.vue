<script setup>
import Button from "primevue/button";
</script>
<template>
  <div class="flex flex-col items-center w-100 space-y-4 0077B5">
    <span class="text-2xl font-semibold"> Forgot password? </span>
    <div class="flex flex-col w-1/2 space-y-4">
      <input type="password" placeholder="johndoe123" class="h-12" />
      <input type="password" placeholder="johndoe123" class="h-12" />
    </div>

    <Button label="Primary">Reset Password</Button>

    <div>
      <span class="">Confirm this action in the email we sent you </span>
    </div>
  </div>
</template>
