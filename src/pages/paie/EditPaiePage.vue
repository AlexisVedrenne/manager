<template>
  <main v-if="paie">
    <q-card square class="bg-primary">
      <q-card-section>
        <div class="row items-center justify-center">
          <q-btn
            :to="{ name: 'Paie' }"
            text-color="secondary"
            round
            flat
            icon="arrow_back_ios"
          />
          <p
            class="q-ma-none q-mr-sm text-white text-bold text-center"
            style="font-size: 25px"
          >
            Ajout d'une fiche de paie
          </p>
        </div></q-card-section
      ></q-card
    >
    <div class="column items-center">
      <p style="font-size: 20px" class="text-center q-ma-none text-grey-8 q-mt-sm">
        {{ paie.nomEntreprise }}
      </p>
      <q-separator color="secondary" style="height: 3px; width: 75%" spaced inset />
    </div>
    <q-form @submit="submit" class="q-ma-md">
      <q-file
        v-if="typeof paie.fiche.lien !== 'string'"
        v-model="paie.fiche.lien"
        accept=".pdf"
        color="secondary"
        class="q-mb-md"
        label="Importer sa fiche de paie"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="picture_as_pdf" />
        </template>
      </q-file>
      <div class="row justify-center" v-else>
        <q-btn
          @click="paie.fiche.lien = null"
          color="negative"
          label="Supprimer la fiche de paie"
        />
      </div>
      <q-input
        v-model="paie.nomEntreprise"
        color="secondary"
        class="q-mb-md"
        label="Nom de l'entreprise"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="location_city" />
        </template>
      </q-input>
      <q-input v-model="paie.montant" color="secondary" class="q-mb-md" label="Montant">
        <template v-slot:prepend>
          <q-icon color="secondary" name="attach_money" />
        </template>
      </q-input>

      <q-input
        v-model="paie.annee"
        color="secondary"
        class="q-mb-md q-mt-md"
        label="Année de la paie"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="event" />
        </template>
      </q-input>
      <q-select
        v-model="paie.mois"
        color="secondary"
        class="q-mb-md col"
        label="Mois de la paie"
        :options="options"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="event" />
        </template>
      </q-select>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn :loading="loading" type="submit" fab icon="done" color="accent" />
      </q-page-sticky>
      <q-page-sticky position="bottom-left" :offset="[18, 18]">
        <q-btn :to="{ name: 'Paie' }" fab icon="close" color="negative" />
      </q-page-sticky>
    </q-form>
  </main>
</template>

<script>
import { useQuasar } from "quasar";
export default {
  data() {
    return {
      utils: useQuasar(),
      loading: false,
      options: [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ],
      paie: null,
    };
  },
  mounted() {
    let date = new Date();
    let user = this.utils.localStorage.getItem("user");
    this.paie = user.paie.fiches[this.$route.params.index];
  },
  methods: {
    async submit() {
      this.loading = true;
      await this.$store.dispatch("editPaie", {
        paie: this.paie,
        index: this.$route.params.index,
      });
      this.loading = false;
      this.$router.push({ name: "Paie" });
    },
  },
};
</script>
