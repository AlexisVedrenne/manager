<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          v-if="user"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{
            this.$route.name != "home" ? this.$route.name : ""
          }}</q-toolbar-title
        >
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label v-if="user" header>
          {{ user.prenom }} {{ user.nom }}
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-btn @click="left" label="Déconnexion" />
      </q-list>
    </q-drawer>

    <q-page-container style="height: 100%">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useQuasar } from "quasar";
const linksList = [
  {
    title: "A propos",
    caption: "quasar.dev",
    icon: "school",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },
  data() {
    return {
      utils: useQuasar(),
      user: null,
    };
  },
  mounted() {
    this.user = this.utils.localStorage.getItem("user");
  },
  methods: {
    async left() {
      await this.$store.dispatch("signLeft");
      this.$router.push({ name: "connexion" });
    },
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
