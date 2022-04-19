<template>
  <main class="q-mr-md q-ml-md">
    <section class="row justify-center q-mb-xl">
      <q-img style="width: 80%; height: 80%" src="~assets/images/logo.svg" />
    </section>
    <section>
      <p style="font-size: 17px" class="text-primary text-center">
        Vous avez terminé la configuration.
      </p>
      <p class="text-grey-7 text-center">
        Vos choix on bien été enregistrer et pris en compte.
      </p>
      <br />
      <p style="font-size: 16px" class="text-center">
        Merci d'avoir fait le choix d'utiliser Manager !
      </p>
    </section>
    <section class="row items-end justify-end q-mt-xl q-mb-sm q-mr-md">
      <q-btn
        :loading="loading"
        size="18px"
        flat
        color="secondary"
        label="Terminer"
        @click="end"
      />
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async end() {
      this.loading = true;
      await this.$store.dispatch("endGuide");
      this.loading = false;
      this.$router.push({ name: "home" });
    },
  },
  mounted() {
    let user = this.$store.getters.getUser;
    if (!user.isFirstConnect) {
      this.$router.push({ name: "home" });
    }
  },
};
</script>
