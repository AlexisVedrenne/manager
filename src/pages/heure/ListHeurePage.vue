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
      <CardHeure
        @delete="confirm(index, heure.nom)"
        @edit="edit(index)"
        @detail="detail(index)"
        :fiche="heure"
      />
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
    this.refresh();
  },
  methods: {
    detail(index) {
      this.$router.push("/heure/detail/" + index);
    },
    edit(index) {
      this.$router.push("/heure/edit/" + index);
    },
    async deleteFiche(index) {
      await this.$store.dispatch("deleteFiche", { index: index });
      this.refresh();
    },
    refresh() {
      let user = this.utils.localStorage.getItem("user");
      this.heures = user.heure.fiches;
    },
    async confirm(index, name) {
      this.utils
        .dialog({
          title: "Attention !",
          message:
            "Vous etes sur de vouloir supprimer la fiche '" + name + "' ?",
          cancel: true,
          persistent: true,
          ok: {
            label: "Supprimer",
            color: "negative",
            flat: true,
          },
          cancel: {
            label: "fermer",
            flat: true,
            color: "primary",
          },
        })
        .onOk(async () => {
          await this.deleteFiche(index);
        })
        .onOk(async () => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    },
  },
};
</script>
