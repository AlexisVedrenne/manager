<template>
  <q-card>
    <q-card-section
      ><div class="row">
        <p class="q-ma-none">
          {{ op.typeOp }} <span class="text-grey">{{ op.date }}</span>
        </p>
      </div>

      <div class="row items-center">
        <q-icon
          size="40px"
          color="secondary"
          :name="
            op.typeOp == 'Internet'
              ? 'language'
              : op.typeOp === 'Restauration'
              ? 'restaurant'
              : op.typeOp === 'Voyage'
              ? 'flight'
              : op.typeOp === 'Transport'
              ? 'directions_bus'
              : op.typeOp === 'Alimentation'
              ? 'shopping_cart'
              : op.typeOp === 'Jeux'
              ? 'sports_esports'
              : op.typeOp === 'Multimédia'
              ? 'subscriptions'
              : op.typeOp === 'Virement'
              ? 'receipt_long'
              : ''
          "
        />
        <div class="col row justify-center text-grey">
          {{ op.libelle }}
        </div>
        <div class="row items-center justify-end">
          <p
            style="font-size: 15px"
            :class="
              'q-mb-none ' + (op.type === 'Virement' ? 'text-positive' : 'text-negative')
            "
          >
            {{ op.type === "Virement" ? "+" + op.montant : "-" + op.montant }}€
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
        </div></div
    ></q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    op: {
      type: Object,
      required: true,
    },
  },
};
</script>
