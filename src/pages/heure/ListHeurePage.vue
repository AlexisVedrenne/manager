<template>
  <q-page class="q-mb-xl">
    <q-card square class="bg-primary"
      ><q-card-section>
        <section class="row">
          <q-select
            v-model="annee"
            :options="anneeOptions"
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
            v-model="mois"
            @update:model-value="filtre"
            :options="options"
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
    <div class="q-pa-md row justify-center items-start q-gutter-md">
      <q-intersection
        once
        transition="scale"
        v-for="(heure, index) in heures"
        :key="index"
        class="col-md-5"
      >
        <CardHeure
          @delete="confirm(index, heure.nom)"
          @edit="edit(index)"
          @detail="detail(index)"
          :fiche="heure"
        />
      </q-intersection>
    </div>
    <section v-if="heures.length == 0" class="q-ma-sm q-mt-lg">
      <p class="text-center text-grey">Aucun résultat trouvé...</p>
    </section>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" :to="{ name: 'Ajout' }" color="secondary" />
    </q-page-sticky>
  </q-page>
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
      save: [],
      heures: [],
      mois: "",
      annee: "",
      anneeOptions: [],
      options: [
        { label: "Janvier", value: "01" },
        { label: "Février", value: "02" },
        { label: "Mars", value: "03" },
        { label: "Avril", value: "04" },
        { label: "Mai", value: "05" },
        { label: "Juin", value: "06" },
        { label: "Juillet", value: "07" },
        { label: "Août", value: "08" },
        { label: "Septembre", value: "09" },
        { label: "Octobre", value: "10" },
        { label: "Novembre", value: "11" },
        { label: "Décembre", value: "12" },
      ],
    };
  },

  mounted() {
    this.refresh();
    if (this.heures.length > 0) {
      this.setAnnee();
      this.save = this.heures;
    }
  },
  methods: {
    filtre() {
      let filtre = null;
      this.heures = this.save;
      if (this.mois != "") {
        filtre = this.heures.filter(
          (fiche) => fiche.date.substring(3, fiche.date.length - 5) === this.mois.value
        );
        this.heures = filtre;
      }
      if (this.annee != "") {
        filtre = this.heures.filter(
          (fiche) =>
            fiche.date.substring(fiche.date.length - 4, fiche.date.length) === this.annee
        );
        this.heures = filtre;
      }
    },
    setAnnee() {
      let date = this.heures[0].date.substring(
        this.heures[0].date.length - 4,
        this.heures[0].date.length
      );
      this.heures.forEach((heure) => {
        if (
          !this.anneeOptions.includes(
            heure.date.substring(heure.date.length - 4, heure.date.length)
          )
        ) {
          this.anneeOptions.push(
            heure.date.substring(heure.date.length - 4, heure.date.length)
          );
        }
      });
    },
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
      this.heures = user.heure.fiches.reverse();
    },
    async forceRefresh(done) {
      await this.$store.dispatch("getUserInfo");
      this.mois = "";
      this.annee = "";
      this.refresh();
      this.setAnnee();
      done();
    },
    async confirm(index, name) {
      this.utils
        .dialog({
          title: "Attention !",
          message: "Vous etes sur de vouloir supprimer la fiche '" + name + "' ?",
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
