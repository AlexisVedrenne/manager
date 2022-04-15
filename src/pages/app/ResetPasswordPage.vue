<template>
  <main class="container q-pt-xl">
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
      <p class="q-ml-sm text-h6 text-grey-8 q-ma-none">Mot de passe oublié</p>
      <q-img
        class="q-mb-lg"
        style="heigth: 110px; width: 110px"
        src="~assets/images/logo.svg"
      />
    </section>
    <section class="q-pl-md q-pr-md column">
      <q-form @submit="submit">
        <q-input
          v-model="email"
          type="email"
          color="secondary"
          class="col"
          label="Entrer votre e-mail"
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
        <div class="row justify-center">
          <q-btn
            :loading="loading"
            class="q-pr-xl q-pl-xl q-mt-lg"
            no-caps
            :icon-right="icon"
            :color="color"
            :label="label"
            type="submit"
            :disabled="disable"
          />
        </div>
      </q-form>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      loading: false,
      icon: "send",
      color: "accent",
      label: "Envoyer",
      disable: false,
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      await this.$store.dispatch("lostPassword", { email: this.email });
      this.loading = false;
      this.color = "positive";
      this.icon = "done";
      this.label = "";
      this.disable = true;
    },
  },
};
</script>
