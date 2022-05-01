import { LocalStorage, Loading, QSpinnerGears } from "quasar";
import { Notify } from "quasar";
import "core-js/es/array";

export async function addPaie({ dispatch }, { paie }) {
  try {
    let user = LocalStorage.getItem("user");
    if (paie.fiche) {
      paie.fiche = await dispatch("uploadImage", { image: paie.fiche });
    }
    user.paie.fiches.push(paie);
    LocalStorage.set("user", user);
    await dispatch("updateUserInfo", { userInfos: user });
  } catch (error) {
    console.log(error);
  }
}
