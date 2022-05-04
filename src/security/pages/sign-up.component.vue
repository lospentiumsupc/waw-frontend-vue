<script setup></script>

<template>
  <div class="flex flex-col items-center w-100 space-y-4">
    <span class="text-2xl font-semibold"> Create an account </span>
    <div class="flex flex-col w-full space-y-4">
      <input type="text" placeholder="Fullname" class="h-12" />
      <input type="email" placeholder="Email" class="h-12" />
      <input type="password" placeholder="Password" class="h-12" />
      <input type="tel" placeholder="Phone" class="h-12" />
      <input type="text" placeholder="Role" class="h-12" />
    </div>
    <div>
      <input type="checkbox" />
      <span clas> Agree with terms and conditions</span>
    </div>
    <button class="">Sign Up</button>
    <div>
      <span>Already on WAW? </span>
      <span class="font-semibold"> Sign in </span>
    </div>
  </div>
</template>
