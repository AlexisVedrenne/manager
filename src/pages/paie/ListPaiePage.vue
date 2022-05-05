<template>
  <main>
    <q-pull-to-refresh @refresh="forceRefresh" color="primary" icon="refresh">
      <q-card square class="bg-primary"
        ><q-card-section>
          <section class="row">
            <q-select
              @update:model-value="filtre"
              v-model="annee"
              :options="optionsAnnee"
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
              :options="optionsMois"
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
      <div class="row">
        <q-input
          v-model="search"
          color="secondary"
          rounded
          outlined
          class="q-ml-md q-mt-md q-mb-md col"
          label="Rechercher une fiche... (par nom d'entreprise)"
        >
          <template v-slot:prepend> <q-icon name="search" /> </template
        ></q-input>
        <q-btn
          flat
          @click="recherche"
          round
          color="accent"
          class="col-1 q-mr-sm"
          icon="search"
        />
      </div>
      <div v-for="(paie, index) in paies" :key="index" class="q-ma-sm">
        <CardPaie @detail="detail(index)" :paie="paie" />
      </div>
      <div v-if="paies.length == 0">
        <p class="text-grey text-center q-mt-lg">Aucun résultat...</p>
      </div>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" :to="{ name: 'Ajout paie' }" color="secondary" />
      </q-page-sticky>
    </q-pull-to-refresh>
  </main>
</template>

<script>
import { useQuasar } from "quasar";
import CardPaie from "components/paie/CardPaie.vue";
export default {
  components: {
    CardPaie,
  },
  data() {
    return {
      search: "",
      paies: [],
      save: [],
      mois: "",
      annee: "",
      utils: useQuasar(),
      optionsMois: [],
      optionsAnnee: [],
    };
  },
  mounted() {
    this.refresh();
    this.setAnnee();
    this.setMois();
  },

  methods: {
    async forceRefresh(done) {
      await this.$store.dispatch("getUserInfo");
      this.mois = "";
      this.annee = "";
      this.refresh();
      this.setAnnee();
      this.setMois();
      done();
    },
    refresh() {
      let user = this.utils.localStorage.getItem("user");
      this.paies = user.paie.fiches;
      this.save = user.paie.fiches;
    },
    recherche() {
      this.paies = this.save;
      if (this.search !== "") {
        let filtre = this.paies.filter((fiche) =>
          fiche.nomEntreprise.toLowerCase().includes(this.search.toLowerCase())
        );
        this.paies = filtre;
      } else {
        this.paies = this.save;
      }
    },
    detail(index) {
      this.$router.push("/paie/detail/" + index);
    },
    setAnnee() {
      this.paies.forEach((paie) => {
        if (!this.optionsAnnee.includes(paie.annee)) {
          this.optionsAnnee.push(paie.annee);
        }
      });
    },
    setMois() {
      this.paies.forEach((paie) => {
        if (!this.optionsMois.includes(paie.mois)) {
          this.optionsMois.push(paie.mois);
        }
      });
    },
    filtre() {
      let filtre = null;
      this.paies = this.save;
      if (this.mois != "") {
        filtre = this.paies.filter((fiche) => fiche.mois === this.mois);
        this.paies = filtre;
      }
      if (this.annee != "") {
        filtre = this.paies.filter((fiche) => fiche.annee === this.annee);
        this.paies = filtre;
      }
    },
  },
};
</script>
