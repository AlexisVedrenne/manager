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
        <q-btn flat round icon="notifications" color="secondary" />
        <q-btn flat round icon="chat" color="secondary" />
        <q-btn flat round>
          <q-avatar size="40px">
            <img src="~assets/images/avatarBase.png" />
          </q-avatar>
        </q-btn>
        <q-btn color="secondary" flat dense round icon="more_vert">
          <q-menu>
            <q-list style="width: 180px">
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon color="primary" name="settings" />
                </q-item-section>
                <q-item-section>Réglage</q-item-section>
              </q-item>
              <q-item :to="{ name: 'A propos' }" clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon color="primary" name="info" />
                </q-item-section>
                <q-item-section>A propos</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-card class="bg-primary text-white" square
        ><q-card-section v-if="user">
          <div class="column">
            <q-avatar size="100px">
              <img src="~assets/images/avatarBase.png" />
            </q-avatar>
            <p>{{ user.prenom }} {{ user.nom }}</p>
          </div>
          <div class="row justify-center">
            <q-btn
              flat
              icon="logout"
              text-color="secondary"
              label="Déconnexion"
              @click="left"
            />
          </div> </q-card-section
      ></q-card>
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
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
    title: "Heure",
    caption: "Consulter, ajouter...",
    icon: "watch_later",
    link: { name: "Heure" },
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
