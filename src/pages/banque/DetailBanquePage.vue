<template>
  <main v-if="compte">
    <q-card square class="bg-primary"
      ><q-card-section>
        <div class="row justify-center items-center q-mb-md">
          <q-btn
            class="col-1"
            :to="{ name: 'Banque' }"
            text-color="secondary"
            round
            flat
            icon="arrow_back_ios"
          />
          <p style="font-size: 25px" class="text-white q-ma-none col">
            {{ compte.type }}
          </p>
        </div>
        <div class="row justify-center">
          <p style="font-size: 17px" class="text-white text-center q-ma-none col">
            {{ compte.nom }}
          </p>
        </div>
      </q-card-section></q-card
    >
    <div class="column items-center q-mt-xl">
      <p
        style="font-size: 40px"
        :class="
          'q-mb-none text-bold ' + (compte.solde < 0 ? 'text-negative' : 'text-positive')
        "
      >
        {{ compte.solde < 0 ? "-" + compte.solde : "+" + compte.solde }}€
      </p>
      <p style="font-size: 17px" class="text-grey">Solde du {{ date }}</p>
      <q-separator color="secondary" style="height: 1.5px; width: 50%" />
    </div>
    <div class="q-mt-md q-ml-md">
      <p class="text-grey-7" style="font-size: 15px">
        Autorisation de découvert :
        {{ !compte.decouvert ? "Aucun..." : compte.decouvert + "€" }}
      </p>
      <p class="text-grey-7" style="font-size: 15px">
        Titulaire du compte :
        {{ user.nom }} {{ user.prenom }}
      </p>
    </div>
    <q-card flat>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="secondary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="Historique" label="Historique" icon="history" />
        <q-tab name="A venir" label="A venir" icon="event" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="Historique">
          <q-input v-model="search" color="secondary" label="Rechercher une opération...">
            <template v-slot:prepend> <q-icon name="search" /> </template
          ></q-input>
        </q-tab-panel>

        <q-tab-panel name="A venir">
          <p class="text-grey text-center q-mt-md">Aucun...</p>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="accent" icon="keyboard_arrow_up" direction="up">
        <q-fab-action color="secondary" @click="onClick" icon="add" />
        <q-fab-action color="primary" @click="onClick" icon="schedule_send" />
      </q-fab>
    </q-page-sticky>
  </main>
</template>

<script>
import { useQuasar } from "quasar";
export default {
  data() {
    return {
      tab: "Historique",
      date: "",
      compte: null,
      utils: useQuasar(),
      user: null,
    };
  },
  mounted() {
    let date = new Date();
    this.date =
      (date.getDate() < 9 ? "0" + date.getDate() : date.getDate()) +
      "/" +
      (date.getMonth() + 1 < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) +
      "/" +
      date.getFullYear();
    this.user = this.utils.localStorage.getItem("user");
    this.compte = this.user.banque.comptes[this.$route.params.index];
  },
};
</script>
