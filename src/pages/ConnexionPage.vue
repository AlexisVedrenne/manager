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
          lazy-rules
          :rules="[
            (val) =>
              (val.includes('@') && val.includes('.')) ||
              'Entrer une adresse e-mail valide !',
          ]"
        >
          <template v-slot:prepend>
            <q-icon color="secondary" name="mail" />
          </template>
        </q-input>
        <q-input
          v-model="infos.password"
          type="password"
          color="secondary"
          label="mot de passe"
          lazy-rules
          :rules="[
            (val) => val != '' || 'Vous devez entrer votre mot de passe !',
          ]"
        >
          <template v-slot:prepend>
            <q-icon color="secondary" name="lock" />
          </template>
        </q-input>
        <div class="row items-center justify-end q-mt-md">
          <div class="q-mr-sm">
            <q-btn
              size="12px"
              icon="help_outline"
              flat
              no-caps
              style="border-radius: 5px;align-self: flex-end; !important"
              color="grey-7"
              label="Mot de passe oublié ?"
              :to="{ name: 'resetPassword' }"
            />
          </div>
          <div class="col-2 q-mr-md">
            <q-btn
              :loading="loading"
              type="submit"
              class="q-mr-md"
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
          @click="logGoogle"
          class="q-mr-sm"
          round
          style="background-color: #ff5252; color: white"
          icon="ion-logo-google"
        />
        <!-- <q-btn
          @click="logFaceBook"
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
        /> -->
        <q-btn
          @click="logApple"
          round
          style="background-color: #000000; color: white"
          icon="ion-logo-apple"
        />
      </div>
      <div class="row justify-center q-mt-md">
        <q-btn
          :to="{ name: 'signUp' }"
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
          :to="{ name: 'A propos' }"
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
      let user = await this.$store.dispatch("signIn", { infos: this.infos });
      this.loading = false;
      if (user && user.isFirstConnect) {
        this.$router.push({ name: "debut" });
      }
    },
    async logGoogle() {
      await this.$store.dispatch("logInGoogle");
    },
    async logFaceBook() {
      await this.$store.dispatch("logFacebook");
    },
    async logApple() {
      await this.$store.dispatch("logApple");
    },
  },
};
</script>
