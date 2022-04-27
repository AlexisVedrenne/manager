<template>
  <main class="q-mb-xl">
    <p style="font-size: 18px" class="q-ma-none q-mt-lg q-ml-sm">Indentité</p>
    <q-separator />
    <q-item clickable v-ripple class="q-pa-none q-">
      <section style="width: 100%" class="row items-center q-ml-sm">
        <div class="col-6 q-mt-md">
          <q-icon color="secondary" size="20px" name="account_circle" />
          <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
            Mon profil
          </span>

          <p class="text-grey q-ml-xl">{{ user.prenom }} {{ user.nom }}</p>
        </div>
        <div class="col">
          <div class="row justify-end">
            <q-btn round flat color="scondary" icon="arrow_forward_ios" />
          </div>
        </div>
      </section>
    </q-item>
    <q-separator />
    <p style="font-size: 18px" class="q-ma-none q-mt-lg q-ml-sm">Connexion</p>
    <q-separator />
    <q-item clickable v-ripple class="q-pa-none q-">
      <section style="width: 100%" class="row items-center q-ml-sm">
        <div class="col-6 q-mt-md">
          <q-icon color="secondary" size="20px" name="mail" />
          <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
            Adresse Email
          </span>

          <p v-if="credential" class="text-grey q-ml-xl">
            {{ credential.user.email }}
          </p>
        </div>
        <div class="col">
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
        <div class="col-6 q-mt-md">
          <q-icon color="secondary" size="20px" name="call" />
          <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
            Téléphone
          </span>

          <p v-if="credential" class="text-grey q-ml-xl">
            {{ credential.user.phone || "Aucun..." }}
          </p>
        </div>
        <div class="col">
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
        <div class="col-6 q-mt-md">
          <q-icon color="secondary" size="20px" name="lock" />
          <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
            Mot de passe
          </span>

          <p class="text-grey q-ml-xl">********</p>
        </div>
        <div class="col">
          <div class="row justify-end">
            <q-btn round flat color="scondary" icon="arrow_forward_ios" />
          </div>
        </div>
      </section>
    </q-item>
    <q-separator />
    <p style="font-size: 18px" class="q-ma-none q-mt-lg q-ml-sm">Heure</p>
    <q-separator />
    <q-item clickable v-ripple class="q-pa-none q-">
      <section style="width: 100%" class="row items-center q-ml-sm">
        <div class="col-6 q-mt-md">
          <q-icon color="secondary" size="20px" name="schedule" />
          <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
            Nombre heure semaine
          </span>

          <p v-if="credential" class="text-grey q-ml-xl">
            {{ user.heure.param.nbHeureSemaine }}h
          </p>
        </div>
        <div class="col">
          <div class="row justify-end">
            <q-btn round flat color="scondary" icon="arrow_forward_ios" />
          </div>
        </div>
      </section>
    </q-item>
    <q-separator class="q-mb-md" />

    <p style="font-size: 18px" class="q-ma-none q-mt-lg q-ml-sm">Revenue</p>
    <q-separator />
    <q-item clickable v-ripple class="q-pa-none q-">
      <section style="width: 100%" class="row items-center q-ml-sm">
        <div class="col-6 q-mt-md">
          <q-icon color="secondary" size="20px" name="paid" />
          <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
            Salaire mensuel
          </span>

          <p v-if="credential" class="text-grey q-ml-xl">
            {{ user.paie.param.mensuel }}€
          </p>
        </div>
        <div class="col">
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
        <div class="col-6 q-mt-md">
          <q-icon color="secondary" size="20px" name="paid" />
          <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
            Salaire horraire
          </span>

          <p v-if="credential" class="text-grey q-ml-xl">
            {{ user.paie.param.horraire }}€
          </p>
        </div>
        <div class="col">
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
        <div class="col-6 q-mt-md">
          <q-icon color="secondary" size="20px" name="paid" />
          <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
            Salaire annuel
          </span>

          <p v-if="credential" class="text-grey q-ml-xl">{{ user.paie.param.annuel }}€</p>
        </div>
        <div class="col">
          <div class="row justify-end">
            <q-btn round flat color="scondary" icon="arrow_forward_ios" />
          </div>
        </div>
      </section>
    </q-item>
    <q-separator class="q-mb-md" />

    <p style="font-size: 18px" class="q-ma-none q-mt-lg q-ml-sm">Banque</p>
    <q-separator />
    <q-item clickable v-ripple class="q-pa-none q-">
      <section style="width: 100%" class="row items-center q-ml-sm">
        <div class="col-6 q-mt-md">
          <q-icon color="secondary" size="20px" name="account_balance" />
          <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
            Liste de mes comptes
          </span>

          <p v-if="credential" class="text-grey q-ml-xl">
            {{ user.banque.comptes.length
            }}{{ user.banque.comptes.length > 1 ? " comptes" : " compte" }}
          </p>
        </div>
        <div class="col">
          <div class="row justify-end">
            <q-btn round flat color="scondary" icon="arrow_forward_ios" />
          </div>
        </div>
      </section>
    </q-item>
    <q-separator class="q-mb-md" />
    <p style="font-size: 18px" class="q-ma-none q-mt-lg q-ml-sm">Confidentialité</p>
    <q-separator />
    <q-item clickable v-ripple class="q-pa-none q-">
      <section style="width: 100%" class="row items-center q-ml-sm">
        <div class="col-6 q-mt-md q-mb-lg">
          <q-icon color="secondary" size="20px" name="account_balance" />
          <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
            Condition général d'utilisation
          </span>
        </div>
        <div class="col">
          <div class="row justify-end">
            <q-btn round flat color="scondary" icon="arrow_forward_ios" />
          </div>
        </div>
      </section>
    </q-item>
    <q-separator class="q-mb-md" />
    <div class="row justify-center q-mt-lg">
      <q-btn color="negative" flat label="Supprimer mon compte" />
    </div>
  </main>
</template>

<script>
import { useQuasar } from "quasar";
export default {
  data() {
    return {
      user: {},
      utils: useQuasar(),
      credential: null,
    };
  },
  mounted() {
    this.user = this.utils.localStorage.getItem("user");
    this.credential = this.utils.localStorage.getItem("authCredential");
  },
};
</script>
