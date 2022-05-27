<script setup>
import InputText from "primevue/inputtext";
import ToggleButton from "primevue/togglebutton";
import { PrimeIcons } from "primevue/api";
import { ref } from "vue";
import { GlobalAuthService } from "../services/auth.service";
import { useRouter, RouterLink } from "vue-router";

const auth = GlobalAuthService;
const router = useRouter();

const user = ref({
  fullName: "",
  preferredName: "",
  email: "",
  password: "",
});
const checked = ref(false);

const handleRegister = async () => {
  const success = await auth.register(user.value);
  if (success) router.push("/");
};
</script>

<template>
  <div class="flex justify-center items-center">
    <form
      class="flex flex-col container max-w-md items-center mt-8 space-y-4"
      @submit.prevent="handleRegister">
      <div class="mb-6">
        <span class="text-2xl font-semibold">Create an account</span>
      </div>
      <span class="p-float-label w-full">
        <InputText
          id="signup_fullname"
          v-model="user.fullName"
          type="text"
          class="rounded w-full !bg-transparent" />
        <label for="signup_fullname" class="!bg-slate-100">Full Name</label>
      </span>
      <span class="p-float-label w-full">
        <InputText
          id="signup_preferredName"
          v-model="user.preferredName"
          type="text"
          class="rounded w-full !bg-transparent" />
        <label for="signup_preferredName" class="!bg-slate-100">
          How should we call you?
        </label>
      </span>
      <span class="p-float-label w-full">
        <InputText
          id="signup_email"
          v-model="user.email"
          type="email"
          class="rounded w-full !bg-transparent" />
        <label for="signup_email" class="!bg-slate-100">Email</label>
      </span>
      <span class="p-float-label w-full">
        <InputText
          id="signup_password"
          v-model="user.password"
          type="password"
          class="rounded w-full !bg-transparent" />
        <label for="signup_password" class="!bg-slate-100">Password</label>
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
          class="w-full py-2 px-3 rounded transition-colors text-white bg-slate-500 hover:bg-slate-700 font-semibold">
          Sign Up
        </button>
      </div>
      <div class="my-2">
        <span>Already on WAW? </span>
        <RouterLink to="/account/signin" class="font-semibold">
          Sign In
        </RouterLink>
      </div>
    </form>
  </div>
</template>
