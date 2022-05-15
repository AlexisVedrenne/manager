<template>
  <q-page>
    <main>
      <section class="row justify-center q-mb-xl">
        <img
          v-if="utils.screen.lt.md"
          style="width: 80%; height: 80%"
          src="~assets/images/logo.svg"
        />
        <img
          v-if="utils.screen.gt.md"
          style="width: 25%; height: 25%"
          src="~assets/images/logo.svg"
        />
      </section>
      <p class="text-center" style="font-size: 18px">Centre des téléchargements</p>
      <q-card class="q-mb-xl" flat square>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="secondary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="Android" label="Android" />
          <q-tab name="IOS" label="IOS" />
          <q-tab name="Bureau" label="Bureau" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="Android">
            <p class="text-center text-bold" style="font-size: 16px">
              Rendez-vous sur le google play
            </p>
            <p class="text-center text-accent" style="font-size: 25px">OU</p>
            <div v-if="apks">
              <div class="row justify-center q-col-gutter-sm">
                <div class="col-md-4" v-for="(download, index) in apks.docs" :key="index">
                  <DownloadCard :download="download.data()" />
                </div>
              </div>
              <div v-if="apks.docs.length == 0">
                <p class="text-center text-grey">
                  Aucune version disponible pour cette platforme...
                </p>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="IOS">
            <p class="text-center text-bold" style="font-size: 16px">
              Rendez-vous sur l'apple store
            </p>
            <p class="text-center text-accent" style="font-size: 25px">OU</p>
            <div v-if="ioss">
              <div class="row justify-center q-col-gutter-sm">
                <div class="col-md-4" v-for="(download, index) in ioss.docs" :key="index">
                  <DownloadCard :download="download.data()" />
                </div>
              </div>
              <div v-if="ioss.docs.length == 0">
                <p class="text-center text-grey">
                  Aucune version disponible pour cette platforme...
                </p>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="Bureau">
            <div v-if="deskops">
              <div class="row justify-center q-col-gutter-sm">
                <div
                  class="col-md-4"
                  v-for="(download, index) in deskops.docs"
                  :key="index"
                >
                  <DownloadCard :download="download.data()" />
                </div>
              </div>
              <div v-if="deskops.docs.length == 0">
                <p class="text-center text-grey">
                  Aucune version disponible pour cette platforme...
                </p>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </main>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import DownloadCard from "components/app/DownloadCard.vue";
export default {
  components: {
    DownloadCard,
  },
  data() {
    return {
      utils: useQuasar(),
      tab: "Android",
      apks: null,
      ioss: null,
      deskops: null,
    };
  },
  async mounted() {
    this.apks = await this.$store.dispatch("fetchExecutable", {
      platforme: "android",
    });
    this.ioss = await this.$store.dispatch("fetchExecutable", {
      platforme: "IOS",
    });
    this.deskops = await this.$store.dispatch("fetchExecutable", {
      platforme: "windows",
    });
  },
};
</script>
