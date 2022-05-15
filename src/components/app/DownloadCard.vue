<template>
  <q-card>
    <q-card-section
      ><div class="row">
        <div class="col">
          <p class="q-ma-none" style="font-size: 20px">{{ download.nom }}</p>
          <p class="text-grey">{{ download.version }}</p>
        </div>
        <div class="col">
          <q-img src="~assets/images/logo.svg" style="heigth: 100px; width: 100px" />
          <q-btn
            target="_blank"
            :href="download.url"
            color="secondary"
            push
            no-caps
            label="Télécharger"
          />
        </div></div
    ></q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    download: {
      type: Object,
      required: true,
    },
  },
};
</script>
