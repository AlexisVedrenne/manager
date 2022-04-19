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
  {
    path: "/manager",
    component: () => import("layouts/MainLayout.vue"),
    meta: { mustBeLogged: true },
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/starting",
    component: () => import("layouts/EmptyLayout.vue"),
    meta: { mustBeLogged: true },
    children: [
      {
        name: "debut",
        path: "",
        component: () => import("pages/guide/StartGuidePage.vue"),
      },
      {
        name: "verifyEmail",
        path: "/verify-email",
        component: () => import("pages/guide/VerifyMailPage.vue"),
      },
      {
        name: "completeProfile",
        path: "/complete-profile",
        component: () => import("pages/guide/CompleteProfilePage.vue"),
      },
      {
        name: "choixFonction",
        path: "/choix-fonctionalites",
        component: () => import("pages/guide/ChoixFonctionPage.vue"),
      },
      {
        name: "heureGuide",
        path: "/heure",
        component: () => import("pages/guide/HeureGuidePage.vue"),
      },
      {
        name: "paieGuide",
        path: "/paie",
        component: () => import("pages/guide/PaieGuidePage.vue"),
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
