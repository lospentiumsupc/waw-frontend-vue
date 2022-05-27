<script setup>
import Menu from "primevue/menu";
import Avatar from "primevue/avatar";
import { PrimeIcons } from "primevue/api";
import { useMq } from "vue3-mq";
import { onMounted, ref, watchEffect } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { GlobalAuthService } from "@/accounts/services/auth.service";

const mq = useMq();

const router = useRouter();

const auth = ref(GlobalAuthService);
const user = ref(auth.value.getCurrentUser());

watchEffect(() => {
  user.value = auth.value.getCurrentUser();
});

const navigation = [
  { label: "Home", path: "/", icon: PrimeIcons.HOME },
  { label: "Jobs", path: "/jobs", icon: PrimeIcons.BRIEFCASE },
  { label: "Chat", path: "/chat", icon: PrimeIcons.COMMENT },
  { label: "Notices", path: "/notifications", icon: PrimeIcons.BELL },
];

const search = ref("");

/** @type {import("vue").Ref<import("primevue/menu").default>} */
const menuRef = ref();
/** @param {MouseEvent} event */
const toggleMenu = event => {
  menuRef.value.toggle(event);
};

/** @type {import("vue").Ref<import("primevue/menuitem").MenuItem[]>} */
const accountMenu = ref([]);
const updateMenu = () => {
  accountMenu.value = [
    {
      label: "Sign In",
      to: "/account/signin",
      icon: PrimeIcons.SIGN_IN,
      visible: !auth.value.loggedIn,
    },
    {
      label: "Sign Up",
      to: "/account/signup",
      icon: PrimeIcons.USER_PLUS,
      visible: !auth.value.loggedIn,
    },
    ...navigation.map(item => ({
      label: item.label,
      icon: item.icon,
      visible: mq.mdMinus && auth.value.loggedIn,
    })),
    { separator: true, visible: mq.mdMinus && auth.value.loggedIn },
    { label: "Profile", icon: PrimeIcons.USER, visible: auth.value.loggedIn },
    { label: "Options", icon: PrimeIcons.COG, visible: auth.value.loggedIn },
    {
      label: "Sign Out",
      command: () => {
        auth.value.logout();
        router.push("/account/signin");
      },
      icon: PrimeIcons.POWER_OFF,
      visible: auth.value.loggedIn,
    },
  ];
};

// Set the menu the first time the component is mounted
onMounted(updateMenu);
// Update it anytime the mq object changes
watchEffect(updateMenu);
</script>

<template>
  <header
    class="px-4 md:px-8 flex items-center h-20 justify-between sm:justify-start sm:space-x-8 bg-white">
    <div class="flex items-center h-full space-x-8">
      <RouterLink to="/">
        <h1 class="text-2xl font-bold">WAW</h1>
      </RouterLink>
      <nav
        v-if="auth.loggedIn"
        class="h-full pl-8 hidden md:flex items-center border-l border-slate-200">
        <ul class="flex text-center space-x-12">
          <RouterLink
            v-for="item in navigation"
            :key="item.path"
            :to="item.path">
            <li class="flex flex-col space-y-2">
              <i :class="item.icon" class="text-xl"></i>
              <span class="text-xs font-medium uppercase">
                {{ item.label }}
              </span>
            </li>
          </RouterLink>
        </ul>
      </nav>
    </div>
    <div
      class="h-full w-full hidden sm:flex items-center border-x border-slate-200">
      <i :class="PrimeIcons.SEARCH" class="ml-4 text-xl text-slate-400"></i>
      <input
        v-model="search"
        class="px-4 py-3 h-full w-full bg-transparent placeholder:font-light placeholder:text-base placeholder:text-slate-400"
        :placeholder="mq.lgPlus ? 'Quick search...' : 'Search...'" />
    </div>
    <div
      class="flex items-center shrink-0 space-x-4 cursor-pointer"
      @click="toggleMenu">
      <Avatar
        class="avatar-contain"
        image="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&w=128"
        shape="circle" />
      <div class="hidden lg:flex flex-col space-y-1">
        <span v-if="auth.loggedIn" class="text-xs font-medium">
          Hello, {{ user.preferredName }}
        </span>
        <span v-else class="text-xs font-medium">Hello, Sign In</span>
        <span v-if="auth.loggedIn" class="text-xs font-normal text-slate-600">
          {{ user.profileViews }} views today
        </span>
      </div>
      <i class="hidden lg:inline-block" :class="PrimeIcons.CHEVRON_DOWN"></i>
      <Menu ref="menuRef" :model="accountMenu" :popup="true" class="mt-2" />
    </div>
  </header>
</template>

<style>
.avatar-contain > img {
  @apply object-cover;
}
</style>
