<template>
  <main class="container q-mt-xl">
    <section class="row items-center">
      <div>
        <q-btn
          :to="{ name: 'connexion' }"
          color="grey-8"
          flat
          round
          icon="arrow_back_ios"
          align="center"
        />
      </div>
      <p class="q-ml-sm text-h5 text-grey-8 q-ma-none">Inscription</p>
      <q-img
        class="q-mb-lg"
        style="heigth: 110px; width: 110px"
        src="~assets/images/logo.svg"
      />
    </section>
    <section class="column">
      <q-form @submit="submit" class="q-pr-md q-pl-md">
        <q-input
          v-model="inscription.email"
          icon="mail"
          class="q-mb-md"
          color="secondary"
          label="e-mail *"
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
          v-model="inscription.prenom"
          class="q-mb-md"
          color="secondary"
          label="prénom *"
          lazy-rules
          :rules="[(val) => val != '' || 'Vous devez entrer votre prénom !']"
        >
          <template v-slot:prepend>
            <q-icon color="secondary" name="face" />
          </template>
        </q-input>
        <q-input
          v-model="inscription.nom"
          class="q-mb-md"
          color="secondary"
          label="nom *"
          lazy-rules
          :rules="[(val) => val != '' || 'Vous devez entrer votre nom !']"
        >
          <template v-slot:prepend>
            <q-icon color="secondary" name="face" />
          </template>
        </q-input>
        <q-input
          v-model="inscription.password"
          icon="lock"
          class="q-mb-md"
          color="secondary"
          label="mot de passe *"
          type="password"
          lazy-rules
          :rules="[
            (val) =>
              val.length >= 6 || 'Un minimum de 6 caractère est requis !',
          ]"
        >
          <template v-slot:prepend>
            <q-icon color="secondary" name="lock" /> </template
        ></q-input>
        <q-input
          v-model="password"
          icon="lock"
          class="q-mb-md"
          color="secondary"
          label="confirmer le mot de passe *"
          type="password"
          lazy-rules
          :rules="[
            (val) =>
              val == inscription.password ||
              'Le mot de passe ne correspond pas !',
          ]"
        >
          <template v-slot:prepend>
            <q-icon color="secondary" name="lock" /> </template
        ></q-input>
        <div class="row">
          <div class="col-1">
            <q-checkbox color="secondary" v-model="inscription.cgu" />
          </div>
          <div class="col">
            <q-btn
              flat
              class="q-pa-none q-ml-md"
              no-caps
              :href="'CGU.pdf'"
              target="_blank"
              label="J'ai lu & accepté les conditions général d'utilisation"
            />
          </div>
        </div>
        <div class="row justify-center q-mt-md q-pb-xl">
          <q-btn
            type="submit"
            no-caps
            style="width: 200px;height:50px border-radius: 5px"
            color="primary"
            label="Continuer"
          />
        </div>
      </q-form>
    </section>
  </main>
</template>
<script>
import { useQuasar } from "quasar";
export default {
  data() {
    return {
      inscription: {
        email: "",
        password: "",
        cgu: false,
        prenom: "",
        nom: "",
      },
      password: "",
      utils: useQuasar(),
    };
  },
  methods: {
    submit() {
      if (this.inscription.cgu !== true) {
        this.utils.notify({
          color: "warning",
          textColor: "dark",
          icon: "warning",
          message: "Vous devez accepter les conditions général d'utilisation !",
        });
      } else {
        this.utils.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
      }
    },
  },
};
</script>
