import Vue from "vue";
import VueRouter from "vue-router";
import DashBoard from "@/layouts/DashBoard.vue";
import store from "@/store/index";
// import SecondaryDashboard from '@/layouts/SecondaryDashboard.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("@/views/Userflow/Home.vue"),
      meta: {
        layout: DashBoard,
        authenticationRequired: true,
      },
    },
    // {
    //   path: '/organization-home',
    //   name: 'dashboard',
    //   component: () => import('@/views/organization/OrganizationHome.vue'),
    //   meta: {
    //     layout: SecondaryDashboard,
    //   },
    // },
    {
      path: "/library",
      name: "library",
      component: () => import("@/views/Home.vue"),
      meta: {
        layout: "full",
        title: "Library",
        authenticationRequired: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
      meta: {
        layout: "full",
      },
    },
    {
      path: "/account-type",
      name: "AccountType",
      component: () => import("@/views/pages/AccountType.vue"),
      meta: {
        layout: "full",
        authenticationRequired: true,
      },
    },
    {
      path: "/user-profile/parse-resume",
      name: "parse-resume",
      component: () => import("@/views/Userflow/UserProfile.vue"),
      meta: {
        layout: "full",
        title: "Resume Parser",
        pageTitle: "Resume Parser",
        authenticationRequired: true,
      },
    },
    {
      path: "/user-profile/details",
      name: "user-details",
      component: () => import("@/views/Userflow/UserProfile.vue"),
      meta: {
        layout: "full",
        title: "User Details",
        pageTitle: "User Details",
        authenticationRequired: true,
      },
    },
    {
      path: "/error-404",
      name: "error-404",
      component: () => import("@/views/error/Error404.vue"),
      meta: {
        layout: "full",
      },
    },
    {
      path: "*",
      redirect: "error-404",
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Set Page Title
  const DEFAULT_TITLE = "ALFRED";
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });

  // // console.log(store.state.auth);
  const isAuthenticated = store.state.user.isUserLoggedIn;
  if (to.meta.authenticationRequired && !isAuthenticated) {
    router.push("/login");
  } else {
    return next();
  }
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
