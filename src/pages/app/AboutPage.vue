<template>
  <main>
    <q-page>
      <q-card>
        <q-btn
          :to="{ name: 'home' }"
          text-color="secondary"
          round
          flat
          icon="arrow_back_ios"
        />
        <q-card-section>
          <div class="row justify-center">
            <q-img
              v-if="utils.screen.lt.md"
              style="width: 80%; height: 80%"
              src="~assets/images/manager.svg"
            />
            <q-img
              v-if="utils.screen.gt.md"
              style="width: 40%; height: 40%"
              src="~assets/images/manager.svg"
            />
          </div>
          <p class="text-center text-primary" style="font-size: 18px">
            Une application pour tous !
          </p></q-card-section
        >
      </q-card>

      <q-card class="q-ma-sm">
        <q-card-section
          ><section class="row items-center">
            <div class="col">
              <p class="text-h6 text-bold">Qui suis-je ?</p>
              <p>Bonjour,</p>
              <p class="text-justify" style="font-size: 14px">
                Je m'appelle Alexis Vedrenne et c'est moi le développeur de cette
                application. J'ai 20 ans et je suis actuellement étudiant en école
                d'ingénieur.
              </p>
            </div>
            <div class="col row justify-center q-ml-sm">
              <q-img v-if="utils.screen.lt.md" src="~assets/images/moi.jpg" />
              <q-img
                style="width: 40%; height: 40%"
                v-if="utils.screen.gt.md"
                src="~assets/images/moi.jpg"
              />
            </div>
          </section>
          <div class="row justify-end">
            <q-btn
              :href="'https://alexisvedrenne.github.io/#/'"
              target="_blank"
              no-caps
              flat
              color="accent"
              label="En savoir plus sur moi"
              icon-right="arrow_circle_right"
            />
          </div>
        </q-card-section>
      </q-card>
      <p class="text-primary text-bold text-h6 q-mr-sm q-ml-sm">Ma mission</p>
      <p
        class="text-justify q-mr-md q-ml-md"
        style="font-color: #616161; font-size: 17px"
      >
        L'objectif de cette application est de faciliter la vie à tous ceux qui voudrons
        l'utiliser. Je voulais créer quelque de chose d'utilisable facilement et de façon
        intuitive. Pour que ceux qui comme moi on du mal à gérer leur quotidien et qui on
        besoin d'aide pour l'organiser un peu mieux chaque jours.
      </p>
      <q-card class="q-ma-sm">
        <q-card-section>
          <p class="text-h6 text-bold">Des idées ?</p>
          <p>
            Je suis ouvert à tout type d'idée. Si vous avez des suggestion ou quelque
            autre information à partager, il ne faut pas hésiter !
          </p>
        </q-card-section>
        <div class="row justify-end">
          <q-btn
            :to="{ name: 'Contact' }"
            no-caps
            flat
            color="accent"
            label="Soumettre une idée"
            icon-right="arrow_circle_right"
          />
        </div>
      </q-card>
    </q-page>
  </main>
</template>

<script>
import { useQuasar } from "quasar";
export default {
  data() {
    return {
      utils: useQuasar(),
    };
  },
};
</script>
