<template>
  <main>
    <q-card
      ><q-img
        placeholder-src="~assets/images/heure.png"
        loading="lazy"
        height="100px"
        :src="fiche.baniere !== null ? fiche.baniere : 'images/heure.png'"
      />
      <q-card-section>
        <div class="row">
          <div class="col">
            <p style="font-size: 20px">{{ fiche.nom }}</p>
            <q-separator
              color="secondary"
              style="height: 3px; width: 65%"
              spaced
            />
            <p class="text-grey">{{ fiche.date }}</p>
          </div>
          <div class="col">
            <div class="row justify-end">
              <q-btn
                @click="this.$emit('detail')"
                size="20px"
                style="width: 110px"
                rounded
                no-caps
                color="accent"
                label="Voir"
              />
            </div>
          </div>
        </div>
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
        <div class="row justify-end">
          <q-btn-group flat>
            <q-btn
              @click="this.$emit('edit')"
              class="q-pa-sm"
              text-color="secondary"
              icon="edit"
            />
            <q-btn
              @click="this.$emit('delete')"
              class="q-pa-sm"
              text-color="negative"
              icon="delete"
            />
            <q-btn class="q-pa-sm" text-color="accent" icon="share" />
          </q-btn-group>
        </div>
      </q-card-section>
    </q-card>
  </main>
</template>
<script>
export default {
  props: {
    fiche: {
      type: Object,
      required: true,
    },
  },
};
</script>
