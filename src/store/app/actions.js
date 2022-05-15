import fire from "src/boot/Firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { LocalStorage, Notify } from "quasar";
import "core-js/es/array";

export async function fetchExecutable({ commit }, { platforme }) {
  try {
    const q = await query(
      collection(fire.firebasebd, "DownloadCenter"),
      where("platforme", "==", platforme)
    );
    const res = await getDocs(q);
    return res;
  } catch (error) {
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "error",
      message: "Erreur lors de la récupération des executables",
      color: "negative",
    });
  }
}
