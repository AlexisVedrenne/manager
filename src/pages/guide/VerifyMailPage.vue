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
          @click="reAuth"
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
import fire from "boot/Firebase.js";
export default {
  data() {
    return {
      user: null,
      loading: false,
      verif: true,
    };
  },
  async mounted() {
    this.user = this.$store.getters.getUser;
    if (!this.user.isFirstConnect) {
      this.$router.push({ name: "home" });
    }
    await this.verify();
  },
  methods: {
    async verify() {
      this.loading = true;
      let res = await this.$store.dispatch("verifyEmail");
      this.verif = res;
      this.loading = false;
      if (res) {
        this.$router.push({ name: "completeProfile" });
      }
    },
    async reAuth() {
      await this.$store.dispatch("signLeft");
      this.$router.push({ name: "connexion" });
    },
  },
};
</script>
