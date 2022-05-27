<script setup>
import InputMask from "primevue/inputmask";
import InputText from "primevue/inputtext";
import ToggleButton from "primevue/togglebutton";
import { PrimeIcons } from "primevue/api";
import { $ref } from "vue/macros";
import { AuthService } from "../services/auth.service";
import { useRouter, RouterLink } from "vue-router";

const checked = $ref(false);
const fullname = $ref("");
const username = $ref("");
const email = $ref("");
const password = $ref("");
const phone = $ref("");

const auth = $ref(AuthService.instance);
const router = useRouter();

const handleRegister = () => {
  auth.login();
  router.push("/");
};
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="flex flex-col container max-w-md items-center mt-8 space-y-4">
      <div class="mb-6">
        <span class="text-2xl font-semibold">Create an account</span>
      </div>
      <span class="p-float-label w-full">
        <InputText
          id="fullname"
          v-model="fullname"
          type="text"
          class="rounded-xl w-full" />
        <label for="fullname">Full Name</label>
      </span>
      <span class="p-float-label w-full">
        <InputText
          id="username"
          v-model="username"
          type="text"
          class="rounded-xl w-full" />
        <label for="username">How should we call you?</label>
      </span>
      <span class="p-float-label w-full">
        <InputText
          id="email"
          v-model="email"
          type="email"
          class="rounded-xl w-full" />
        <label for="email">Email</label>
      </span>
      <span class="p-float-label w-full">
        <InputText
          id="password"
          v-model="password"
          type="password"
          class="rounded-xl w-full" />
        <label for="password">Password</label>
      </span>
      <span class="p-float-label w-full">
        <InputMask
          id="phone"
          v-model="phone"
          mask="999 999 999"
          class="rounded-xl w-full" />
        <label for="phone">Phone Number</label>
      </span>
      <div class="my-4">
        <ToggleButton
          v-model="checked"
          on-label="I agree with terms and conditions"
          off-label="I disagree with terms and conditions"
          :on-icon="PrimeIcons.CHECK"
          :off-icon="PrimeIcons.TIMES" />
      </div>
      <div class="my-2 w-full">
        <button
          type="submit"
          class="w-full py-2 px-3 rounded-xl transition-colors text-white bg-slate-500 hover:bg-slate-700 font-semibold"
          @click="handleRegister">
          Sign Up
        </button>
      </div>
      <div class="my-2">
        <span>Already on WAW? </span>
        <RouterLink to="/account/signin" class="font-semibold">
          Sign In
        </RouterLink>
      </div>
    </div>
  </div>
</template>
