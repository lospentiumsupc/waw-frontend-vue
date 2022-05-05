<script setup>
import Avatar from "primevue/avatar";
import { PrimeIcons } from "primevue/api";

const user = {
  fullName: "John Doe",
  location: "Lima, Peru",
  description:
    "Freelance UX/UI designer, 80+ projects in Web, Mobile (Android & iOS) and creative projects. Open to offers.",
};
</script>
<template>
  <div class="p-16 flex space-x-8 max-w-screen-2xl">
    <div class="w-3/4 space-y-8">
      <div class="flex flex-col rounded bg-white overflow-hidden">
        <div class="flex items-center w-full h-48 overflow-hidden">
          <img
            class="object-contain w-full"
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=916" />
        </div>
        <div class="flex">
          <div class="px-8 pb-8 relative">
            <span class="h-32 w-48 block" />
            <Avatar
              class="avatar-contain h-48 w-48 absolute inset-0 left-8 -top-16 border-8 border-white"
              image="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=640"
              shape="circle" />
          </div>
          <div class="flex flex-col p-8 w-full space-y-2">
            <div class="flex justify-between w-full">
              <span class="text-xl font-medium">{{ user.fullName }}</span>
              <div class="text-sm text-slate-700 space-x-1 flex items-center">
                <i :class="PrimeIcons.MAP_MARKER" class="text-sm"></i>
                <span>{{ user.location }}</span>
              </div>
            </div>
            <p class="w-full text-slate-700">
              {{ user.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="p-8 bg-white space-y-4">
        <span class="text-xl font-semibold block">About</span>
        <p class="text-lg text-slate-700">
          I'm more experienced in e-commerce web projects and mobile banking
          apps, but also like to work with creative projects, such as landing
          pages or unusual corporate websites.
        </p>
        <span class="uppercase font-bold text-slate-600 block">See more</span>
      </div>
    </div>
  </div>
</template>
<style>
.avatar-contain > img {
  @apply object-cover;
}
</style>
