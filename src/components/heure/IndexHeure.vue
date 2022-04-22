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
    <p
      v-if="journer.start.parse"
      class="text-grey-8 q-ml-md"
      style="font-size: 20px"
    >
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
        status: 0,
        event: [],
        end: { value: null, parse: null },
      },
    };
  },
  mounted() {
    this.date = new Date();
    let workTime = this.utils.localStorage.getItem("workTime");
    let dayly = this.utils.localStorage.getItem("dayly");
    if (workTime !== "null" && dayly !== "null" && workTime && dayly) {
      let value = { hours: null, minutes: null, seconds: null };
      this.journer = dayly;
      let timeNow = this.date.getTime(this.date);
      let start = new Date(dayly.start.value);
      let timeStarted = start.getTime(start);
      let diff = timeNow - timeStarted;
      let timeDiff = new Date(diff);
      value.hours = timeDiff.getHours() - 1;
      value.minutes = timeDiff.getMinutes();
      value.seconds = timeDiff.getSeconds();
      console.log(dayly.status);
      timer.start({ startValues: value });
      if (dayly.status == 1) {
        this.icon = "play_arrow";
        timer.pause();
        document.getElementById("time").innerText = timer
          .getTimeValues()
          .toString();
      } else {
        this.icon = "pause";
      }
      this.firstStart = true;
    } else {
      this.timeDataCloud();
    }
  },
  methods: {
    async stop() {
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
      this.utils.localStorage.set("dayly", "null");
      await this.$store.dispatch("endDay");
      this.utils.localStorage.set("workTime", "null");
    },
    timeDataCloud() {
      let user = this.utils.localStorage.getItem("user");
      if (user.heure.dayly.start.value) {
        let value = { hours: null, minutes: null, seconds: null };
        let dayly = user.heure.dayly;
        this.journer = dayly;
        this.utils.localStorage.set("dayly", this.journer);
        let timeNow = this.date.getTime(this.date);
        let start = new Date(dayly.start.value);
        let timeStarted = start.getTime(start);
        let diff = timeNow - timeStarted;
        let timeDiff = new Date(diff);
        value.hours = timeDiff.getHours() - 1;
        value.minutes = timeDiff.getMinutes();
        value.seconds = timeDiff.getSeconds();
        timer.start({ startValues: value });
        if (dayly.status == 1) {
          this.icon = "play_arrow";
          timer.pause();
          document.getElementById("time").innerText = timer
            .getTimeValues()
            .toString();
        } else {
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
        await this.$store.dispatch("setStartWork", {
          time: this.journer.start,
        });
        return;
      }
      if (timer.isPaused()) {
        let tmpDate = new Date();
        tmpDate = tmpDate.getHours() + ":" + tmpDate.getMinutes();
        this.journer.event.push({ value: tmpDate, type: "terminé à" });
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
        timer.start();
        return;
      }
      if (timer.isRunning()) {
        let tmpDate = new Date();
        tmpDate = tmpDate.getHours() + ":" + tmpDate.getMinutes();
        this.journer.event.push({ value: tmpDate, type: "prise à" });
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
        timer.pause();
        return;
      }
    },
  },
};
</script>
