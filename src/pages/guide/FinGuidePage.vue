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
    <section class="row items-end justify-center q-mt-xl q-mb-sm q-mr-md">
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
import { useQuasar } from "quasar";
export default {
  data() {
    return {
      utils: useQuasar(),
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
};
</script>
