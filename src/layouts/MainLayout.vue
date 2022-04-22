<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          color="secondary"
          v-if="user"
          flat
          dense
          round
          :icon="leftDrawerOpen ? 'menu_open' : 'menu'"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-btn
            v-if="this.$route.name != 'home'"
            :to="{ name: 'home' }"
            class="q-pa-none"
            :icon-right="iconSelect"
            size="20px"
            no-caps
            flat
            :label="this.$route.name != 'home' ? this.$route.name : ''"
          />
        </q-toolbar-title>
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
        <q-item @click="left" clickable>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">Déconnexion</q-item-label>
          </q-item-section>
        </q-item>
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
    title: "Fiches heure",
    caption: "Consulter, ajouter...",
    icon: "watch_later",
    link: { name: "Fiches heure" },
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
      iconSelect: "",
    };
  },
  mounted() {
    this.user = this.utils.localStorage.getItem("user");
    if (this.$route.name != "home") {
      this.iconSelect = this.getIcon(this.$route.name);
    }
  },
  methods: {
    async left() {
      await this.$store.dispatch("signLeft");
      this.$router.push({ name: "connexion" });
    },
    getIcon(name) {
      let link = linksList.filter((val) => val.title === name);
      return link.length > 0 ? link[0].icon : "";
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
