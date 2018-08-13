import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/views/layout/Layout";

export const constantRouterMap = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/authredirect",
    component: () => import("@/views/login/authredirect"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/errorPage/401"),
    hidden: true
  },
  {
    path: "",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "dashboard",
        meta: { title: "dashboard", icon: "dashboard", noCache: true }
      }
    ]
  }
];

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  // mode: "history",
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: "/roles",
    component: Layout,
    // redirect: 'noredirect',
    name: "roles",
    meta: {
      title: "PermissionsSettings",
      icon: "people"
    },
    children: [
      {
        path: "appRoles",
        component: () => import("@/views/roles/appRoles"),
        name: "appRoles",
        meta: { title: "AppAuthorityManagement", noCache: true }
      },
      {
        path: "moduleRoles",
        component: () => import("@/views/roles/moduleRoles"),
        name: "moduleRoles",
        meta: { title: "ModuleManagement", noCache: true }
      },
      {
        path: "userRoles",
        component: () => import("@/views/roles/userRoles"),
        name: "userRoles",
        meta: { title: "RoleManagement", noCache: true }
      },
      {
        path: "userManager",
        component: () => import("@/views/roles/userManager"),
        name: "userManager",
        meta: { title: "userManagement", noCache: true }
      },
      {
        path: "sysOrg",
        component: () => import("@/views/roles/sysOrg"),
        name: "sysOrg",
        meta: { title: "OrganizationManagement", noCache: true }
      },
      {
        path: "permission",
        component: () => import("@/views/roles/permission"),
        name: "permission",
        meta: { title: "AuthorityManagement", noCache: true }
      }
    ]
  }
];
