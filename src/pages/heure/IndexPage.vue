<template>
  <q-page>
    <q-card square class="q-mb-md bg-primary"
      ><q-card-section class="">
        <h4 class="text-white q-ma-none q-mb-md q-ml-lg">Bonjour !</h4>
        <p v-if="user" class="text-white text-center" style="font-size: 25px">
          {{ user.prenom }} {{ user.nom }}
        </p>
        <div class="row q-pa-none q-ma-none justify-center">
          <q-separator color="secondary" style="height: 3px; width: 75%" spaced inset />
        </div>
      </q-card-section>
    </q-card>
    <IndexHeure />
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import IndexHeure from "components/heure/IndexHeure.vue";
export default {
  components: {
    IndexHeure,
  },
  data() {
    return {
      utils: useQuasar(),
      user: null,
    };
  },
  mounted() {
    this.user = this.utils.localStorage.getItem("user");
  },
};
</script>
