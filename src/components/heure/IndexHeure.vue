<template>
  <div>
    <div class="row justify-center">
      <q-btn
        @click="helpStart"
        style="border-radius: 100px"
        color="accent"
        label="Besoin d'aide ?"
        no-caps
        icon="help"
      />
    </div>
    <p class="text-center text-grey-8 q-pr-lg q-pl-lg" style="font-size: 30px">
      Commencer le travail ?
    </p>
    <div class="row justify-center q-mb-md">
      <q-btn
        push
        v-touch-hold:2000.mouse="stop"
        :icon="icon"
        @click="start()"
        round
        color="secondary"
        size="50px"
      />
    </div>

    <p id="time" class="text-center text-grey" style="font-size: 18px">
      Cliquer sur le bouton...
    </p>
    <p v-if="journer.start.parse" class="text-grey-8 q-ml-md" style="font-size: 20px">
      Détail de votre journée
    </p>
    <q-card class="q-ml-md q-mr-md q-mb-md" v-if="journer.start.parse"
      ><q-card-section>
        <div class="row items-center">
          <q-icon size="40px" color="secondary" name="calendar_today" />
          <span class="text-grey q-ml-sm" style="font-size: 15px"
            >Travail commencé à <strong>{{ journer.start.parse }}</strong></span
          >
        </div></q-card-section
      ></q-card
    >
    <q-card
      class="q-ml-lg q-mr-lg q-mb-md"
      v-for="(event, index) in journer.event.list"
      :key="index"
    >
      <q-card-section>
        <div class="row items-center">
          <q-icon size="40px" color="accent" name="event_available" />
          <span class="text-grey q-ml-sm" style="font-size: 15px"
            >Pause {{ event.type }} <strong>{{ event.value }}</strong></span
          >
        </div></q-card-section
      >
    </q-card>
    <q-card class="q-ml-md q-mr-md q-mb-md" v-if="journer.end.parse"
      ><q-card-section>
        <div class="row items-center">
          <q-icon size="40px" color="secondary" name="calendar_today" />
          <span class="text-grey q-ml-sm" style="font-size: 15px"
            >Travail terminé à <strong>{{ journer.end.parse }}</strong></span
          >
        </div></q-card-section
      ></q-card
    >
    <q-dialog v-model="help"
      ><q-card>
        <div class="row justify-end items-center">
          <q-btn flat v-close-popup icon="close" />
        </div>
        <q-card-section>
          <p class="q-ma-none text-h6">Utilisation de la fonctionalitée</p>
        </q-card-section>
        <q-stepper v-model="step" flat vertical color="secondary" animated>
          <q-step :name="1" title="Démarrage" icon="start" :done="step > 1">
            <p>
              Pour commencer il vous suffit de cliqué sur le gros bouton orange, vous
              verrez que l'icon va passer de :
            </p>
            <div class="row justify-center">
              <q-icon color="secondary" size="50px" name="schedule" />
            </div>
            <p>à :</p>

            <div class="row justify-center">
              <q-icon color="secondary" size="50px" name="pause" />
            </div>
            <p>
              Cela signifie que l'application commence à compter les heures.On peut
              s'apercevoir que le compteur juste en dessous du bouton commence à tourner.
            </p>

            <q-stepper-navigation>
              <q-btn @click="step = 2" color="primary" no-caps label="Suivant" />
            </q-stepper-navigation>
          </q-step>

          <q-step :name="2" title="Les pauses" icon="pause" :done="step > 2">
            <p>
              Si vous voulez dire que vous etes en pause, il vous suffit de cliqué une
              seule fois sur le bouton. Son icon va encore changé et un événement sera
              inscrit dans le récapitulatif de la journée.
            </p>
            <div class="row justify-center">
              <q-icon color="secondary" size="50px" name="play_arrow" />
            </div>
            <p>
              Quand cette icon est affachiché cela signifit que vous etes actuellement en
              pause. Pour reprendre le travail il vous suffit de re-cliqué sur le bouton
              et le chronomètre reprendra.
            </p>

            <q-stepper-navigation>
              <q-btn @click="step = 3" color="primary" no-caps label="Suivant" />
              <q-btn
                flat
                no-caps
                @click="step = 1"
                color="primary"
                label="Retour"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </q-step>

          <q-step :name="3" title="Stoper" icon="stop" :done="step > 3">
            <p>
              Pour dire que vous arrêtez le travail, il faut seulement resté
              <strong>appuyer 2 secondes</strong> sur le bouton quand le chronomètre est
              en marche. Le système va générer une fiche de travail partiellement
              complété, que l'on pourra compléter sur l'instant ou plus tard.
            </p>

            <q-stepper-navigation>
              <q-btn @click="step = 4" color="primary" no-caps label="Suivant" />
              <q-btn
                flat
                no-caps
                @click="step = 2"
                color="primary"
                label="Retour"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </q-step>
          <q-step :name="4" title="Fin" icon="arrow_back">
            <q-card flat class="bg-info q-mb-sm"
              ><q-card-section
                >Note : Si vous quittez l'application ou vous vous deconnectez. Le système
                reprendra toujours le dernier état dans lequelle se trouvé le
                compteur.</q-card-section
              ></q-card
            >
            <p>
              Vous avez terminé ! Vous pouvez maintenant utilisé cette fonctionalitée sans
              soucis !
            </p>

            <q-stepper-navigation>
              <q-btn
                v-close-popup
                @click="step = 4"
                color="primary"
                no-caps
                label="Terminé"
              />
              <q-btn
                flat
                no-caps
                @click="step = 3"
                color="primary"
                label="Retour"
                class="q-ml-sm"
              />
            </q-stepper-navigation> </q-step></q-stepper
      ></q-card>
    </q-dialog>
  </div>
</template>

<script>
import timer from "src/boot/Timer"; // Récupére l'object timer qui permet de gérer le chrono
import { useQuasar } from "quasar";
import Store from "src/store";
var store = Store();

// ---- Liaison de la valeur du chrono à l'affichage ----
timer.timer.addEventListener("secondsUpdated", async function () {
  try {
    document.getElementById("time").innerText = timer.timer.getTimeValues().toString();
    await store.dispatch("setWorkTime", {
      time: timer.timer.getTimeValues(),
    });
  } catch (error) {
    timer.timer.stop();
  }
});
// ---- Liaison de la valeur du chrono à l'affichage ----
export default {
  data() {
    return {
      step: 1,
      help: false,
      icon: "schedule",
      firstStart: false,
      utils: useQuasar(),
      user: null,
      date: null,
      journer: {
        //Représente les informations de la journée
        start: { value: null, parse: null },
        status: 0,
        event: { index: [], list: [] },
        end: { value: null, parse: null },
      },
    };
  },
  async mounted() {
    this.date = new Date();
    await this.timeDataCloud(); //Permet de charger les données relative à la journée en cours et calcule les heures passée
  },
  methods: {
    helpStart() {
      (this.help = true), (this.step = 1);
    },
    async stop() {
      if (timer.timer.isRunning()) {
        this.journer.end.value = new Date(); //Récupération de la date à laquel la journée s'est terminé
        let value = this.journer.end.value; // ---- Convertion des données relative à la fin de journée en chaine ---
        this.journer.end.parse = this.journer.end.parse =
          value.getHours() + ":" + value.getMinutes(); // ---- Convertion des données relative à la fin de journée en chaine ---
        timer.timer.pause(); //Arret de chrono
        timer.timer.stop(); //Arret de chrono
        this.icon = "schedule";
        this.firstStart = false;
        document.getElementById("time").innerText = "Cliquer sur le bouton...";
        this.utils.localStorage.set("dayly", "null"); //Mise à zéro des informations de la journée.
        let index = await this.$store.dispatch("endDay"); //Lancement de la fonction qui va générer la fiche
        this.utils.localStorage.set("workTime", "null"); //Mise à zéro des informations de la journée.
        this.utils.notify({
          // Création de la notification
          progress: true,
          icon: "error",
          textColor: "secondary",
          message: "Votre fiche de travail à été partiellement complété.",
          color: "primary",
          actions: [
            {
              label: "Compléter",
              color: "secondary",
              noCaps: true,
              handler: () => {
                this.$router.push("/heure/edit/" + index); //Permet de rediriger sur la page d'édition de la fiche que vient d'être créer.
              },
            },
            {
              noCaps: true,
              label: "Compléter plus tard",
              color: "secondary",
              handler: () => {
                /* ... */
              },
            },
          ],
        });
      }
    },
    async timeDataCloud() {
      let user = await this.$store.dispatch("getUserInfo"); // Récupérer les informations de l'utilisateur connecté
      if (user.heure.dayly.start.value) {
        // Vérifie si l'utilisateur est en cours de travail
        document.getElementById("time").innerText = "Chargement..."; // Affiche 'Chargement' sur l'écran
        if (user.heure.dayly.status === 1) {
          // Test si l'utilisateur est en pause
          let value = { hours: null, minutes: null, seconds: null };
          let dayly = user.heure.dayly; // Récupére les informations de la journée
          this.journer = dayly;
          this.utils.localStorage.set("dayly", this.journer); // Enregistre les données relatif à la journée dans le stockage local
          let start = new Date(dayly.start.value);
          let tempsTotalPause = this.getTimePause(); // Fonction qui récupére les temps total de toute les pauses
          let timeNow = this.date.getTime(this.date); //---- Calcule du temps de travail ----
          let timeStarted = start.getTime(start);
          let diff = timeNow - timeStarted;
          let time = diff - tempsTotalPause;
          let timeDiff = new Date(time); //
          value.hours = timeDiff.getHours() - 1; //
          value.minutes = timeDiff.getMinutes(); //
          value.seconds = timeDiff.getSeconds(); //
          this.icon = "play_arrow"; //---- Calcule du temps de travail ----
          timer.timer.start({ startValues: value }); // Lance le chronomètre avec le valeur choisis
          timer.timer.pause(); // Met en pause
          document.getElementById(
            "time"
          ).innerText = timer.timer.getTimeValues().toString(); //Lie le resultat du timer au champs d'affichage de l'interface
        } else {
          let value = { hours: null, minutes: null, seconds: null };
          let dayly = user.heure.dayly;
          this.journer = dayly;
          this.utils.localStorage.set("dayly", this.journer);
          let start = new Date(dayly.start.value);
          let tempsTotalPause = this.getTimePause();
          let timeNow = this.date.getTime(this.date);
          let timeStarted = start.getTime(start);
          let diff = timeNow - timeStarted;
          let time = diff - tempsTotalPause;
          let timeDiff = new Date(time);
          value.hours = timeDiff.getHours() - 1;
          value.minutes = timeDiff.getMinutes();
          value.seconds = timeDiff.getSeconds();
          timer.timer.start({ startValues: value });
          this.icon = "pause";
        }
        this.firstStart = true;
        return;
      }
    },
    async start() {
      if (!this.firstStart) {
        // Détermine si le chrono à déjà été lancer
        this.journer = {
          // initialise l'objet qui contient toute les informations de la journée
          start: { value: null, parse: null },
          status: 0,
          event: { index: [], list: [] },
          end: { value: null, parse: null },
        };
        timer.timer.start(); //Lance le chrono
        this.journer.start.value = new Date(); // Initialise la date et l'heure à laquelle le travail à commencé
        let value = this.journer.start.value; // ---- Converti les information de la date en heure d'affichage ----
        this.journer.start.parse = this.journer.start.parse =
          (value.getHours() < 9 ? "0" + value.getHours() : value.getHours()) +
          ":" +
          (value.getMinutes() < 9 ? "0" + value.getMinutes() : value.getMinutes());
        this.journer.start.value = this.journer.start.value.getTime(
          this.journer.start.value
        ); // ---- Converti les information de la date en heure d'affichage ----
        this.utils.localStorage.set("dayly", this.journer); //Enregistre les informations de la journée dans le stockage local
        this.firstStart = true; // Définit que le chronomètre est bien déjà était lancer une fois
        this.icon = "pause";
        await this.$store.dispatch("setStartWork", {
          time: this.journer.start,
        }); // Enregistre les informations de la journée dans la base de donnée
        return;
      }
      if (timer.timer.isPaused()) {
        let tmpDate = new Date();
        let time = tmpDate.getTime();
        tmpDate =
          (tmpDate.getHours() < 9 ? "0" + tmpDate.getHours() : tmpDate.getHours()) +
          ":" +
          (tmpDate.getMinutes() < 9 ? "0" + tmpDate.getMinutes() : tmpDate.getMinutes());
        this.journer.event.list.push({
          time: time,
          value: tmpDate,
          type: "terminé à",
        });
        let index = this.journer.event.list.length - 2;
        if (!this.journer.event.index.includes(index)) {
          this.journer.event.index.push(index);
        }
        this.journer.status = 0;
        let dayly = this.utils.localStorage.getItem("dayly");
        dayly.event = this.journer.event;
        dayly.status = this.journer.status;
        this.utils.localStorage.set("dayly", dayly);
        await this.$store.dispatch("addEventDay", {
          event: dayly.event,
          status: this.journer.status,
        });

        this.icon = "pause";
        timer.timer.start();
        return;
      }
      if (timer.timer.isRunning()) {
        // Test si le chrono est lancé
        let tmpDate = new Date();
        let time = tmpDate.getTime();
        tmpDate = // --- Converti l'affichage pour mettre dans le détail de la journée ----
          (tmpDate.getHours() < 9 ? "0" + tmpDate.getHours() : tmpDate.getHours()) +
          ":" +
          (tmpDate.getMinutes() < 9 ? "0" + tmpDate.getMinutes() : tmpDate.getMinutes());
        this.journer.event.list.push({
          time: time,
          value: tmpDate,
          type: "prise à",
        });
        let index = this.journer.event.list.length - 1;
        if (!this.journer.event.index.includes(index)) {
          this.journer.event.index.push(index);
        } // --- Converti l'affichage pour mettre dans le détail de la journée ----
        this.journer.status = 1; // Met à jour les informations de la journée à en pause
        let dayly = this.utils.localStorage.getItem("dayly"); // Récupére les information de la journée
        dayly.event = this.journer.event;
        dayly.status = this.journer.status;
        this.utils.localStorage.set("dayly", dayly); // Met à jour les informations de la jounrée dans le sotckge local
        await this.$store.dispatch("addEventDay", {
          event: dayly.event,
          status: this.journer.status,
        }); // Met à jour les informations de la jounrée dans la base de donnée
        this.icon = "play_arrow";
        timer.timer.pause(); // Met en pause le chrono
        return;
      }
    },
    getTimePause() {
      let totalPause = 0;
      try {
        for (let i = 0; i < this.journer.event.index.length; i++) {
          let index = this.journer.event.index[i];
          let debut = new Date(this.journer.event.list[index].time);
          let fin = new Date(this.journer.event.list[index + 1].time);
          let tempsPause = fin.getTime(fin) - debut.getTime(debut);
          totalPause += tempsPause;
        }
        return totalPause;
      } catch (error) {
        return totalPause;
      }
    },
  },
};
</script>
