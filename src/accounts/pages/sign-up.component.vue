<script setup>
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import ToggleButton from "primevue/togglebutton";
import useVuelidate from "@vuelidate/core";
import { required, email, sameAs, helpers } from "@vuelidate/validators";
import { PrimeIcons } from "primevue/api";
import { reactive, computed, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";

import { useAuth } from "../services/auth.service";

const auth = useAuth();
const router = useRouter();

const submitted = ref(false);
const state = reactive({
  fullName: "",
  preferredName: "",
  email: "",
  password: "",
  confirmPassword: "",
  birthdate: new Date(),
  checked: false,
});

const rules = computed(() => ({
  fullName: { required },
  preferredName: { required },
  email: { required, email },
  password: { required },
  confirmPassword: { sameAs: sameAs(state.password, "password") },
  birthdate: {
    required,
    age: helpers.withMessage(
      "You must have 18+ years to register an account",
      value => {
        const birthdate = new Date(value);
        const timeNow = new Date();
        return timeNow.getFullYear() - birthdate.getFullYear() >= 18;
      }
    ),
  },
  checked: {
    required,
    truthy: helpers.withMessage(
      "You must agree to the terms and conditions",
      value => Boolean(value)
    ),
  },
}));

const v$ = useVuelidate(rules, state);

const handleRegister = async () => {
  // Set this value to allow the template to show the errors
  submitted.value = true;

  const isValid = await v$.value.$validate();
  if (!isValid) {
    return;
  }

  // Create a copy so that we can delete props later
  const user = { ...state };
  // We don't need the checked state on the server
  delete user.confirmPassword;
  delete user.checked;
  const success = await auth.register(user);
  if (success) router.push("/account/signin");
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

      <div class="w-full">
        <span class="p-float-label w-full">
          <InputText
            id="signup_fullName"
            v-model="v$.fullName.$model"
            type="text"
            class="rounded w-full !bg-transparent"
            :class="{ 'p-invalid': v$.fullName.$invalid && submitted }"
            aria-describedby="signup_fullName-error" />
          <label
            for="signup_fullName"
            class="!bg-slate-100"
            :class="{ 'p-error': v$.fullName.$invalid && submitted }">
            Full Name
          </label>
        </span>
        <span v-if="v$.fullName.$error && submitted">
          <span
            v-for="(error, index) of v$.fullName.$errors"
            id="signup_fullName-error"
            :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="w-full">
        <span class="p-float-label w-full">
          <InputText
            id="signup_preferredName"
            v-model="v$.preferredName.$model"
            type="text"
            class="rounded w-full !bg-transparent"
            :class="{ 'p-invalid': v$.preferredName.$invalid && submitted }"
            aria-describedby="signup_preferredName-error" />
          <label
            for="signup_preferredName"
            class="!bg-slate-100"
            :class="{ 'p-error': v$.preferredName.$invalid && submitted }">
            How should we call you?
          </label>
        </span>
        <span v-if="v$.preferredName.$error && submitted">
          <span
            v-for="(error, index) of v$.preferredName.$errors"
            id="signup_preferredName-error"
            :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="w-full">
        <span class="p-float-label w-full">
          <InputText
            id="signup_email"
            v-model="v$.email.$model"
            type="email"
            class="rounded w-full !bg-transparent"
            :class="{ 'p-invalid': v$.email.$invalid && submitted }"
            aria-describedby="signup_email-error" />
          <label
            for="signup_email"
            class="!bg-slate-100"
            :class="{ 'p-error': v$.email.$invalid && submitted }">
            Email
          </label>
        </span>
        <span v-if="v$.email.$error && submitted">
          <span
            v-for="(error, index) of v$.email.$errors"
            id="signup_email-error"
            :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="w-full">
        <span class="p-float-label w-full">
          <InputText
            id="signup_password"
            v-model="v$.password.$model"
            type="password"
            class="rounded w-full !bg-transparent"
            :class="{ 'p-invalid': v$.password.$invalid && submitted }"
            aria-describedby="signup_password-error" />
          <label
            for="signup_password"
            class="!bg-slate-100"
            :class="{ 'p-error': v$.password.$invalid && submitted }">
            Password
          </label>
        </span>
        <span v-if="v$.password.$error && submitted">
          <span
            v-for="(error, index) of v$.password.$errors"
            id="signup_password-error"
            :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="w-full">
        <span class="p-float-label w-full">
          <InputText
            id="signup_confirmPassword"
            v-model="v$.confirmPassword.$model"
            type="password"
            class="rounded w-full !bg-transparent"
            :class="{ 'p-invalid': v$.confirmPassword.$invalid && submitted }"
            aria-describedby="signup_confirmPassword-error" />
          <label
            for="signup_confirmPassword"
            class="!bg-slate-100"
            :class="{ 'p-error': v$.confirmPassword.$invalid && submitted }">
            Confirm Password
          </label>
        </span>
        <span v-if="v$.confirmPassword.$error && submitted">
          <span
            v-for="(error, index) of v$.confirmPassword.$errors"
            id="signup_confirmPassword-error"
            :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="w-full">
        <span class="p-float-label w-full">
          <Calendar
            id="signup_birthdate"
            v-model="v$.birthdate.$model"
            selection-mode="single"
            input-class="rounded w-full !bg-transparent"
            class="w-full"
            :class="{ 'p-invalid': v$.birthdate.$invalid && submitted }"
            aria-describedby="signup_birthdate-error" />
          <label
            for="signup_birthdate"
            class="!bg-slate-100"
            :class="{ 'p-error': v$.birthdate.$invalid && submitted }">
            Confirm Password
          </label>
        </span>
        <span v-if="v$.birthdate.$error && submitted">
          <span
            v-for="(error, index) of v$.birthdate.$errors"
            id="signup_birthdate-error"
            :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="my-4">
        <ToggleButton
          v-model="v$.checked.$model"
          on-label="I agree with terms and conditions"
          off-label="I disagree with terms and conditions"
          :on-icon="PrimeIcons.CHECK"
          :off-icon="PrimeIcons.TIMES"
          aria-describedby="signup_checked-error" />
        <span
          v-if="v$.checked.$error && submitted"
          class="block text-center mt-1">
          <span
            v-for="(error, index) of v$.checked.$errors"
            id="signup_checked-error"
            :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
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
