import { LocalStorage } from "quasar";

export async function setWorkTime({ commit }, { time }) {
  await LocalStorage.set("workTime", time);
}
