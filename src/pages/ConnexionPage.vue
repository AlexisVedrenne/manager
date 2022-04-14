<template>
  <main class="q-mr-md q-ml-md column">
    <div class="col">
      <div class="row justify-center">
        <q-img
          style="width: 80%; height: 80%"
          src="~assets/images/manager.svg"
        />
      </div>
      <q-form @submit="submit">
        <q-input
          type="email"
          v-model="infos.email"
          class="q-mb-md"
          color="secondary"
          label="e-mail"
          required
        >
          <template v-slot:prepend>
            <q-icon color="secondary" name="mail" />
          </template>
        </q-input>
        <q-input
          required
          v-model="infos.password"
          type="password"
          color="secondary"
          label="mot de passe"
        >
          <template v-slot:prepend>
            <q-icon color="secondary" name="lock" />
          </template>
        </q-input>
        <div class="column q-mt-md">
          <div class="col self-end">
            <q-icon color="grey-7" name="help_outline" />
            <span class="q-ml-sm q-mt-sm q-mr-sm text-grey-7"
              >Mot de passe oublié ?
            </span>
            <q-btn
              :loading="loading"
              type="submit"
              class="q-mr-md q-mb-md"
              size="18px"
              round
              color="accent"
              icon="arrow_circle_right"
            />
          </div>
        </div>
      </q-form>

      <q-separator color="grey-7" style="height: 2px" spaced inset />
      <p class="q-mt-md text-bold text-grey-8 text-center">Se connecter avec</p>
      <div class="row justify-center q-mb-md">
        <q-btn
          class="q-mr-sm"
          round
          style="background-color: #ff5252; color: white"
          icon="ion-logo-google"
        />
        <q-btn
          class="q-mr-sm"
          round
          style="background-color: #3b5998; color: white"
          icon="ion-logo-facebook"
        />
        <q-btn
          class="q-mr-sm"
          round
          style="background-color: #00acee; color: white"
          icon="ion-logo-twitter"
        />
        <q-btn
          round
          style="background-color: #000000; color: white"
          icon="ion-logo-apple"
        />
      </div>
      <div class="row justify-center q-mt-md">
        <q-btn
          no-caps
          style="border-radius: 5px"
          color="primary"
          label="Pas encore de compte ?"
        />
      </div>
      <div class="row justify-center q-mt-md q-mb-xl">
        <q-btn
          flat
          no-caps
          style="border-radius: 5px"
          color="grey-7"
          label="En savoir plus ?"
        />
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      infos: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      await this.$store.dispatch("signIn", { infos: this.infos });
      this.loading = false;
    },
  },
};
</script>
