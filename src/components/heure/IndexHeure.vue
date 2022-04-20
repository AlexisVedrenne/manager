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
    <p class="text-grey-8 q-ml-md" style="font-size: 20px">
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
      v-for="(event, index) in journer.event"
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
import Timer from "easytimer.js";
import { useQuasar } from "quasar";
import Store from "src/store";
const timer = new Timer();
var store = Store();
timer.addEventListener("secondsUpdated", async function () {
  document.getElementById("time").innerText = timer.getTimeValues().toString();
  await store.dispatch("setWorkTime", {
    time: timer.getTimeValues(),
  });
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
        event: [],
        end: { value: null, parse: null },
      },
    };
  },
  mounted() {
    this.date = new Date();
    if (
      this.utils.localStorage.getItem("workTime") &&
      this.utils.localStorage.getItem("workTime") != "down"
    ) {
      let value = this.utils.localStorage.getItem("workTime");
      let dayly = this.utils.localStorage.getItem("dayly");
      this.journer = dayly;
      let date = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDay(),
        value.hours,
        value.minutes,
        value.seconds
      );
      let timeNow = this.date.getTime(this.date);
      let start = new Date(dayly.start.value);
      console.log(
        "début :",
        start.getHours() + ":" + start.getMinutes(),
        " now : ",
        this.date.getHours() + ":" + this.date.getMinutes()
      );
      let timeStarted = start.getTime(start);

      let diff = timeNow - timeStarted;
      let timeDiff = new Date(diff);
      value.hours = timeDiff.getHours() - 1;
      value.minutes = timeDiff.getMinutes();
      value.seconds = timeDiff.getSeconds();
      timer.start({ startValues: value });
      this.firstStart = true;
      this.icon = "pause";
    }
  },
  methods: {
    stop() {
      this.journer.end.value = new Date();
      let value = this.journer.end.value;
      this.journer.end.parse = this.journer.end.parse =
        value.getHours() + ":" + value.getMinutes();
      timer.pause();
      timer.reset();
      timer.stop();
      this.icon = "schedule";
      this.firstStart = false;
      document.getElementById("time").innerText = "Cliquer sur le bouton...";
      this.utils.localStorage.set("workTime", "down");
      this.utils.localStorage.set("dayly", null);
    },
    start() {
      if (!this.firstStart) {
        this.journer = {
          start: { value: null, parse: null },
          event: [],
          end: { value: null, parse: null },
        };
        timer.start();
        this.journer.start.value = new Date();
        let value = this.journer.start.value;
        this.journer.start.parse = this.journer.start.parse =
          value.getHours() + ":" + value.getMinutes();
        this.journer.start.value = this.journer.start.value.getTime(
          this.journer.start.value
        );
        this.utils.localStorage.set("dayly", this.journer);
        this.firstStart = true;
        this.icon = "pause";
        return;
      }
      if (timer.isPaused()) {
        let tmpDate = new Date();
        tmpDate = tmpDate.getHours() + ":" + tmpDate.getMinutes();
        this.journer.event.push({ value: tmpDate, type: "terminé à" });
        let dayly = this.utils.localStorage.getItem("dayly");
        dayly.event = this.journer.event;
        this.utils.localStorage.set("dayly", dayly);
        this.icon = "pause";
        timer.start();
        return;
      }
      if (timer.isRunning()) {
        let tmpDate = new Date();
        tmpDate = tmpDate.getHours() + ":" + tmpDate.getMinutes();
        this.journer.event.push({ value: tmpDate, type: "prise à" });
        let dayly = this.utils.localStorage.getItem("dayly");
        dayly.event = this.journer.event;
        this.utils.localStorage.set("dayly", dayly);
        this.icon = "play_arrow";
        timer.pause();
        return;
      }
    },
  },
};
</script>
