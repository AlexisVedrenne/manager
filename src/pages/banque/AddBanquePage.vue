<template>
  <q-page>
    <q-form @submit="submit" class="q-mr-md q-ml-md">
      <q-select
        class="q-mb-md"
        color="secondary"
        v-model="infos.type"
        :options="options"
        label="Sélection du type de compte"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="account_balance_wallet" />
        </template>
      </q-select>
      <q-input
        class="q-mb-md"
        v-model="infos.nom"
        label="Nom de la banque"
        color="secondary"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="account_balance" />
        </template>
      </q-input>
      <q-input
        class="q-mb-md"
        v-model="infos.solde"
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        label="Solde actuel du compte"
        color="secondary"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="savings" />
        </template>
      </q-input>
      <q-input
        class="q-mt-md q-mb-md"
        v-model="infos.decouvert"
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        label="Montant de l'autorisation de découvert"
        color="secondary"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="savings" />
        </template>
      </q-input>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn :loading="loading" type="submit" fab icon="done" color="accent" />
      </q-page-sticky>
      <q-page-sticky position="bottom-left" :offset="[18, 18]">
        <q-btn
          :to="{ name: 'Banque' }"
          fab
          icon="close"
          color="negative"
        /> </q-page-sticky
    ></q-form>
  </q-page>
</template>
<script>
import { useQuasar } from "quasar";
export default {
  data() {
    return {
      utils: useQuasar(),
      loading: false,
      infos: {
        type: "",
        nom: "",
        solde: null,
        decouvert: null,
        op: [],
      },
      options: [
        "Compte individuel",
        "Livret A",
        "Livret jeune",
        "LDD",
        "Compte à terme",
        "Compte joint",
      ],
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      await this.$store.dispatch("addBanque", { banque: this.infos });
      this.loading = false;
      this.$router.push({ name: "Banque" });
    },
  },
};
</script>
