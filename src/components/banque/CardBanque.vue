<template>
  <q-card>
    <q-card-section>
      <div class="row">
        <p class="q-ma-none">
          {{ compte.type }}
        </p>
      </div>

      <div class="row items-center">
        <q-icon size="40px" color="secondary" name="savings" />
        <div class="col row justify-center text-grey">
          {{ compte.nom }}
        </div>
        <div class="row items-center justify-end">
          <p
            style="font-size: 15px"
            :class="'q-mb-none ' + (compte.solde < 0 ? 'text-negative' : 'text-positive')"
          >
            {{ compte.solde < 0 ? "-" + compte.solde : "+" + compte.solde }}€
          </p>
        </div>
        <div class="q-ml-md">
          <div class="row justify-end">
            <q-btn round flat color="scondary" icon="arrow_forward_ios" />
          </div>
        </div></div></q-card-section
  ></q-card>
</template>

<script>
export default {
  props: {
    compte: {
      type: Object,
      required: true,
    },
  },
};
</script>
