<template>
  <div>
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
  </div>
</template>

<script>
import timer from "src/boot/Timer";
import { useQuasar } from "quasar";
import Store from "src/store";
var store = Store();
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
export default {
  data() {
    return {
      icon: "schedule",
      firstStart: false,
      utils: useQuasar(),
      user: null,
      date: null,
      journer: {
        start: { value: null, parse: null },
        status: 0,
        event: { index: [], list: [] },
        end: { value: null, parse: null },
      },
    };
  },
  async mounted() {
    this.date = new Date();
    await this.timeDataCloud();
  },
  methods: {
    async stop() {
      if (timer.timer.isRunning()) {
        this.journer.end.value = new Date();
        let value = this.journer.end.value;
        this.journer.end.parse = this.journer.end.parse =
          value.getHours() + ":" + value.getMinutes();
        timer.timer.pause();
        timer.timer.stop();
        this.icon = "schedule";
        this.firstStart = false;
        document.getElementById("time").innerText = "Cliquer sur le bouton...";
        this.utils.localStorage.set("dayly", "null");
        let index = await this.$store.dispatch("endDay");
        this.utils.localStorage.set("workTime", "null");
        this.utils.notify({
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
                this.$router.push("/heure/edit/" + index);
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
      let user = await this.$store.dispatch("getUserInfo");
      if (user.heure.dayly.start.value) {
        document.getElementById("time").innerText = "Chargement...";
        if (user.heure.dayly.status === 1) {
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
          this.icon = "play_arrow";
          timer.timer.start({ startValues: value });
          timer.timer.pause();
          document.getElementById(
            "time"
          ).innerText = timer.timer.getTimeValues().toString();
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
        this.journer = {
          start: { value: null, parse: null },
          status: 0,
          event: { index: [], list: [] },
          end: { value: null, parse: null },
        };
        timer.timer.start();
        this.journer.start.value = new Date();
        let value = this.journer.start.value;
        this.journer.start.parse = this.journer.start.parse =
          (value.getHours() < 9 ? "0" + value.getHours() : value.getHours()) +
          ":" +
          (value.getMinutes() < 9 ? "0" + value.getMinutes() : value.getMinutes());
        this.journer.start.value = this.journer.start.value.getTime(
          this.journer.start.value
        );
        this.utils.localStorage.set("dayly", this.journer);
        this.firstStart = true;
        this.icon = "pause";
        await this.$store.dispatch("setStartWork", {
          time: this.journer.start,
        });
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
        let tmpDate = new Date();
        let time = tmpDate.getTime();
        tmpDate =
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
        }
        this.journer.status = 1;
        let dayly = this.utils.localStorage.getItem("dayly");
        dayly.event = this.journer.event;
        dayly.status = this.journer.status;
        this.utils.localStorage.set("dayly", dayly);
        await this.$store.dispatch("addEventDay", {
          event: dayly.event,
          status: this.journer.status,
        });
        this.icon = "play_arrow";
        timer.timer.pause();
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
