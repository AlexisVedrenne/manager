<template>
  <main class="q-mr-md q-ml-md">
    <div class="row justify-center items-center">
      <div class="col-md">
        <div class="row justify-center">
          <img style="width: 80%; height: 80%" src="~assets/images/manager.svg" />
        </div>
      </div>
      <div style="width: 100%" class="col-md">
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
            :rules="[(val) => val != '' || 'Vous devez entrer votre mot de passe !']"
          >
            <template v-slot:prepend>
              <q-icon color="secondary" name="lock" />
            </template>
          </q-input>
          <div
            :class="
              'row items-center ' +
              (utils.screen.lt.md ? 'justify-end' : 'justify-center') +
              ' q-mt-md'
            "
          >
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
      </div>
    </div>
    <q-separator
      v-if="utils.screen.lt.md"
      color="grey-7"
      style="height: 2px"
      spaced
      inset
    />
    <div
      v-if="
        !utils.platform.is.electron &&
        !utils.platform.is.capacitor &&
        !utils.platform.is.cordova
      "
      class="row justify-center"
    >
      <q-btn
        :to="{ name: 'Centre Téléchargement' }"
        color="secondary"
        no-caps
        label="Centre des téléchargements"
      />
    </div>
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
      <!-- <q-btn
          @click="logApple"
          round
          style="background-color: #000000; color: white"
          icon="ion-logo-apple"
        /> -->
    </div>
    <div class="row justify-center q-mt-md q-mb-md">
      <div class="col-2-md q-mb-md q-mr-sm">
        <q-btn
          :to="{ name: 'signUp' }"
          no-caps
          style="border-radius: 5px"
          color="primary"
          label="Pas encore de compte ?"
        />
      </div>
      <div class="col-2-md">
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
import { useQuasar } from "quasar";
export default {
  data() {
    return {
      utils: useQuasar(),
      infos: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  mounted() {
    console.log(this.utils.platform.is.electron);
  },
  methods: {
    async submit() {
      this.loading = true;
      let user = await this.$store.dispatch("signIn", { infos: this.infos });
      this.loading = false;
      if (user && user.isFirstConnect) {
        this.$router.push({ name: "debut" });
      } else {
        this.$router.push({ name: "home" });
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
