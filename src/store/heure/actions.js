import { LocalStorage, Loading, QSpinnerGears } from "quasar";
import route from "src/router";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { Notify } from "quasar";
import "core-js/es/array";
import { RouterLink, RouterView } from "vue-router";

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
    let date = new Date();
    let workTime = LocalStorage.getItem("workTime");
    let totalTime = new Date(
      1990,
      12,
      1,
      parseInt(workTime.hours),
      parseInt(workTime.minutes),
      parseInt(workTime.seconds)
    );
    let user = await dispatch("getUserInfo");
    let nbHeureJour = user.heure.param.nbHeureSemaine / 5;
    let heureJour = new Date(1990, 12, 1, nbHeureJour);
    let heureSupp = totalTime.getTime() - heureJour.getTime();
    if (heureSupp < 0) {
      heureSupp = "00:00:00";
    }
    user.heure.fiches.push({
      baniere: null,
      nom:
        "Fiche du " + date.getDate() < 9
          ? "0" + date.getDate()
          : date.getDate() +
            "/" +
            (date.getMonth() + 1 < 9
              ? "0" + (date.getMonth() + 1)
              : date.getMonth() + 1) +
            "/" +
            date.getFullYear(),
      nomEntreprise: "",
      tag: [],
      date:
        date.getDate() < 9
          ? "0" + date.getDate()
          : date.getDate() +
            "/" +
            (date.getMonth() + 1 < 9
              ? "0" + (date.getMonth() + 1)
              : date.getMonth() + 1) +
            "/" +
            date.getFullYear(),
      description: "",
      heureTotal: totalTime.getTime(),
      heureSupp: heureSupp,
    });
    user.heure.dayly.start.value = null;
    user.heure.dayly.start.parse = null;
    user.heure.dayly.event = [];
    user.heure.dayly.end.value = null;
    user.heure.dayly.end.parse = null;
    LocalStorage.set("workTime", "null");
    await dispatch("updateUserInfo", { userInfos: user });
    return user.heure.fiches.length - 1;
  } catch (error) {
    console.log(error);
  }
}

export async function addFiche({ dispatch }, { fiche }) {
  try {
    let user = await dispatch("getUserInfo");
    if (fiche.baniere) {
      let img = await dispatch("uploadImage", { image: fiche.baniere });
      fiche.baniere = img;
    }

    user.heure.fiches.push(fiche);
    await dispatch("updateUserInfo", { userInfos: user });
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "done",
      message: "La fiche à bien été ajouté !",
      color: "positive",
    });
  } catch (error) {
    console.log(error);
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "error",
      message: "Erreur lors de l'enregistrement de la fiche",
      color: "red",
    });
  }
}

export async function deleteFiche({ dispatch }, { index }) {
  try {
    Loading.show();
    let user = LocalStorage.getItem("user");
    user.heure.fiches.splice(index, 1);
    await dispatch("updateUserInfo", { userInfos: user });
    Loading.hide();
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "info",
      textColor: "primary",
      message: "Fiche supprimée.",
      color: "info",
    });
  } catch (error) {
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "error",
      message: "Erreur lors de la supression de la fiche !",
      color: "red",
    });
  }
}

export async function editFiche({ dispatch }, { fiche, index }) {
  try {
    let user = LocalStorage.getItem("user");
    user.heure.fiches[index] = fiche;
    if ((typeof fiche.baniere).includes("object") && fiche.baniere) {
      let img = await dispatch("uploadImage", { image: fiche.baniere });
      fiche.baniere = img;
    }
    await dispatch("updateUserInfo", { userInfos: user });
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "done",
      message: "Fiche mise à jour",
      color: "info",
    });
  } catch (error) {
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "error",
      message: "Erreur lors de l'édition de la fiche !",
      color: "red",
    });
  }
}
