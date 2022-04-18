<template>
  <main>
    <section class="row justify-center q-mb-xl">
      <q-img style="width: 80%; height: 80%" src="~assets/images/logo.svg" />
    </section>
    <section class="row justify-center">
      <p style="font-size: 35px" v-if="user" class="text-secondary">
        {{ user.prenom }} {{ user.nom }},
      </p>
      <p class="text-primary q-ml-md" style="font-size: 16px">
        Bienvenue sur votre nouvelle application.
      </p>
      <p class="text-grey q-ml-md" style="font-size: 14px">
        Découvrez une application entièrement repensée afin de vous proposer une
        meilleure expérience utilisateur et une utilisation simplifiée.
      </p>
    </section>
    <section class="row items-end justify-end q-mt-xl q-mb-sm q-mr-md">
      <q-btn flat color="secondary" label="Commencer" />
    </section>
  </main>
</template>
<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  async mounted() {
    this.user = this.$store.getters.getUser;
  },
};
</script>
