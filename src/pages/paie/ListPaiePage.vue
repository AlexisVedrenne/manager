<template>
  <main>
    <q-card square class="bg-primary"
      ><q-card-section>
        <section class="row">
          <q-select
            v-model="annee"
            :options="anneeOptions"
            input-class="text-center"
            class="col q-mr-sm"
            rounded
            outlined
            color="primary"
            bg-color="secondary"
            label-color="primary"
            label="Année"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="event" />
            </template>
          </q-select>
          <q-select
            v-model="mois"
            @update:model-value="filtre"
            :options="options"
            input-class="text-center"
            class="col q-ml-sm"
            rounded
            outlined
            color="primary"
            bg-color="secondary"
            label-color="primary"
            label="Mois"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="event" />
            </template>
          </q-select></section></q-card-section
    ></q-card>
    <q-input
      v-model="search"
      color="secondary"
      rounded
      outlined
      class="q-ma-md"
      label="Rechercher une fiche..."
    >
      <template v-slot:prepend> <q-icon name="search" /> </template
    ></q-input>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" :to="{ name: 'Ajout paie' }" color="secondary" />
    </q-page-sticky>
  </main>
</template>

<script>
export default {
  data() {
    return {
      paie: [],
    };
  },
};
</script>
