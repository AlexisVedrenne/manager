<template>
  <main class="q-mr-md q-ml-md">
    <section class="row justify-center q-mb-xl">
      <q-img style="width: 80%; height: 80%" src="~assets/images/logo.svg" />
    </section>
    <section>
      <p style="font-size: 17px" class="text-primary text-center">
        Quelles fonctionnalité voulez vous ?
      </p>
      <p class="text-grey text-center">
        Note : Vous pouvez toujours compléter ces informations plus tard.
      </p>
      <section class="column items-center justify-center">
        <div class="col">
          <q-checkbox
            v-model="choix.heure"
            color="secondary"
            label="Gestion des heures"
          />
        </div>
        <div class="col">
          <q-checkbox
            v-model="choix.paie"
            color="secondary"
            label="Gestion de paies"
          />
        </div>
        <div class="col">
          <q-checkbox
            v-model="choix.banque"
            color="secondary"
            label="Gestion bancaire"
          />
        </div>
      </section>
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
      loading: false,
      choix: {
        heure: null,
        paie: null,
        banque: null,
      },
    };
  },
  mounted() {
    let user = this.$store.getters.getUser;
    this.choix.heure = user.heure.active;
    this.choix.paie = user.paie.active;
    this.choix.banque = user.banque.active;
  },
  methods: {
    async submit() {
      this.loading = true;
      await this.$store.dispatch("choixFonctions", { choix: this.choix });
      this.loading = false;
      this.$router.push({ name: "heureGuide" });
    },
  },
};
</script>
