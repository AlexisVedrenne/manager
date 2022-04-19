<template>
  <main class="q-mr-md q-ml-md">
    <section class="row justify-center q-mb-xl">
      <q-img style="width: 80%; height: 80%" src="~assets/images/logo.svg" />
    </section>
    <section>
      <p style="font-size: 17px" class="text-primary text-center">
        Entrer les paramètres de vos heure.
      </p>
      <p class="text-grey text-center">
        Note : Vous pouvez toujours compléter ces informations plus tard.
      </p>
      <q-input
        type="clock"
        color="secondary"
        label="Nombre d'heure par semaine"
        v-model="nbheure"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="schedule" />
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
      loading: false,
      nbheure: 35,
    };
  },
  mounted() {
    let user = this.$store.getters.getUser;
    this.nbheure = user.heure.param.nbHeureSemaine;
  },
  methods: {
    async submit() {
      this.loading = true;
      await this.$store.dispatch("heureGuide", { nb: this.nbheure });
      this.loading = false;
      this.$router.push({ name: "paieGuide" });
    },
  },
};
</script>
