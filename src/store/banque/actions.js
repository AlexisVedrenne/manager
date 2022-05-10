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

export async function addBanque({ dispatch }, { banque }) {
  const uid = fire.auth.currentUser.uid;
  const q = await query(
    collection(fire.firebasebd, "utilisateurs"),
    where("uid", "==", uid)
  );
  const res = await getDocs(q);
  let user = res.docs[0].data();
  const id = res.docs[0].ref.id;
  user.banque.comptes.push(banque);
  await setDoc(doc(fire.firebasebd, "utilisateurs", id), user);
  await dispatch("getUserInfo");
  Notify.create({
    progress: true,
    timeout: 1000,
    icon: "done",
    message: "Compte bancaire ajouter.",
    color: "positive",
  });
}

export async function fetchCompte({ commit }, { indice }) {
  try {
    const uid = fire.auth.currentUser.uid;
    const q = await query(
      collection(fire.firebasebd, "utilisateurs"),
      where("uid", "==", uid),
      where("banque.comptes", "array-contains", indice)
    );
    const res = await getDocs(q);
    let compte = res.docs[0].data();
    return compte;
  } catch (error) {
    console.log(error);
  }
}

export async function addOp({ dispatch }, { op, index }) {
  try {
    let user = LocalStorage.getItem("user");
    let val = 0.0;
    if (op.type === "Virement") {
      val = parseFloat(user.banque.comptes[index].solde);
      val += parseFloat(op.montant);
      user;
    } else {
      val = parseFloat(user.banque.comptes[index].solde);
      val -= parseFloat(op.montant);
    }
    user.banque.comptes[index].solde = val;
    user.banque.comptes[index].op.push(op);
    await dispatch("updateUserInfo", { userInfos: user });
  } catch (error) {
    console.log(error);
  }
}
