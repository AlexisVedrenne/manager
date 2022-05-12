<template>
  <q-page class="q-mt-md">
    <q-btn
      :to="{ name: 'Réglages' }"
      flat
      round
      color="secondary"
      icon="navigate_before"
    />
    <div class="column items-center">
      <q-avatar size="150px">
        <img src="~assets/images/avatarBase.png" />
      </q-avatar>
      <q-btn color="secondary" flat label="Modifier" />
    </div>
    <q-separator />
    <q-item @click="nom = true" clickable v-ripple class="q-pa-none q-">
      <section style="width: 100%" class="row items-center q-ml-sm">
        <div class="col q-mt-md">
          <q-icon color="secondary" size="20px" name="person" />
          <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
            Nom
          </span>

          <p v-if="user" class="text-grey q-ml-xl">
            {{ user.nom }}
          </p>
        </div>
        <div class="col-1">
          <div class="row justify-end">
            <q-btn round flat color="scondary" icon="arrow_forward_ios" />
          </div>
        </div>
      </section>
    </q-item>
    <q-separator class="q-mb-md" />
    <q-separator />
    <q-item @click="prenom = true" clickable v-ripple class="q-pa-none q-">
      <section style="width: 100%" class="row items-center q-ml-sm">
        <div class="col q-mt-md">
          <q-icon color="secondary" size="20px" name="person" />
          <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
            Prénom
          </span>

          <p v-if="user" class="text-grey q-ml-xl">
            {{ user.prenom }}
          </p>
        </div>
        <div class="col-1">
          <div class="row justify-end">
            <q-btn round flat color="scondary" icon="arrow_forward_ios" />
          </div>
        </div>
      </section>
    </q-item>
    <q-separator class="q-mb-md" />
    <q-separator />
    <q-item @click="naissance = true" clickable v-ripple class="q-pa-none q-">
      <section style="width: 100%" class="row items-center q-ml-sm">
        <div class="col q-mt-md">
          <q-icon color="secondary" size="20px" name="cake" />
          <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
            Date de naissance
          </span>

          <p v-if="user" class="text-grey q-ml-xl">
            {{ user.birth || "Aucune..." }}
          </p>
        </div>
        <div class="col-1">
          <div class="row justify-end">
            <q-btn round flat color="scondary" icon="arrow_forward_ios" />
          </div>
        </div>
      </section>
    </q-item>
    <q-separator />

    <q-dialog full-width persistent v-model="naissance" :position="'bottom'">
      <q-card style="width: 700px; max-width: 80vw">
        <div class="row justify-end">
          <q-btn flat round icon="close" v-close-popup />
        </div>
        <q-card-section>
          <q-form @submit="submit">
            <div class="row justify-center q-mb-md">
              <q-input
                input-class="text-center"
                type="date"
                label="Modifier votre date de naissance"
                v-model="user.birth"
                color="secondary"
                class="col"
              />
            </div>

            <div class="row justify-center">
              <q-btn
                :loading="loading"
                type="submit"
                color="accent"
                class="col-5"
                label="Enregistrer"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog full-width persistent v-model="prenom" :position="'bottom'">
      <q-card style="width: 700px; max-width: 80vw">
        <div class="row justify-end">
          <q-btn flat round icon="close" v-close-popup />
        </div>
        <q-card-section>
          <q-form @submit="submit">
            <div class="row justify-center q-mb-md">
              <q-input
                label="Modifier votre prénom"
                v-model="user.prenom"
                color="secondary"
                class="col"
              />
            </div>

            <div class="row justify-center">
              <q-btn
                :loading="loading"
                type="submit"
                color="accent"
                class="col-5"
                label="Enregistrer"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog full-width persistent v-model="nom" :position="'bottom'">
      <q-card style="width: 700px; max-width: 80vw">
        <div class="row justify-end">
          <q-btn flat round icon="close" v-close-popup />
        </div>
        <q-card-section>
          <q-form @submit="submit">
            <div class="row justify-center q-mb-md">
              <q-input
                label="Modifier votre nom"
                v-model="user.nom"
                color="secondary"
                class="col"
              />
            </div>

            <div class="row justify-center">
              <q-btn
                :loading="loading"
                type="submit"
                color="accent"
                class="col-5"
                label="Enregistrer"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
export default {
  data() {
    return {
      prenom: false,
      nom: false,
      naissance: false,
      loading: false,
      user: {},
      utils: useQuasar(),
    };
  },
  mounted() {
    this.user = this.utils.localStorage.getItem("user");
  },
  methods: {
    async submit() {
      this.loading = true;
      await this.$store.dispatch("updateUserInfo", { userInfos: this.user });
      this.loading = false;
      this.nom = false;
      this.prenom = false;
      this.naissance = false;
    },
  },
};
</script>
