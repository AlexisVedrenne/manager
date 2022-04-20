<template>
  <div>
    <p id="time" class="text-center" />
    <div class="row justify-center">
      <q-btn
        v-touch-hold:2000.mouse="stop"
        :icon="icon"
        @click="start()"
        round
        color="secondary"
        size="50px"
      />
    </div>
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
    time: timer.getTimeValues().toString(),
  });
});
var firstStart = false;
export default {
  data() {
    return {
      icon: "schedule",
      utils: useQuasar(),
    };
  },
  methods: {
    stop() {
      timer.pause();
      timer.reset();
      timer.stop();
      this.icon = "schedule";
      firstStart = false;
      document.getElementById("time").innerText = "";
      this.utils.localStorage.set("workTime", null);
    },
    start() {
      console.log(this.utils.localStorage.getItem("workTime"));
      if (!firstStart) {
        timer.start();
        firstStart = true;
        this.icon = "pause";
        return;
      }
      if (timer.isPaused()) {
        this.icon = "pause";
        timer.start();
        return;
      }
      if (timer.isRunning()) {
        this.icon = "play_arrow";
        timer.pause();
        return;
      }
    },
  },
};
</script>
