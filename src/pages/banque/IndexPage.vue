<template>
  <main>
    <q-card square class="bg-primary text-white"
      ><q-card-section class="text-center" style="font-size: 25px"
        >Tous mes comptes</q-card-section
      ></q-card
    >

    <section v-if="titres.length > 0" class="q-ml-md q-mr-md q-mb-md">
      <p class="q-ml-sm text-primary q-ma-none q-mt-lg" style="font-size: 18px">
        Compte courrant
      </p>
      <q-separator color="secondary" style="height: 2px; width: 50%" />

      <div class="q-mt-md" v-for="(compte, index) in titres" :key="index">
        <CardBanque :compte="compte" />
      </div>
    </section>
    <section v-if="epargne.length > 0" class="q-ml-md q-mr-md q-mb-md">
      <p class="q-ml-sm text-primary q-ma-none q-mt-lg" style="font-size: 18px">
        Compte épargne
      </p>
      <q-separator color="secondary" style="height: 2px; width: 50%" />

      <div class="q-mt-md" v-for="(compte, index) in epargne" :key="index">
        <CardBanque :compte="compte" />
      </div>
    </section>
    <section v-if="terme.length > 0" class="q-ml-md q-mr-md q-mb-md">
      <p class="q-ml-sm text-primary q-ma-none q-mt-lg" style="font-size: 18px">
        Compte à terme
      </p>
      <q-separator color="secondary" style="height: 2px; width: 50%" />

      <div class="q-mt-md" v-for="(compte, index) in terme" :key="index">
        <CardBanque :compte="compte" />
      </div>
    </section>
    <section v-if="joint.length > 0" class="q-ml-md q-mr-md q-mb-md">
      <p class="q-ml-sm text-primary q-ma-none q-mt-lg" style="font-size: 18px">
        Compte joint
      </p>
      <q-separator color="secondary" style="height: 2px; width: 50%" />

      <div class="q-mt-md" v-for="(compte, index) in joint" :key="index">
        <CardBanque :compte="compte" />
      </div>
    </section>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="accent" icon="keyboard_arrow_up" direction="up">
        <q-fab-action
          :to="{ name: 'Banque ajout' }"
          color="secondary"
          @click="onClick"
          icon="add"
        />
        <q-fab-action color="primary" @click="onClick" icon="credit_card" />
      </q-fab>
    </q-page-sticky>
  </main>
</template>

<script>
import { useQuasar } from "quasar";
import CardBanque from "components/banque/CardBanque.vue";
export default {
  components: {
    CardBanque,
  },
  data() {
    return {
      comptes: [],
      titres: [],
      epargne: [],
      terme: [],
      joint: [],
      utils: useQuasar(),
    };
  },
  mounted() {
    let user = this.utils.localStorage.getItem("user");
    this.comptes = user.banque.comptes;
    this.titres = this.comptes.filter((compte) => compte.type === "Compte individuel");
    this.epargne = this.comptes.filter(
      (compte) =>
        compte.type === "Livret A" ||
        compte.type === "Livret jeune" ||
        compte.type === "LDD"
    );
    this.terme = this.comptes.filter((compte) => compte.type === "Compte à terme");
    this.joint = this.comptes.filter((compte) => compte.type === "Compte joint");
  },
};
</script>
