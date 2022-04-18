<template>
  <main>
    <section class="row justify-center q-mb-xl">
      <q-img style="width: 80%; height: 80%" src="~assets/images/logo.svg" />
    </section>
    <section>
      <p class="text-center text-primary" style="font-size: 20px">
        Tout d'abord veuillez vérifier votre adresse email
      </p>
      <div class="row justify-center q-mt-lg q-mb-md">
        <q-btn
          v-if="verif"
          :loading="loading"
          @click="verify"
          color="accent"
          no-caps
          class="q-pr-xl q-pl-xl"
          label="Vérifier"
        />
        <q-btn
          v-if="!verif"
          :loading="loading"
          :to="{ name: 'connexion' }"
          color="positive"
          no-caps
          class="q-pr-xl q-pl-xl"
          label="Se reconnecter"
        />
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      loading: false,
      verif: true,
    };
  },
  mounted() {
    this.user = this.$store.getters.getUser;
  },
  methods: {
    async verify() {
      this.loading = true;
      this.verif = await this.$store.dispatch("verifyEmail");
      this.loading = false;
    },
  },
};
</script>
