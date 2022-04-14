import fire from "src/boot/Firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Notify } from "quasar";
import "core-js/es/array";

export async function lostPassword({ commit }, { email }) {
  try {
    await sendPasswordResetEmail(fire.auth, email.toString().trim());
    Notify.create({
      icon: "done",
      message: "Email de résiliation de mot de passe envoyé",
      color: "positive",
    });
  } catch (error) {
    Notify.create({
      icon: "done",
      message: "Email de résiliation de mot de passe envoyé",
      color: "positive",
    });
  }
}

export async function signIn({ commit }, { infos }) {
  try {
    let user = await signInWithEmailAndPassword(
      fire.auth,
      infos.email.toString().trim(),
      infos.password.toString().trim()
    );
    commit("setUser", { user: user });
    Notify.create({
      message: "Connexion réussie !",
      color: "positive",
    });
    return user.user;
  } catch (error) {
    console.log(error);
    Notify.create({
      icon: "warning",
      message: "Adresse e-mail ou mot de passe incorrect.",
      color: "negative",
    });
  }
}

export async function signLeft({ commit }) {
  try {
    signOut(fire.auth);
    commit("out");
    Notify.create({
      message: "Vous avez été deconnecté",
      color: "warning",
      textColor: "dark",
    });
  } catch (e) {
    Notify.create({
      message: e.message,
      color: "red",
    });
  }
}
