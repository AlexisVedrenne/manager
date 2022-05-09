<template>
  <main v-if="paie">
    <q-card square class="bg-primary text-white"
      ><q-card-section class="column items-center">
        <div class="row items-center justify-center">
          <q-btn
            :to="{ name: 'Paie' }"
            text-color="secondary"
            round
            flat
            icon="arrow_back_ios"
          />
          <div class="column items-center">
            <p v-if="paie" class="text-center q-ma-none" style="font-size: 25px">
              {{ paie.nomEntreprise }}
            </p>
          </div>
        </div>
      </q-card-section></q-card
    >
    <p style="font-size: 40px" class="text-center text-grey-8 q-ma-none q-mt-md">
      {{ paie.montant }}€
    </p>
    <div class="row justify-center">
      <q-btn
        icon-right="download"
        target="_blank"
        :href="lien"
        no-caps
        label="Télécharger"
        color="accent"
      />
    </div>
    <p class="text-center text-grey q-mt-md">{{ paie.mois }} {{ paie.annee }}</p>
    <div class="q-mt-md q-mb-lg" style="height: 500px">
      <embed
        style="width: 100%; height: 100%"
        class="form-control"
        :src="lien"
        type="application/pdf"
      />
    </div>
  </main>
</template>

<script>
import { useQuasar } from "quasar";
export default {
  data() {
    return {
      paie: {},
      utils: useQuasar(),
      lien: null,
    };
  },

  mounted() {
    let user = this.utils.localStorage.getItem("user");
    this.paie = user.paie.fiches[this.$route.params.index];
    this.lien = this.paie.fiche.lien;
  },
};
</script>
