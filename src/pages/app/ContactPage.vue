<template>
  <main>
    <q-page>
      <q-card class="bg-secondary">
        <q-card-section>
          <p class="text-primary text-h6 text-center q-mb-lg text-bold">
            Besoin de me contacter ?
          </p>
          <p class="text-white text-center text-bold" style="font-size: 16px">
            Vous pouvez me contacter à tous moment en utilisant la messagerie interne ci
            dissous ou en utilisant d'autre moyen mis à disposition.
          </p>
          <div class="row justify-around">
            <div class="column items-center">
              <q-btn class="q-mb-sm" size="18px" round color="primary" icon="mail" />
              <p style="font-size: 12px" class="text-white">Envoyer un e-mail</p>
            </div>
            <div class="column items-center">
              <q-btn class="q-mb-sm" size="18px" round color="primary" icon="share" />
              <p class="text-white" style="font-size: 12px">Partager l'application</p>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <p
        class="q-mb-none text-center text-bold q-mt-lg q-pa-none"
        style="font-size: 20px"
      >
        Envoyer moi un message
      </p>
      <div class="q-pa-none row justify-center">
        <q-separator
          class="q-pa-none q-ma-none"
          color="accent"
          style="height: 4px; width: 50%"
          spaced
          inset
        />
      </div>
      <q-form class="q-pa-sm" @submit="submit">
        <q-input
          type="email"
          v-model="contact.email"
          class="q-mb-sm"
          color="secondary"
          label="e-mail"
          lazy-rules
          :rules="[
            (val) =>
              (val.includes('@') && val.includes('.')) ||
              'Entrer une adresse e-mail valide !',
          ]"
        >
          <template v-slot:prepend>
            <q-icon color="primary" name="mail" />
          </template>
        </q-input>
        <q-input
          type="text"
          v-model="contact.nomPrenom"
          class="q-mb-sm"
          color="secondary"
          label="Nom et prénom"
          lazy-rules
          :rules="[(val) => val != '' || 'Entrer votre nom et votre prénom !']"
        >
          <template v-slot:prepend>
            <q-icon color="primary" name="person" />
          </template>
        </q-input>
        <q-input
          type="text"
          v-model="contact.object"
          class="q-mb-sm"
          color="secondary"
          label="Objet"
          lazy-rules
          :rules="[(val) => val != '' || 'Entrer le sujet du message']"
        >
          <template v-slot:prepend>
            <q-icon color="primary" name="title" />
          </template>
        </q-input>
        <p class="text-center text-bold">Entrer votre message ici</p>
        <q-editor
          v-model="contact.message"
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
        <div class="row justify-center q-mt-md">
          <q-btn type="submit" color="accent" no-caps label="Envoyer" icon-right="send" />
        </div>
      </q-form>
    </q-page>
  </main>
</template>
<script>
import { useQuasar } from "quasar";
export default {
  data() {
    return {
      contact: {
        email: "",
        nomPrenom: "",
        object: "",
        message: "",
      },
      utils: useQuasar(),
    };
  },
  methods: {
    submit() {},
  },
};
</script>
