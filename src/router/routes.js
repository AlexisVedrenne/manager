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
        name: "Profil",
        path: "/settings/profil",
        component: () => import("pages/params/ProfilPage.vue"),
      },
      {
        name: "Comptes",
        path: "/settings/bank",
        component: () => import("pages/params/BanquePage.vue"),
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
      {
        name: "Paie",
        path: "/paie",
        component: () => import("pages/paie/ListPaiePage.vue"),
      },
      {
        name: "Ajout paie",
        path: "/paie/add",
        component: () => import("pages/paie/AddPaiePage.vue"),
      },
      {
        name: "Détail paie",
        path: "/paie/detail/:index",
        component: () => import("pages/paie/DetailPaiePage.vue"),
      },
      {
        name: "Edit paie",
        path: "/paie/edit/:index",
        component: () => import("pages/paie/EditPaiePage.vue"),
      },
      {
        name: "Banque",
        path: "/banque",
        component: () => import("pages/banque/IndexPage.vue"),
      },
      {
        name: "Banque ajout",
        path: "/banque/ajout",
        component: () => import("pages/banque/AddBanquePage.vue"),
      },
      {
        name: "Banque détail",
        path: "/banque/detail/:index",
        component: () => import("pages/banque/DetailBanquePage.vue"),
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
