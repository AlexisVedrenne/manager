<template>
  <main class="q-mr-md q-ml-md">
    <section class="row justify-center q-mb-xl">
      <q-img style="width: 80%; height: 80%" src="~assets/images/logo.svg" />
    </section>
    <section>
      <p style="font-size: 17px" class="text-primary text-center">
        Veuillez compléter votre profile
      </p>
      <p class="text-grey text-center">
        Note : Vous pouvez toujours compléter ces informations plus tard.
      </p>
      <q-form>
        <q-input
          v-model="infos.phone"
          class="q-mb-md"
          type="tel"
          color="secondary"
          label="Numéro de téléphone"
          lazy-rules
          :rules="[
            (val) =>
              val.length == 10 || 'Entrer un numéro de téléphone valide !',
          ]"
        >
          <template v-slot:prepend>
            <q-icon color="secondary" name="phone" />
          </template>
        </q-input>
        <q-input
          type="date"
          color="secondary"
          label="Date de naissance"
          v-model="infos.date"
        >
          <template v-slot:prepend>
            <q-icon color="secondary" name="cake" />
          </template>
        </q-input>
      </q-form>
    </section>
    <section class="row items-end justify-end q-mt-xl q-mb-sm q-mr-md">
      <q-btn
        :loading="loading"
        @click="submit"
        flat
        color="secondary"
        :label="infos.phone != '' ? 'Suivant' : 'Ignorer'"
      />
    </section>
  </main>
</template>

<script>
import { useQuasar } from "quasar";
export default {
  data() {
    return {
      utils: useQuasar(),
      loading: false,
      infos: { phone: "", date: "" },
      label: "Ignorer",
    };
  },
  mounted() {
    let user = this.utils.localStorage.getItem("user");

    if (user.phone != "") {
      this.infos.phone = user.phone;
      this.label = "Suivant";
    }
    if (user.birth != "") {
      this.infos.date = user.birth;
      this.label = "Suivant";
    }
  },
  methods: {
    async submit() {
      if (this.infos.phone != "" || this.infos.date != "") {
        this.loading = true;
        await this.$store.dispatch("completeProfile", { infos: this.infos });
        this.loading = false;
      }
      this.$router.push({ name: "choixFonction" });
    },
  },
};
</script>
