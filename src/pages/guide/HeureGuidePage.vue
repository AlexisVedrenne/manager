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
        Entrer les paramètres de vos heure.
      </p>
      <p class="text-grey text-center">
        Note : Vous pouvez toujours compléter ces informations plus tard.
      </p>
      <div class="column items-center">
        <q-input
          style="width: 500px"
          type="clock"
          color="secondary"
          label="Nombre d'heure par semaine"
          v-model="nbheure"
        >
          <template v-slot:prepend>
            <q-icon color="secondary" name="schedule" />
          </template>
        </q-input>
      </div>
    </section>

    <section class="row items-end justify-end q-mt-xl q-mb-sm q-mr-md">
      <q-btn :loading="loading" @click="submit" flat color="secondary" label="Suivant" />
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
      nbheure: 35,
    };
  },
  mounted() {
    let user = this.utils.localStorage.getItem("user");
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
