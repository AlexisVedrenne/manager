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
        {{ compte.solde < 0 ? +compte.solde : "+" + compte.solde }}€
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
          <q-input color="secondary" label="Rechercher une opération...">
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
        <q-fab-action color="secondary" @click="ouvreModal" icon="add" />
        <q-fab-action color="primary" icon="schedule_send" />
      </q-fab>
    </q-page-sticky>
  </main>
  <q-dialog
    v-model="opModal"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="">
      <q-bar>
        <p class="q-ma-none">Opération bancaire</p>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="">Fermer</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <q-form @submit="addOp">
          <div class="row justify-evenly">
            <q-radio
              color="secondary"
              v-model="op.type"
              val="Virement"
              label="Virement"
            />
            <q-radio color="secondary" v-model="op.type" val="Retrait" label="Retrait" />
          </div>
          <q-input
            class="q-mb-md"
            v-model="op.libelle"
            color="secondary"
            label="Libellé de l'opération"
          >
            <template v-slot:prepend> <q-icon color="secondary" name="work" /> </template
          ></q-input>
          <q-select
            :options="options"
            class="q-mb-md"
            v-model="op.typeOp"
            color="secondary"
            label="Type de l'opération"
          >
            <template v-slot:prepend>
              <q-icon color="secondary" name="alt_route" /> </template
          ></q-select>
          <q-input
            type="date"
            class="q-mb-md"
            v-model="op.date"
            color="secondary"
            label="Date de l'opération"
          >
            <template v-slot:prepend> <q-icon color="secondary" name="event" /> </template
          ></q-input>
          <q-input
            class="q-mb-md"
            v-model="op.lieu"
            color="secondary"
            label="Lieu de l'opération"
          >
            <template v-slot:prepend>
              <q-icon color="secondary" name="pin_drop" /> </template
          ></q-input>
          <q-input
            class="q-mb-md"
            v-model="op.montant"
            color="secondary"
            label="Montant de l'opération"
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
          >
            <template v-slot:prepend>
              <q-icon color="secondary" name="point_of_sale" /> </template
          ></q-input>
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn :loading="loading" type="submit" fab icon="done" color="accent" />
          </q-page-sticky>
          <q-page-sticky position="bottom-left" :offset="[18, 18]">
            <q-btn v-close-popup fab icon="close" color="negative" />
          </q-page-sticky>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useQuasar } from "quasar";
export default {
  data() {
    return {
      opModal: false,
      loading: false,
      options: [
        "Internet",
        "Restauration",
        "Voyage",
        "Transport",
        "Alimentation",
        "Jeux",
        "Multimédia",
        "Virement",
      ],
      op: {
        type: "Virement",
        libelle: "",
        typeOp: "",
        date: "27/12/2001",
        lieu: "",
        montant: null,
      },
      tab: "Historique",
      date: "",
      compte: null,
      utils: useQuasar(),
      user: null,
    };
  },
  mounted() {
    this.refresh();
  },

  methods: {
    ouvreModal() {
      let date = new Date();
      this.op = {
        type: "Virement",
        libelle: "",
        typeOp: "",
        date:
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 9 ? "0" + date.getDate() : date.getDate()),

        lieu: "",
        montant: null,
      };
      this.opModal = true;
    },
    refresh() {
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
    async addOp() {
      this.loading = true;
      await this.$store.dispatch("addOp", {
        op: this.op,
        index: this.$route.params.index,
      });
      this.refresh();
      this.loading = false;
      this.opModal = false;
    },
  },
};
</script>
