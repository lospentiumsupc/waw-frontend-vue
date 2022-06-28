<script setup>
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import ToggleButton from "primevue/togglebutton";
import useVuelidate from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import { PrimeIcons } from "primevue/api";
import { reactive } from "vue";
import { useRouter, RouterLink } from "vue-router";

import { useAuth } from "../services/auth.service";

const auth = useAuth();
const router = useRouter();

const state = reactive({
  fullName: "",
  preferredName: "",
  email: "",
  password: "",
  confirmPassword: "",
  birthdate: new Date(),
  checked: false,
});

const rules = {
  fullName: { required },
  preferredName: { required },
  email: { required, email },
  password: { required },
  confirmPassword: { sameAs: sameAs(state.password) },
  birthdate: { required },
  checked: { required },
};

const v$ = useVuelidate(rules, state);

const handleRegister = async () => {
  // Create a copy so that we can delete props later
  const user = { ...state };

  const isValid = await v$.value.$validate();
  if (!isValid) {
    console.log("Invalid form", user);
    return;
  }

  // We don't need the checked state on the server
  delete user.confirmPassword;
  delete user.checked;
  const success = await auth.register(user);
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
          v-model="v$.fullName.$model"
          type="text"
          class="rounded w-full !bg-transparent" />
        <label for="signup_fullname" class="!bg-slate-100">Full Name</label>
      </span>
      <span class="p-float-label w-full">
        <InputText
          id="signup_preferredName"
          v-model="v$.preferredName.$model"
          type="text"
          class="rounded w-full !bg-transparent" />
        <label for="signup_preferredName" class="!bg-slate-100">
          How should we call you?
        </label>
      </span>
      <span class="p-float-label w-full">
        <InputText
          id="signup_email"
          v-model="v$.email.$model"
          type="email"
          class="rounded w-full !bg-transparent" />
        <label for="signup_email" class="!bg-slate-100">Email</label>
      </span>
      <span class="p-float-label w-full">
        <InputText
          id="signup_password"
          v-model="v$.password.$model"
          type="password"
          class="rounded w-full !bg-transparent" />
        <label for="signup_password" class="!bg-slate-100">Password</label>
      </span>
      <span class="p-float-label w-full">
        <InputText
          id="signup_confirmPassword"
          v-model="v$.confirmPassword.$model"
          type="password"
          class="rounded w-full !bg-transparent" />
        <label for="signup_confirmPassword" class="!bg-slate-100">
          Confirm Password
        </label>
      </span>
      <span class="p-float-label w-full">
        <Calendar
          id="signup_birthdate"
          v-model="v$.birthdate.$model"
          selection-mode="single"
          input-class="rounded w-full !bg-transparent"
          class="w-full" />
        <label for="signup_birthdate" class="!bg-slate-100">Birthdate</label>
      </span>
      <div class="my-4">
        <ToggleButton
          v-model="v$.checked.$model"
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
