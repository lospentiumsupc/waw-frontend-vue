<script setup>
import InputText from "primevue/inputtext";
import { $ref } from "vue/macros";
import { useRouter, RouterLink } from "vue-router";
import { AuthenticationService } from "../services/authentication.service";

const email = $ref("");
const password = $ref("");

const router = useRouter();
const auth = $ref(AuthenticationService.instance);

const handleLogin = () => {
  auth.login();
  router.push("/");
};
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="flex flex-col container max-w-md items-center mt-8 space-y-4">
      <div class="mb-6">
        <span class="text-2xl font-semibold">Welcome to WAW</span>
      </div>
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
      <div>
        <span class="font-semibold cursor-pointer text-slate-700"
          >Forgot password?</span
        >
      </div>
      <div class="my-2 w-full">
        <button
          type="submit"
          class="w-full py-2 px-3 rounded-xl transition-colors text-white bg-slate-500 hover:bg-slate-700 font-semibold"
          @click="handleLogin">
          Sign In
        </button>
      </div>
      <div class="my-2">
        <span>New to WAW? </span>
        <RouterLink to="/account/signup" class="font-semibold">
          Join for free now
        </RouterLink>
      </div>
    </div>
  </div>
</template>
