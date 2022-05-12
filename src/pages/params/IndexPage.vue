<template>
  <q-page class="q-mb-xl">
    <q-intersection transition="scale" class="q-ma-sm">
      <p style="font-size: 18px" class="q-ma-none q-mt-lg q-ml-sm">Indentité</p>
      <q-separator />
      <q-item :to="{ name: 'Profil' }" clickable v-ripple class="q-pa-none">
        <section style="width: 100%" class="row items-center q-ml-sm">
          <div class="col q-mt-md">
            <q-icon color="secondary" size="20px" name="account_circle" />
            <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
              Mon profil
            </span>

            <p class="text-grey q-ml-xl">{{ user.prenom }} {{ user.nom }}</p>
          </div>
          <div class="col-1">
            <div class="row justify-end">
              <q-btn round flat color="scondary" icon="arrow_forward_ios" />
            </div>
          </div>
        </section>
      </q-item>
      <q-separator />
      <p style="font-size: 18px" class="q-ma-none q-mt-lg q-ml-sm">Connexion</p>
      <q-separator />
      <q-item @click="email = true" clickable v-ripple class="q-pa-none q-">
        <section style="width: 100%" class="row items-center q-ml-sm">
          <div class="col q-mt-md">
            <q-icon color="secondary" size="20px" name="mail" />
            <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
              Adresse Email
            </span>

            <p v-if="credential" class="text-grey q-ml-xl">
              {{ credential.user.email }}
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
      <q-item @click="phone = true" clickable v-ripple class="q-pa-none q-">
        <section style="width: 100%" class="row items-center q-ml-sm">
          <div class="col q-mt-md">
            <q-icon color="secondary" size="20px" name="call" />
            <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
              Téléphone
            </span>

            <p v-if="credential" class="text-grey q-ml-xl">
              {{ user.phone || "Aucun..." }}
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
      <q-item @click="resetPassword" clickable v-ripple class="q-pa-none q-">
        <section style="width: 100%" class="row items-center q-ml-sm">
          <div class="col q-mt-md">
            <q-icon color="secondary" size="20px" name="lock" />
            <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
              Mot de passe
            </span>

            <p class="text-grey q-ml-xl">********</p>
          </div>
          <div class="col-1">
            <div class="row justify-end">
              <q-btn round flat color="scondary" icon="arrow_forward_ios" />
            </div>
          </div>
        </section>
      </q-item>
      <q-separator />
      <p style="font-size: 18px" class="q-ma-none q-mt-lg q-ml-sm">Heure</p>
      <q-separator />
      <q-item @click="nbHeure = true" clickable v-ripple class="q-pa-none q-">
        <section style="width: 100%" class="row items-center q-ml-sm">
          <div class="col q-mt-md">
            <q-icon color="secondary" size="20px" name="schedule" />
            <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
              Nombre heure semaine
            </span>

            <p v-if="credential" class="text-grey q-ml-xl">
              {{ user.heure.param.nbHeureSemaine }}h
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

      <p style="font-size: 18px" class="q-ma-none q-mt-lg q-ml-sm">Revenue</p>
      <q-separator />
      <q-item @click="salaire = true" clickable v-ripple class="q-pa-none q-">
        <section style="width: 100%" class="row items-center q-ml-sm">
          <div class="col q-mt-md">
            <q-icon color="secondary" size="20px" name="paid" />
            <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
              Salaire mensuel
            </span>

            <p v-if="credential" class="text-grey q-ml-xl">
              {{ user.paie.param.mensuel }}€
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
      <q-item v-ripple class="q-pa-none q-">
        <section style="width: 100%" class="row items-center q-ml-sm">
          <div class="col q-mt-md">
            <q-icon color="secondary" size="20px" name="paid" />
            <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
              Salaire horraire
            </span>

            <p v-if="credential" class="text-grey q-ml-xl">
              {{ user.paie.param.horraire }}€
            </p>
          </div>
        </section>
      </q-item>
      <q-separator class="q-mb-md" />
      <q-separator />
      <q-item v-ripple class="q-pa-none q-">
        <section style="width: 100%" class="row items-center q-ml-sm">
          <div class="col q-mt-md">
            <q-icon color="secondary" size="20px" name="paid" />
            <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
              Salaire annuel
            </span>

            <p v-if="credential" class="text-grey q-ml-xl">
              {{ user.paie.param.annuel }}€
            </p>
          </div>
        </section>
      </q-item>
      <q-separator class="q-mb-md" />

      <p style="font-size: 18px" class="q-ma-none q-mt-lg q-ml-sm">Banque</p>
      <q-separator />
      <q-item :to="{ name: 'Comptes' }" clickable v-ripple class="q-pa-none q-">
        <section style="width: 100%" class="row items-center q-ml-sm">
          <div class="col q-mt-md">
            <q-icon color="secondary" size="20px" name="account_balance" />
            <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
              Liste de mes comptes
            </span>

            <p v-if="credential" class="text-grey q-ml-xl">
              {{ user.banque.comptes.length
              }}{{ user.banque.comptes.length > 1 ? " comptes" : " compte" }}
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
      <p style="font-size: 18px" class="q-ma-none q-mt-lg q-ml-sm">Confidentialité</p>
      <q-separator />
      <q-item target="_blank" :href="'CGU.pdf'" clickable v-ripple class="q-pa-none q-">
        <section style="width: 100%" class="row items-center q-ml-sm">
          <div class="col q-mt-md q-mb-lg">
            <q-icon color="secondary" size="20px" name="account_balance" />
            <span style="font-size: 15px" class="q-ma-none q-ml-sm text-primary">
              Condition général d'utilisation
            </span>
          </div>
          <div class="col-1">
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
    </q-intersection>
    <!-- Les dialog pour les modif des param -->

    <q-dialog full-width persistent v-model="salaire" :position="'bottom'">
      <q-card style="width: 700px; max-width: 80vw">
        <div class="row justify-end">
          <q-btn flat round icon="close" v-close-popup />
        </div>
        <q-card-section>
          <q-form @submit="submit">
            <div class="row justify-center q-mb-md">
              <q-input
                type="text"
                label="Modifier votre revenue mensuel"
                v-model="user.paie.param.mensuel"
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
    <q-dialog full-width persistent v-model="nbHeure" :position="'bottom'">
      <q-card style="width: 700px; max-width: 80vw">
        <div class="row justify-end">
          <q-btn flat round icon="close" v-close-popup />
        </div>
        <q-card-section>
          <q-form @submit="submit">
            <div class="row justify-center q-mb-md">
              <q-input
                type="number"
                label="Modifier votre nombre d'heure par semaine"
                v-model="user.heure.param.nbHeureSemaine"
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
    <q-dialog full-width persistent v-model="phone" :position="'bottom'">
      <q-card style="width: 700px; max-width: 80vw">
        <div class="row justify-end">
          <q-btn flat round icon="close" v-close-popup />
        </div>
        <q-card-section>
          <q-form @submit="submit">
            <div class="row justify-center q-mb-md">
              <q-input
                type="number"
                label="Modifier votre numéro de téléphone"
                v-model="user.phone"
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
    <q-dialog full-width persistent v-model="email" :position="'bottom'">
      <q-card style="width: 700px; max-width: 80vw">
        <div class="row justify-end">
          <q-btn flat round icon="close" v-close-popup />
        </div>
        <q-card-section>
          <q-form @submit="updateProfil">
            <div class="row justify-center q-mb-md">
              <q-input
                type="email"
                label="Modifier votre e-mail"
                v-model="credential.user.email"
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
      salaire: false,
      nbHeure: false,
      email: false,
      phone: false,
      loading: false,
      user: {},
      utils: useQuasar(),
      credential: null,
    };
  },
  mounted() {
    this.user = this.utils.localStorage.getItem("user");
    this.credential = this.utils.localStorage.getItem("authCredential");
  },
  methods: {
    async resetPassword() {
      this.utils.loading.show();
      await this.$store.dispatch("lostPassword", {
        email: this.credential.user.email,
      });
      this.utils.loading.hide();
      await this.$store.dispatch("signLeft");
      this.$router.push({ name: "connexion" });
    },
    async submit() {
      this.loading = true;
      this.user.paie.annuel = this.user.paie.mensuel * 12;
      this.user.paie.horraire =
        this.user.paie.mensuel /
        ((this.user.heure.param.nbHeureSemaine * 52) / this.user.paie.mois);
      await this.$store.dispatch("updateUserInfo", { userInfos: this.user });
      this.loading = false;
      this.phone = false;
      this.nbHeure = false;
      this.salaire = false;
    },
    async updateProfil() {
      this.loading = true;
      await this.$store.dispatch("updateProfil", {
        email: this.credential.user.email,
      });
      this.loading = false;
      this.email = false;
      await this.$store.dispatch("signLeft");
      this.$router.push({ name: "connexion" });
    },
  },
};
</script>
