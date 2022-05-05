<script setup></script>

<template>
  <div class="flex flex-col items-center mt-8">
    <div class="py-8">
      <span class="text-2xl font-semibold"> Create an account </span>
    </div>
    <input
      type="text"
      class="bg-slate-400 w-100 rounded-lg h-12 placeholder:font-light placeholder:text-white my-4"
      placeholder="Fullname" />
    <input
      type="email"
      class="bg-slate-400 rounded-lg h-12 placeholder:font-light placeholder:text-white my-4"
      placeholder="Email" />
    <input
      type="password"
      class="bg-slate-400 rounded-lg h-12 placeholder:font-light placeholder:text-white my-4"
      placeholder="Password" />
    <input
      type="tel"
      class="bg-slate-400 rounded-lg h-12 placeholder:font-light placeholder:text-white my-4"
      placeholder="Phone" />
    <input
      type="text"
      class="bg-slate-400 rounded-lg h-12 placeholder:font-light placeholder:text-white my-4"
      placeholder="Rol" />

    <div class="py-4">
      <input type="checkbox" />
      <span clas> Agree with terms and conditions</span>
    </div>
    <div>
      <button
        class="bg-slate-500 border-0 fs-bold hover:bg-slate-700 text-white fs-semibold rounded-xl w-40 h-12">
        Sign Up
      </button>
    </div>
    <div class="py-1">
      <span>Already on WAW? </span>
      <button type="submit" class="font-semibold">Sign in</button>
    </div>
  </div>
</template>
