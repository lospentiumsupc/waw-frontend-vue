<script setup>
import InputText from "primevue/inputtext";
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { GlobalAuthService } from "../services/auth.service";

const auth = GlobalAuthService;
const router = useRouter();

const user = ref({
  email: "",
  password: "",
});

const handleLogin = async () => {
  const success = await auth.login(user.value.email);
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
      <span class="p-float-label w-full">
        <InputText
          id="signin_email"
          v-model="user.email"
          type="email"
          class="rounded w-full !bg-transparent" />
        <label for="signin_email" class="!bg-slate-100">Email</label>
      </span>
      <span class="p-float-label w-full">
        <InputText
          id="signin_password"
          v-model="user.password"
          type="password"
          class="rounded w-full !bg-transparent" />
        <label for="signin_password" class="!bg-slate-100">Password</label>
      </span>
      <div>
        <RouterLink to="/account/resetpassword" class="font-semibold">
          Forgot password?
        </RouterLink>
      </div>
      <div class="my-2 w-full">
        <button
          type="submit"
          class="w-full py-2 px-3 rounded transition-colors text-white bg-slate-500 hover:bg-slate-700 font-semibold">
          Sign In
        </button>
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
