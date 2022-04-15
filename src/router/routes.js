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
      {
        name: "signUp",
        path: "signUp",
        component: () => import("pages/SignUpPage.vue"),
      },
    ],
  },
  {
    path: "/manager",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        name: "A propos",
        path: "/about",
        component: () => import("pages/app/AboutPage.vue"),
      },
      {
        name: "Contact",
        path: "/contact",
        component: () => import("pages/app/ContactPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
