<template>
  <q-card>
    <q-card-section>
      <div class="row">
        <div class="col">
          <p class="q-ma-none text-h6">{{ fichePaie.nomEntreprise }}</p>
          <q-separator color="secondary" style="height: 3px; width: 65%" spaced />
          <p class="text-grey q-ma-none">{{ fichePaie.mois }} {{ fichePaie.annee }}</p>
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
      <div class="q-ml-lg q-mt-lg">
        <p class="text-grey-8 q-ma-none" style="font-size: 40px">
          {{ fichePaie.montant }}€
        </p>
      </div>
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
</template>

<script>
export default {
  props: {
    paie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fichePaie: this.paie,
    };
  },
};
</script>
