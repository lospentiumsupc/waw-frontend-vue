<script setup>
import Menu from "primevue/menu";
import Avatar from "primevue/avatar";
import { PrimeIcons } from "primevue/api";
import { ref } from "vue";
// import { RouterLink } from "vue-router";

const navigation = [
  { label: "Home", path: "/", icon: PrimeIcons.HOME },
  { label: "Jobs", path: "/jobs", icon: PrimeIcons.BRIEFCASE },
  { label: "Chat", path: "/chat", icon: PrimeIcons.COMMENT },
  { label: "Notices", path: "/notifications", icon: PrimeIcons.BELL },
];

const refMenu = ref();
const toggleMenu = event => {
  refMenu.value.toggle(event);
};
const accountMenu = [
  {
    label: "Account",
    icon: PrimeIcons.USER,
    items: [
      {
        label: "Options",
        icon: PrimeIcons.COG,
        // to: "/account",
      },
      {
        label: "Sign Out",
        icon: PrimeIcons.POWER_OFF,
        // to: "/logout",
      },
    ],
  },
];

const user = {
  preferredName: "John",
  fullName: "John Doe",
  email: "john.doe@gmail.com",
  profileViews: 367,
};

const search = ref("");
</script>

<template>
  <header class="px-8 flex items-center h-20 space-x-8">
    <div class="flex items-center h-full space-x-8">
      <h1 class="text-2xl font-bold">WAW</h1>
      <span class="h-full w-0 border-l border-slate-200"></span>
      <nav>
        <ul class="flex text-center space-x-12">
          <!-- <RouterLink
            v-for="item in navigation"
            :key="item.path"
            :to="item.path"
            active-class="text-ceil">
            <li class="flex flex-col space-y-2">
              <i :class="item.icon" class="text-xl"></i>
              <span class="text-xs font-medium uppercase">
                {{ item.label }}
              </span>
            </li>
          </RouterLink> -->
          <li
            v-for="item in navigation"
            :key="item.path"
            class="flex flex-col space-y-2">
            <i :class="item.icon" class="text-xl"></i>
            <span class="text-xs font-medium uppercase">
              {{ item.label }}
            </span>
          </li>
        </ul>
      </nav>
    </div>
    <div class="h-full w-full flex items-center border-x border-slate-200">
      <i :class="PrimeIcons.SEARCH" class="ml-4 text-xl text-slate-400"></i>
      <input
        v-model="search"
        class="px-4 py-3 h-full w-full bg-transparent placeholder:font-light placeholder:text-base placeholder:text-slate-400"
        placeholder="Quick search..." />
    </div>
    <div class="flex items-center shrink-0 space-x-4">
      <Avatar
        class="avatar-contain h-12 w-12"
        image="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&w=128"
        shape="circle" />
      <div class="flex flex-col space-y-1">
        <span class="text-xs font-medium">
          Hello, {{ user.preferredName }}
        </span>
        <span class="text-xs font-normal text-slate-600">
          {{ user.profileViews }} views today
        </span>
      </div>
      <button type="button" @click="toggleMenu">
        <i :class="PrimeIcons.CHEVRON_DOWN"></i>
      </button>
      <Menu ref="refMenu" :model="accountMenu" :popup="true" />
    </div>
  </header>
</template>

<style>
.avatar-contain > img {
  @apply object-cover;
}
</style>
