import { LocalStorage } from "quasar";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";

export async function setWorkTime({ commit }, { time }) {
  await LocalStorage.set("workTime", time);
}

export async function setStartWork({ dispatch }, { time }) {
  try {
    let user = await dispatch("getUserInfo");
    user.heure.dayly.start.value = time.value;
    user.heure.dayly.start.parse = time.parse;
    await dispatch("updateUserInfo", { userInfos: user });
  } catch (error) {
    console.log(error);
  }
}

export async function addEventDay({ dispatch }, { event, status }) {
  try {
    let user = await dispatch("getUserInfo");
    user.heure.dayly.status = status;
    user.heure.dayly.event = event;
    await dispatch("updateUserInfo", { userInfos: user });
  } catch (error) {
    console.log(error);
  }
}

export async function endDay({ dispatch }) {
  try {
    let user = await dispatch("getUserInfo");
    user.heure.dayly.start.value = null;
    user.heure.dayly.start.parse = null;
    user.heure.dayly.event = [];
    user.heure.dayly.end.value = null;
    user.heure.dayly.end.parse = null;
    await dispatch("updateUserInfo", { userInfos: user });
  } catch (error) {}
}
