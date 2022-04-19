<template>
  <main class="q-mr-md q-ml-md">
    <section class="row justify-center q-mb-xl">
      <q-img style="width: 80%; height: 80%" src="~assets/images/logo.svg" />
    </section>
    <section>
      <p style="font-size: 17px" class="text-primary text-center">
        Entrer les paramètres de vos revenue.
      </p>
      <p class="text-grey text-center">
        Note : Vous pouvez toujours compléter ces informations plus tard.
      </p>
      <q-input
        @change="change"
        class="q-mb-md"
        v-model="infos.mois"
        label="Nombre de mois de prime conventionnelle."
        color="secondary"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="paid" />
        </template>
      </q-input>
      <q-input
        @change="change"
        class="q-mb-md"
        v-model="infos.mensuel"
        label="Votre revenue mensuel (brut)"
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        color="secondary"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="paid" />
        </template>
      </q-input>
      <q-input
        class="q-mb-md"
        readonly
        v-model="infos.annuel"
        label="Votre revenue annuel (brut)"
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        color="secondary"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="paid" />
        </template>
      </q-input>
      <q-input
        readonly
        v-model="infos.horraire"
        label="Votre revenue horraire (brut)"
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        color="secondary"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="paid" />
        </template>
      </q-input>
    </section>
    <section class="row items-end justify-end q-mt-xl q-mb-sm q-mr-md">
      <q-btn
        :loading="loading"
        @click="submit"
        flat
        color="secondary"
        label="Suivant"
      />
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      compte: null,
      loading: false,
      user: null,
      infos: {
        mensuel: null,
        annuel: null,
        horraire: null,
        mois: 12,
      },
    };
  },
  mounted() {
    let user = this.$store.getters.getUser;
    this.user = user;
    if (!this.user.isFirstConnect) {
      this.$router.push({ name: "home" });
    }
    this.compte = user.banque.comptes[0];
    this.infos.mensuel = user.paie.param.mensuel;
    this.infos.annuel = user.paie.param.annuel;
    this.infos.horraire = user.paie.param.horraire;
    this.infos.mois = user.paie.param.mois;
  },
  methods: {
    async submit() {
      this.loading = true;
      await this.$store.dispatch("paieGuide", { infos: this.infos });
      this.loading = false;
      if (!this.compte) {
        this.$router.push({ name: "banqueGuide" });
      } else {
        this.$router.push({ name: "finGuide" });
      }
    },
    change() {
      let mensuel = parseFloat(this.infos.mensuel);
      let nb = parseInt(this.user.heure.param.nbHeureSemaine);
      let mois = parseInt(this.infos.mois);
      let horraire = mensuel / ((nb * 52) / mois);
      let annuel = mensuel * mois;
      this.infos.horraire = horraire.toFixed(2);
      this.infos.annuel = annuel.toFixed(2);
    },
  },
};
</script>
