<script setup>
import InputText from "primevue/inputtext";
import { reactive, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { required, email } from "@vuelidate/validators";
import { useAuth } from "../services/auth.service";
import useVuelidate from "@vuelidate/core";

const auth = useAuth();
const router = useRouter();

const submitted = ref(false);
const state = reactive({
  email: "",
  password: "",
});

const rules = {
  email: { required, email },
  password: { required },
};

const v$ = useVuelidate(rules, state);

const handleLogin = async () => {
  // Set this value to allow the template to show the errors
  submitted.value = true;

  const isValid = await v$.value.$validate();
  if (!isValid) {
    return;
  }

  const success = await auth.login(state.email, state.password);
  if (success) router.push("/");
};
</script>

<template>
  <div class="flex justify-center items-center">
    <form
      class="flex flex-col container max-w-md items-center mt-8 space-y-4"
      @submit.prevent="handleLogin">
      <div class="mb-6">
        <span class="text-2xl font-semibold">Welcome to WAW</span>
      </div>

      <div class="w-full">
        <span class="p-float-label w-full">
          <InputText
            id="signin_email"
            v-model="v$.email.$model"
            type="email"
            class="rounded w-full !bg-transparent"
            :class="{ 'p-invalid': v$.email.$invalid && submitted }"
            aria-describedby="signin_email-error" />
          <label
            for="signin_email"
            class="!bg-slate-100"
            :class="{ 'p-error': v$.email.$invalid && submitted }">
            Email
          </label>
        </span>
        <span v-if="v$.email.$error && submitted">
          <span
            v-for="(error, index) of v$.email.$errors"
            id="signin_email-error"
            :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="w-full">
        <span class="p-float-label w-full">
          <InputText
            id="signin_password"
            v-model="v$.password.$model"
            type="password"
            class="rounded w-full !bg-transparent"
            :class="{ 'p-invalid': v$.password.$invalid && submitted }"
            aria-describedby="signin_password-error" />
          <label
            for="signin_password"
            class="!bg-slate-100"
            :class="{ 'p-error': v$.password.$invalid && submitted }">
            Password
          </label>
        </span>
        <span v-if="v$.password.$error && submitted">
          <span
            v-for="(error, index) of v$.password.$errors"
            id="signin_password-error"
            :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="my-2 w-full">
        <button
          type="submit"
          class="w-full py-2 px-3 rounded transition-colors text-white bg-slate-500 hover:bg-slate-700 font-semibold">
          Sign In
        </button>
      </div>

      <div>
        <RouterLink to="/account/resetpassword" class="font-semibold">
          Forgot password?
        </RouterLink>
      </div>

      <div class="my-2">
        <span>New to WAW? </span>
        <RouterLink to="/account/signup" class="font-semibold">
          Join for free now
        </RouterLink>
      </div>
    </form>
  </div>
</template>
