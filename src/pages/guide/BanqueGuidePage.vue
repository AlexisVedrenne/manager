<template>
  <main class="q-mr-md q-ml-md">
    <section class="row justify-center q-mb-xl">
      <img
        v-if="utils.screen.lt.md"
        style="width: 80%; height: 80%"
        src="~assets/images/logo.svg"
      />
      <img
        v-if="utils.screen.gt.md"
        style="width: 30%; height: 30%"
        src="~assets/images/logo.svg"
      />
    </section>
    <section>
      <p style="font-size: 17px" class="text-primary text-center">
        Ajouter votre premier compte bancaire.
      </p>
      <p class="text-grey text-center">
        Note : Vous pouvez toujours compléter ces informations plus tard.
      </p>
      <div class="column items-center">
        <q-select
          style="width: 500px"
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
          style="width: 500px"
          class="q-mt-md"
          v-model="infos.nom"
          label="Nom de la banque"
          color="secondary"
        >
          <template v-slot:prepend>
            <q-icon color="secondary" name="account_balance" />
          </template>
        </q-input>
        <q-input
          style="width: 500px"
          class="q-mt-md"
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
          style="width: 500px"
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
      </div>
    </section>
    <section class="row items-end justify-end q-mt-xl q-mb-sm q-mr-md">
      <q-btn
        :loading="loading"
        @click="submit"
        flat
        color="secondary"
        :label="infos.type != '' ? 'Suivant' : 'Ignorer'"
      />
    </section>
  </main>
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
        "",
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
      if (
        this.infos.type != "" &&
        this.infos.nom != "" &&
        this.infos.solde &&
        this.infos.decouvert
      ) {
        this.loading = true;
        await this.$store.dispatch("addBanque", { banque: this.infos });
        this.loading = false;
        this.$router.push({ name: "finGuide" });
      }
      if (this.infos.type == "" && this.infos.nom == "") {
        this.$router.push({ name: "finGuide" });
      }
    },
  },
};
</script>
