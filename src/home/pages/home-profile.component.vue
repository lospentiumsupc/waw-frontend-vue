<script setup>
import Avatar from "primevue/avatar";
import { PrimeIcons } from "primevue/api";
import { AuthenticationService } from "@/accounts/services/authentication.service";
import { onBeforeMount, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

const auth = ref(AuthenticationService.instance);
const user = ref(auth.value.getCurrentUser());

const router = useRouter();

onBeforeMount(() => {
  if (!auth.value.loggedIn) {
    router.push("/account/signin");
  }
});

watchEffect(() => {
  user.value = auth.value.getCurrentUser();
});
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
              {{ user.biography }}
            </p>
          </div>
        </div>
      </div>
      <div class="p-8 bg-white space-y-4">
        <span class="text-xl font-semibold block">About</span>
        <p class="text-lg text-slate-700">{{ user.about }}</p>
        <span class="uppercase font-bold text-slate-600 block">See more</span>
      </div>
      <div class="p-8 rounded bg-white space-y-4">
        <div class="flex">
          <span class="text-xl font-semibold block mr-2">Projects</span>
          <span class="text-xl text-slate-500 block"> 3 of 12</span>
        </div>
        <div class="flex space-x-4">
          <div class="flex flex-col space-y-4">
            <div class="overflow-hidden">
              <img
                src="https://unsplash.com/photos/T6fDN60bMWY/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8dXglMkZ1aSUyMGRlc2lnbnxlc3wwfHx8fDE2NTE3NTA5MDc&w=640"
                alt="work's image"
                class="w-full object-contain" />
            </div>
            <div class="flex flex-col space-y-2">
              <a class="font-medium text-slate-600"> Zara redisign concept </a>
              <span class="text-sm font-light text-slate-600">
                UX/UI Design - July 5, 2019
              </span>
            </div>
          </div>
          <div class="flex flex-col space-y-4">
            <div class="overflow-hidden">
              <img
                src="https://unsplash.com/photos/v9vII5gV8Lw/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8Z3JhcGhpYyUyMGRlc2lnbnxlc3wwfHx8fDE2NTE3NDc2Njc&w=640"
                alt="work's image"
                class="w-full object-contain" />
            </div>
            <div class="flex flex-col space-y-2">
              <a class="font-medium text-slate-600">
                SCTHON Event Brand Identity
              </a>
              <span class="text-sm font-light text-slate-600">
                Graphic Design - March 31, 2019
              </span>
            </div>
          </div>
          <div class="flex flex-col space-y-4">
            <div class="overflow-hidden">
              <img
                src="https://unsplash.com/photos/CGpifH3FjOA/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8Z3JhcGhpYyUyMGRlc2lnbnxlc3wwfHx8fDE2NTE3NDc2Njc&w=640"
                alt="work's image"
                class="w-full object-contain" />
            </div>
            <div class="flex flex-col space-y-2">
              <a class="font-medium text-slate-600"> Dzord Brand Identity</a>
              <span class="text-sm font-light text-slate-600">
                Graphic Design - April 4, 2016
              </span>
            </div>
          </div>
        </div>
        <span class="uppercase font-bold text-slate-600 block">
          Show all (12)
        </span>
      </div>
      <div class="p-8 bg-white space-y-4">
        <span class="text-xl font-semibold block">Experience</span>
        <div>
          <div class="flex space-x-4">
            <Avatar
              class="avatar-contain flex-shrink-0 !h-16 !w-16"
              image="https://unsplash.com/photos/gcsNOsPEXfs/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjUzNjM1MTI3&w=640"
              shape="circle" />
            <div class="flex flex-col w-full">
              <span class="p-2 text-base font-medium text-slate-900"
                >Freelance UX/UI Designer</span
              >
              <div class="spacey-2">
                <span class="p-2 text-sm text-slate-800">Self-employed</span>
                <span class="p-2 text-sm font-light text-slate-600"
                  >Around the world</span
                >
              </div>
              <div class="spacey-2">
                <span class="p-2 text-xs font-light text-slate-800"
                  >Jun 2016 — Present</span
                >
                <span class="p-2 text-xs font-semibold text-slate-600"
                  >5 years 10 months</span
                >
              </div>
              <p class="p-2 text-sm text-slate-900">
                Work with clients and studios as freelancer. Work in areas like:
                e-commerce web projects; creative landing pages; Android and iOS
                apps; corporate web sites and corporate identity.
              </p>
            </div>
          </div>
          <div class="flex space-x-4">
            <Avatar
              class="avatar-contain flex-shrink-0 !h-16 !w-16"
              image="https://unsplash.com/photos/hhUx08PuYpc/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTB8fHN0dWR5fGVzfDB8fHx8MTY1MzU4MzI1Nw&w=640"
              shape="circle" />
            <div class="flex flex-col w-full">
              <span class="p-2 text-base font-medium text-slate-900"
                >UX/UI designer</span
              >
              <div class="spacey-2">
                <span class="p-2 text-sm text-slate-800">Upwork</span>
                <span class="p-2 text-sm font-light text-slate-600"
                  >United States</span
                >
              </div>
              <div class="spacey-2">
                <span class="p-2 text-xs font-light text-slate-800"
                  >April 2015 — Aug 2016</span
                >
                <span class="p-2 text-xs font-semibold text-slate-600"
                  >2 years 4 months</span
                >
              </div>
              <p class="p-2 text-sm text-slate-900">
                New experience with Upwork system. Work in areas like: UX/UI
                design, graphic design, interaction design, UX research.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="p-8 bg-white space-y-4">
        <span class="text-xl font-semibold block">Education</span>
        <div>
          <div class="flex space-x-4">
            <Avatar
              class="avatar-contain flex-shrink-0 !h-16 !w-16"
              image="https://unsplash.com/photos/QJDzYT_K8Xg/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8c3R1ZHl8ZXN8MHx8fHwxNjUzNTgzMjU3&w=640"
              shape="circle" />
            <div class="flex flex-col w-full">
              <span class="p-2 text-base font-medium text-slate-900"
                >University of Arizona</span
              >
              <span class="p-2 text-xs font-light">2009 - 2013</span>
              <p class="p-2 text-sm text-slate-900">
                Bachelor's degree in Computer and Information Systems and
                Security/Information Assurance
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="p-8 bg-white space-y-4">
        <div class="flex flex-wrap py-2">
          <span class="text-xl font-semibold block">Comments</span>
          <div class="w-full md:w-full mb-2 mt-2 py-2">
            <textarea
              class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-light placeholder-gray-700 focus:outline-none focus:bg-white"
              name="body"
              placeholder="Type Your Comment"
              required=""></textarea>
          </div>
          <input
            type="submit"
            class="bg-white text-gray-900 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
            value="Post Comment" />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.avatar-contain > img {
  @apply object-cover;
}
</style>
