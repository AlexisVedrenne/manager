<template>
  <main class="q-mt-md">
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
    <q-item clickable v-ripple class="q-pa-none q-">
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
    <q-item clickable v-ripple class="q-pa-none q-">
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
    <q-item clickable v-ripple class="q-pa-none q-">
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
  </main>
</template>

<script>
import { useQuasar } from "quasar";
export default {
  data() {
    return {
      user: {},
      utils: useQuasar(),
    };
  },
  mounted() {
    this.user = this.utils.localStorage.getItem("user");
  },
};
</script>
