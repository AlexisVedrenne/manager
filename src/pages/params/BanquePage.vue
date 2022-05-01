<template>
  <main class="q-mt-md">
    <q-btn
      :to="{ name: 'Réglages' }"
      flat
      round
      color="secondary"
      icon="navigate_before"
    />
    <q-select
      class="q-mr-md q-ml-md"
      :options="options"
      color="secondary"
      v-model="compte"
      label="Choisir un compte"
    />
    <section v-if="compte">
      <q-form @submit="submit" class="q-ma-md">
        <q-select
          class="q-mb-md"
          color="secondary"
          v-model="user.banque.comptes[compte.value].type"
          :options="type"
          label="Sélection du type de compte"
        >
          <template v-slot:prepend>
            <q-icon color="secondary" name="account_balance_wallet" />
          </template>
        </q-select>
        <q-input
          class="q-mb-md"
          v-model="user.banque.comptes[compte.value].nom"
          label="Nom de la banque"
          color="secondary"
        >
          <template v-slot:prepend>
            <q-icon color="secondary" name="account_balance" />
          </template>
        </q-input>
        <q-input
          class="q-mb-md"
          v-model="user.banque.comptes[compte.value].decouvert"
          mask="#.##"
          fill-mask="0"
          reverse-fill-mask
          label="Montant de l'autorisation de découvert"
          color="secondary"
        >
          <template v-slot:prepend>
            <q-icon color="secondary" name="savings" />
          </template>
        </q-input>
        <div class="column items-center">
          <q-btn label="Modifier" color="accent" type="submit" :loading="loading" />
          <q-btn
            @click="deleteCompte(compte.value)"
            class="q-mt-lg"
            flat
            label="Supprimer ce compte"
            color="negative"
          />
        </div>
      </q-form>
    </section>
  </main>
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
export default {
  data() {
    return {
      compte: ref(null),
      loading: false,
      options: [],
      user: null,
      utils: useQuasar(),
      type: [
        "Compte individuel",
        "Livret A",
        "Livret jeune",
        "LDD",
        "Compte à terme",
        "Compte joint",
      ],
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    async submit() {
      this.loading = true;
      await this.$store.dispatch("updateUserInfo", { userInfos: this.user });
      this.loading = false;
      this.refresh();
    },
    refresh() {
      this.user = this.utils.localStorage.getItem("user");
      this.options = [];
      this.compte = ref(null);
      if (this.user.banque.comptes.length > 0) {
        for (let i = 0; i < this.user.banque.comptes.length; i++) {
          this.options.push({
            value: i,
            label:
              this.user.banque.comptes[i].nom + " : " + this.user.banque.comptes[i].type,
          });
        }
      }
    },
    async deleteCompte(index) {
      this.utils
        .dialog({
          title: "Attention !",
          message:
            "Vous etes sur de vouloir supprimer le compte '" +
            this.user.banque.comptes[index].nom +
            " : " +
            this.user.banque.comptes[index].type +
            "' ?",
          cancel: true,
          persistent: true,
          ok: {
            label: "Supprimer",
            color: "negative",
            flat: true,
          },
          cancel: {
            label: "fermer",
            flat: true,
            color: "primary",
          },
        })
        .onOk(async () => {
          this.utils.loading.show();
          this.user.banque.comptes.splice(index, 1);
          await this.$store.dispatch("updateUserInfo", {
            userInfos: this.user,
          });
          this.refresh();
          this.utils.hide();
        })
        .onOk(async () => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    },
  },
};
</script>
