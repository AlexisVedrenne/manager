const routes = [
  {
    path: "/",
    component: () => import("layouts/EmptyLayout.vue"),
    meta: { mustBeLogged: false },
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
    children: [
      {
        name: "home",
        path: "",
        component: () => import("pages/heure/IndexPage.vue"),
      },
      {
        name: "Réglages",
        path: "/settings",
        component: () => import("pages/params/IndexPage.vue"),
      },
      {
        name: "Heure",
        path: "/heure",
        component: () => import("pages/heure/ListHeurePage.vue"),
      },
      {
        name: "Ajout",
        path: "/heure/add",
        component: () => import("pages/heure/AddHeurePage.vue"),
      },
      {
        name: "Edition",
        path: "/heure/edit/:index",
        component: () => import("pages/heure/EditHeurePage.vue"),
      },
      {
        name: "Détail",
        path: "/heure/detail/:index",
        component: () => import("pages/heure/DetailHeurePage.vue"),
      },
    ],
  },
  {
    path: "/starting",
    component: () => import("layouts/EmptyLayout.vue"),
    meta: { mustBeLogged: true, tuto: true },
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
      {
        name: "banqueGuide",
        path: "/banque",
        component: () => import("pages/guide/BanqueGuidePage.vue"),
      },
      {
        name: "finGuide",
        path: "/fin",
        component: () => import("pages/guide/FinGuidePage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    meta: { mustBeLogged: false },
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
