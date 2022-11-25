<script setup>
import Avatar from "primevue/avatar";
import { PrimeIcons } from "primevue/api";
import { useAuth } from "@/accounts/services/auth.service";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { toLocaleMonth } from "@/core/utils/months";
import Rating from "primevue/rating";

const auth = useAuth();

const router = useRouter();
const profile = ref();

onBeforeMount(() => {
  if (!auth.loggedIn) {
    router.push("/account/signin");
  }
});

/**
 * @param {Date} date
 */
const getDisplayableDate = date => {
  if (!(date instanceof Date)) {
    throw new Error(`Invalid date, got ${typeof date}: ${date}`);
  }

  const month = toLocaleMonth(date, true);
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

/**
 * @param {Date} startDate
 * @param {Date} endDate
 */
const getDisplayableExpDates = (startDate, endDate) => {
  if (!(startDate instanceof Date)) {
    throw new Error(
      `Invalid start date, got ${typeof startDate}: ${startDate}`
    );
  }

  const msgs = { start: "", end: "Present" };

  msgs.start = `${toLocaleMonth(startDate)} ${startDate.getFullYear()}`;
  if (!(endDate instanceof Date)) {
    msgs.end = `${toLocaleMonth(endDate)} ${startDate.getFullYear()}`;
  }

  return `${msgs.start} — ${msgs.end}`;
};
</script>
<template>
  <div v-if="auth.loggedIn" class="p-16 flex space-x-8 max-w-screen-2xl">
    <div class="w-3/4 space-y-8">
      <div class="flex flex-col rounded bg-white overflow-hidden">
        <div class="flex items-center w-full h-48 overflow-hidden">
          <img
            class="object-contain w-full"
            :src="auth.store.user.cover?.href"
            :alt="auth.store.user.cover?.alt" />
        </div>
        <div class="flex">
          <div class="px-8 pb-8 relative">
            <span class="h-32 w-48 block" />
            <Avatar
              class="avatar-contain !h-48 !w-48 absolute inset-0 left-8 -top-16 border-8 border-white"
              :image="auth.store.user.picture?.href"
              shape="circle" />
          </div>
          <div class="flex flex-col p-8 w-full space-y-2">
            <div class="flex justify-between w-full">
              <span class="text-xl font-medium">{{
                auth.store.user.fullName
              }}</span>
              <div class="text-sm text-slate-700 space-x-1 flex items-center">
                <i :class="PrimeIcons.MAP_MARKER" class="text-sm"></i>
                <span>{{ auth.store.user.location }}</span>
              </div>
            </div>
            <p class="w-full text-slate-700">
              {{ auth.store.user.biography }}
            </p>
          </div>
        </div>
      </div>
      <div class="p-8 bg-white space-y-4">
        <span class="text-xl font-semibold block">About</span>
        <p class="text-lg text-slate-700">{{ auth.store.user.about }}</p>
        <span class="uppercase font-bold text-slate-600 block">See more</span>
      </div>
      <div
        v-if="Array.isArray(auth.store.projects)"
        class="p-8 rounded bg-white space-y-4">
        <div class="flex">
          <span class="text-xl font-semibold block mr-2">Projects</span>
          <span class="text-xl text-slate-500 block">
            3 of {{ auth.store.projects.length }}
          </span>
        </div>
        <div class="flex space-x-4">
          <div
            v-for="item in auth.store.projects"
            :key="item.id"
            class="flex flex-col space-y-4">
            <div class="overflow-hidden">
              <img
                :src="item.image?.href"
                :alt="item.image?.alt"
                class="w-full object-contain" />
            </div>
            <div class="flex flex-col space-y-2">
              <a class="font-medium text-slate-600">
                {{ item.title }}
              </a>
              <span class="text-sm font-light text-slate-600">
                {{ item.summary }} — {{ getDisplayableDate(item.date) }}
              </span>
            </div>
          </div>
        </div>
        <span class="uppercase font-bold text-slate-600 block">
          Show all ({{ auth.store.projects.length }})
        </span>
      </div>
      <div
        v-if="Array.isArray(auth.store.experience)"
        class="p-8 bg-white space-y-4">
        <span class="text-xl font-semibold block">Experience</span>
        <div class="space-y-4">
          <div
            v-for="item in auth.store.experience"
            :key="item.id"
            class="flex space-x-4">
            <Avatar
              class="avatar-contain flex-shrink-0 !h-16 !w-16"
              :image="item.image?.href"
              shape="circle" />
            <div class="flex flex-col w-full">
              <span class="font-medium text-slate-900">
                {{ item.title }}
              </span>
              <div class="space-x-2">
                <span v-if="item.company" class="text-sm text-slate-800">
                  {{ item.company.name }}
                </span>
                <span class="text-sm font-light text-slate-600">
                  {{ item.location }}
                </span>
              </div>
              <div class="space-x-2">
                <span class="text-xs font-light text-slate-800">
                  {{ getDisplayableExpDates(item.startDate, item.endDate) }}
                </span>
                <span class="text-xs font-semibold text-slate-600">
                  {{ item.timeDiff }}
                </span>
              </div>
              <p class="text-sm text-slate-900">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="Array.isArray(auth.store.education)"
        class="p-8 bg-white space-y-4">
        <span class="text-xl font-semibold block">Education</span>
        <div class="space-y-4">
          <div
            v-for="item in auth.store.education"
            :key="item.id"
            class="flex space-x-4">
            <Avatar
              class="avatar-contain flex-shrink-0 !h-16 !w-16"
              :image="item.image?.href"
              shape="circle" />
            <div class="flex flex-col w-full">
              <span class="text-base font-medium text-slate-900">
                {{ item.university }}
              </span>
              <span class="text-xs font-light">
                {{ item.startYear }} — {{ item.endYear }}
              </span>
              <p class="text-sm text-slate-900">
                {{ item.description }}
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
      <div class="p-8 bg-white space-y-4">
        <Rating v-model="profile" :cancel="false"></Rating>
      </div>
    </div>
  </div>
</template>
<style>
.avatar-contain > img {
  @apply object-cover;
}
</style>
