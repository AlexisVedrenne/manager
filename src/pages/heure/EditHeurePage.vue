<template>
  <main v-if="heure" class="q-mb-xl q-pb-xl">
    <q-card square class="bg-primary"
      ><q-card-section>
        <div class="row items-center justify-center">
          <q-btn
            :to="{ name: 'Fiches heure' }"
            text-color="secondary"
            round
            flat
            icon="arrow_back_ios"
          />
          <p
            class="q-ma-none q-mr-sm text-white text-bold text-center"
            style="font-size: 23px"
          >
            Edition d'une fiche d'heure
          </p>
        </div></q-card-section
      ></q-card
    >
    <div class="column items-center">
      <p
        style="font-size: 20px"
        class="text-center q-ma-none text-grey-8 q-mt-sm"
      >
        {{ heure.nom }}
      </p>
      <q-separator
        color="secondary"
        style="height: 3px; width: 75%"
        spaced
        inset
      />
    </div>
    <q-form @submit="submit" class="q-ma-md">
      <q-file
        v-model="heure.baniere"
        color="secondary"
        class="q-mb-md"
        label="Bannière de la fiche"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="image" />
        </template>
      </q-file>
      <q-input
        v-model="heure.nom"
        color="secondary"
        class="q-mb-md"
        label="Nom de la fiche"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="article" />
        </template>
      </q-input>
      <q-input
        v-model="heure.nomEntreprise"
        color="secondary"
        class="q-mb-md"
        label="Nom de l'entreprise"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="location_city" />
        </template>
      </q-input>
      <div class="row items-center">
        <q-icon color="secondary" name="info" />
        <p class="text-grey q-ma-none q-ml-sm">Ajouter un tag (max 3)</p>
      </div>
      <div class="row items-center">
        <q-btn
          @click="removeTag"
          v-if="heure.tag.length >= 1 || heure.tag.length >= 3"
          flat
          text-color="secondary"
          round
          icon="remove"
        />
        <q-btn
          @click="addTag"
          v-if="heure.tag.length < 3"
          flat
          text-color="secondary"
          round
          icon="add"
        />

        <div v-for="(tag, index) in heure.tag" :key="index">
          <q-popup-edit v-model="heure.tag[index]" auto-save v-slot="scope">
            <q-input
              v-model="heure.tag[index]"
              dense
              autofocus
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
          <q-badge
            class="q-mr-sm"
            color="accent"
            rounded
            outline
            style="height: 25px"
            :label="tag"
          />
        </div>
      </div>
      <div class="row items-center q-mb-md">
        <q-icon size="18px" color="secondary" name="description" />
        <p style="font-size: 18px" class="text-grey q-ma-none q-ml-sm">
          Description du travail réaliser
        </p>
      </div>
      <q-editor
        v-model="heure.description"
        :dense="utils.screen.lt.md"
        :toolbar="[
          [
            {
              label: utils.lang.editor.align,
              icon: utils.iconSet.editor.align,
              fixedLabel: true,
              list: 'only-icons',
              options: ['left', 'center', 'right', 'justify'],
            },
            {
              label: utils.lang.editor.align,
              icon: utils.iconSet.editor.align,
              fixedLabel: true,
              options: ['left', 'center', 'right', 'justify'],
            },
          ],
          ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
          ['token', 'hr', 'link', 'custom_btn'],
          ['print', 'fullscreen'],
          [
            {
              label: utils.lang.editor.formatting,
              icon: utils.iconSet.editor.formatting,
              list: 'no-icons',
              options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
            },
            {
              label: utils.lang.editor.fontSize,
              icon: utils.iconSet.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'size-1',
                'size-2',
                'size-3',
                'size-4',
                'size-5',
                'size-6',
                'size-7',
              ],
            },
            {
              label: utils.lang.editor.defaultFont,
              icon: utils.iconSet.editor.font,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'default_font',
                'arial',
                'arial_black',
                'comic_sans',
                'courier_new',
                'impact',
                'lucida_grande',
                'times_new_roman',
                'verdana',
              ],
            },
            'removeFormat',
          ],
          ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

          ['undo', 'redo'],
          ['viewsource'],
        ]"
        :fonts="{
          arial: 'Arial',
          arial_black: 'Arial Black',
          comic_sans: 'Comic Sans MS',
          courier_new: 'Courier New',
          impact: 'Impact',
          lucida_grande: 'Lucida Grande',
          times_new_roman: 'Times New Roman',
          verdana: 'Verdana',
        }"
      />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          :loading="loading"
          type="submit"
          fab
          icon="done"
          color="accent"
        />
      </q-page-sticky>
      <q-page-sticky position="bottom-left" :offset="[18, 18]">
        <q-btn
          :to="{ name: 'Fiches heure' }"
          fab
          icon="close"
          color="negative"
        />
      </q-page-sticky>
    </q-form>
  </main>
</template>

<script>
import { useQuasar } from "quasar";
export default {
  data() {
    return {
      loading: false,
      utils: useQuasar(),
      heure: null,
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
      if (heure.heureSupp != "00:00:00") {
        let heureSupp = new Date(heure.heureSupp);
        hours =
          heureSupp.getHours() < 9
            ? "0" + heureSupp.getHours()
            : heureSupp.getHours();
        minutes =
          heureSupp.getMinutes() < 9
            ? "0" + heureSupp.getMinutes()
            : heureSupp.getMinutes();
        seconds =
          heureSupp.getSeconds() < 9
            ? "0" + heureSupp.getSeconds()
            : heureSupp.getSeconds();
        heure.heureSupp = hours + ":" + minutes + ":" + seconds;
      }
      heure.heureTotal = heureTotal;
    }
    this.heure = heure;
  },
  methods: {
    async submit() {
      this.loading = true;
      await this.$store.dispatch("editFiche", {
        fiche: this.heure,
        index: this.$route.params.index,
      });
      this.loading = false;
      this.$router.push({ name: "Fiches heure" });
    },
    addTag() {
      this.heure.tag.push("tag");
    },
    removeTag() {
      this.heure.tag.pop();
    },
  },
};
</script>
