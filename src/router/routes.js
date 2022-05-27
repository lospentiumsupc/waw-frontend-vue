/**
 * List of routes to be registered for the app
 *
 * @type {import("vue-router").RouteRecordRaw[]}
 */
export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/home/pages/home-profile.component.vue"),
  },
  {
    path: "/account/signin",
    name: "Sign In",
    component: () => import("@/accounts/pages/sign-in.component.vue"),
  },
  {
    path: "/account/resetpassword",
    name: "Reset Password",
    component: () => import("@/accounts/pages/reset-password.component.vue"),
  },
  {
    path: "/account/changepassword",
    name: "Change Password",
    component: () => import("@/accounts/pages/change-password.component.vue"),
  },
  {
    path: "/account/signup",
    name: "Sign Up",
    component: () => import("@/accounts/pages/sign-up.component.vue"),
  },
  {
    path: "/jobs",
    name: "Jobs",
    redirect: "/jobs/admin",
  },
  {
    path: "/chat",
    name: "Chat",
    redirect: "/",
  },
  {
    path: "/notifications",
    name: "Notifications",
    redirect: "/",
  },
  {
    path: "/jobs/admin",
    name: "Job Offers",
    component: () => import("@/jobs/pages/job-offers-admin.component.vue"),
  },
  {
    path: "/jobs/search",
    name: "Job Search",
    component: () => import("@/jobs/pages/job-offers-display.component.vue"),
  },
];
