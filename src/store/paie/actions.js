import { LocalStorage, Loading, QSpinnerGears } from "quasar";
import { Notify } from "quasar";
import "core-js/es/array";

export async function addPaie({ dispatch }, { paie }) {
  try {
    let user = LocalStorage.getItem("user");
    if (paie.fiche.lien) {
      paie.fiche.nom = paie.fiche.lien.name;
      paie.fiche.lien = await dispatch("uploadImage", {
        image: paie.fiche.lien,
      });
    }
    user.paie.fiches.push(paie);
    LocalStorage.set("user", user);
    await dispatch("updateUserInfo", { userInfos: user });
  } catch (error) {
    console.log(error);
  }
}

export async function editPaie({ dispatch }, { paie, index }) {
  try {
    let user = LocalStorage.getItem("user");
    if (typeof paie.fiche.lien !== "string") {
      await dispatch("deleteImage", { image: paie.fiche.nom });
      paie.fiche.nom = paie.fiche.lien.name;
      paie.fiche.lien = await dispatch("uploadImage", {
        image: paie.fiche.lien,
      });
    }
    user.paie.fiches[index] = paie;
    LocalStorage.set("user", user);
    await dispatch("updateUserInfo", { userInfos: user });
  } catch (error) {
    console.log(error);
  }
}

export async function deletePaie({ dispatch }, { index }) {
  try {
    Loading.show();
    let user = LocalStorage.getItem("user");
    user.paie.fiches.splice(index, 1);
    await dispatch("updateUserInfo", { userInfos: user });
    Loading.hide();
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "info",
      textColor: "primary",
      message: "Fiche paie supprimée.",
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
