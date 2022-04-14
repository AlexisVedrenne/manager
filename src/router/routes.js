const routes = [
  {
    path: "/",
    component: () => import("layouts/EmptyLayout.vue"),
    children: [
      {
        name: "connexion",
        path: "",
        component: () => import("pages/ConnexionPage.vue"),
      },
      {
        name: "resetPassword",
        path: "reset/password",
        component: () => import("pages/app/ResetPasswordPage.vue"),
      },
    ],
  },
  {
    path: "/home",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
