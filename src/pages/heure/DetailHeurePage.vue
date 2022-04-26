<template>
  <main>
    <q-card square class="bg-primary text-white"
      ><q-card-section class="column items-center">
        <div class="row items-center justify-center">
          <q-btn
            :to="{ name: 'Heure' }"
            text-color="secondary"
            round
            flat
            icon="arrow_back_ios"
          />
          <div class="column items-center">
            <p class="text-center q-ma-none" style="font-size: 25px">
              {{ fiche.nom }}
            </p>
            <q-separator color="secondary" style="height: 3px; width: 110%" />
          </div>
        </div> </q-card-section
    ></q-card>
    <q-parallax :height="200" :speed="0.5">
      <template v-slot:media>
        <img
          :src="fiche.baniere !== null ? fiche.baniere : 'images/heure.png'"
        />
      </template>

      <h1 class="text-white text-center">{{ fiche.nomEntreprise }}</h1>
    </q-parallax>
    <div class="row justify-center q-mt-md">
      <q-badge
        class="q-mr-sm"
        style="height: 25px"
        v-for="(tag, index) in fiche.tag"
        :key="index"
        rounded
        outline
        color="accent"
        :label="tag"
      />
    </div>
    <p style="font-size: 18px" class="text-grey-7 text-center q-ma-md">
      Travail réaliser le {{ fiche.date }}
    </p>
    <section class="q-ma-md">
      <p class="text-primary q-ma-none q-ml-sm">Description</p>
      <q-separator color="secondary" style="height: 2px; width: 30%" />
      <p
        class="text-primary text-justify q-ma-md"
        style="font-size: 16px"
        v-html="
          fiche.description != '' ? fiche.description : 'Aucune description...'
        "
      />

      <p
        class="q-ml-sm text-primary text-bold q-ma-none"
        style="font-size: 15px"
      >
        Heure travaillée
      </p>
      <q-separator color="secondary" style="height: 2px; width: 30%" />
      <section class="row justify-center q-mt-lg">
        <div class="col">
          <p class="text-primary text-bold text-center" style="font-size: 15px">
            Total
          </p>
          <p class="text-primary text-center text-bold" style="font-size: 40px">
            {{
              fiche.heureTotal != "NaN:NaN:NaN" ? fiche.heureTotal : "00:00:00"
            }}
          </p>
        </div>
        <span class="vertical text-grey"></span>
        <div class="col">
          <p class="text-primary text-bold text-center" style="font-size: 15px">
            Supplémentaire
          </p>
          <p class="text-primary text-center text-bold" style="font-size: 40px">
            {{ fiche.heureSupp }}
          </p>
        </div>
      </section>
    </section>
  </main>
</template>

<script>
import { useQuasar } from "quasar";
export default {
  data() {
    return {
      fiche: {},
      utils: useQuasar(),
    };
  },
  mounted() {
    let user = this.utils.localStorage.getItem("user");
    let heure = user.heure.fiches[this.$route.params.index];
    if (!heure.heureTotal.toString().includes(":")) {
      let heureTotal = new Date(heure.heureTotal);
      let hours =
        heureTotal.getHours() < 9
          ? "0" + heureTotal.getHours()
          : heureTotal.getHours();
      let minutes =
        heureTotal.getMinutes() < 9
          ? "0" + heureTotal.getMinutes()
          : heureTotal.getMinutes();
      let seconds =
        heureTotal.getSeconds() < 9
          ? "0" + heureTotal.getSeconds()
          : heureTotal.getSeconds();
      heureTotal = hours + ":" + minutes + ":" + seconds;
      if (heure.heureSupp !== "00:00:00") {
        let heureSupp = new Date(heure.heureSupp);
        console.log(heureSupp);
        hours =
          heureSupp.getHours() < 9
            ? "0" + heureSupp.getHours() - 1
            : heureSupp.getHours() - 1;
        minutes =
          heureSupp.getMinutes() < 9
            ? "0" + heureSupp.getMinutes()
            : heureSupp.getMinutes();
        seconds =
          heureSupp.getSeconds() < 9
            ? "0" + heureSupp.getSeconds()
            : heureSupp.getSeconds();
        let res = hours + ":" + minutes + ":" + seconds;
        heure.heureSupp = res;
      }
      heure.heureTotal = heureTotal;
    }

    this.fiche = heure;
  },
};
</script>

<style>
.vertical {
  border-left: 2px solid;
  height: 100px;
  display: inline-block;
}
</style>
