<template>
  <q-card class="my-box cursor-pointer q-hoverable scale-hover">
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
            {{ compte.solde < 0 ? compte.solde : "+" + compte.solde }}€
          </p>
        </div>
        <div class="q-ml-md">
          <div class="row justify-end">
            <q-btn
              @click="this.$emit('detail')"
              round
              flat
              color="scondary"
              icon="arrow_forward_ios"
            />
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

<style>
.scale-hover {
  position: relative;
  -webkit-transition: all 200ms ease-in;
  -webkit-transform: scale(1);
  -ms-transition: all 200ms ease-in;
  -ms-transform: scale(1);
  -moz-transition: all 200ms ease-in;
  -moz-transform: scale(1);
  transition: all 200ms ease-in;
  transform: scale(1);
}
.scale-hover:hover {
  box-shadow: 0px 0px 150px #000000;
  z-index: 1;
  -webkit-transition: all 200ms ease-in;
  -webkit-transform: scale(1.005);
  -ms-transition: all 200ms ease-in;
  -ms-transform: scale(1.005);
  -moz-transition: all 200ms ease-in;
  -moz-transform: scale(1.005);
  transition: all 200ms ease-in;
  transform: scale(1.005);
}
</style>
