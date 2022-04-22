<template>
  <main class="q-mb-xl">
    <q-card square class="bg-primary"
      ><q-card-section>
        <section class="row">
          <q-select
            input-class="text-center"
            class="col q-mr-sm"
            rounded
            outlined
            color="primary"
            bg-color="secondary"
            label-color="primary"
            label="Année"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="event" />
            </template>
          </q-select>
          <q-select
            input-class="text-center"
            class="col q-ml-sm"
            rounded
            outlined
            color="primary"
            bg-color="secondary"
            label-color="primary"
            label="Mois"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="event" />
            </template>
          </q-select></section></q-card-section
    ></q-card>
    <q-input
      v-model="search"
      color="secondary"
      rounded
      outlined
      class="q-ma-md"
      label="Rechercher une fiche..."
    >
      <template v-slot:prepend> <q-icon name="search" /> </template
    ></q-input>
    <section v-for="(heure, index) in heures" :key="index" class="q-ma-sm">
      <CardHeure :fiche="heure" />
    </section>
  </main>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" :to="{ name: 'Ajout heure' }" color="secondary" />
  </q-page-sticky>
</template>

<script>
import { useQuasar } from "quasar";
import CardHeure from "src/components/heure/CardHeure.vue";
export default {
  components: {
    CardHeure,
  },
  data() {
    return {
      utils: useQuasar(),
      search: "",
      heures: [],
    };
  },
  mounted() {
    let user = this.utils.localStorage.getItem("user");
    this.heures = user.heure.fiches;
  },
};
</script>
