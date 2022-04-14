import fire from "src/boot/Firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithRedirect,
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

export async function logInGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/user.addresses.read");
    provider.addScope("https://www.googleapis.com/auth/user.birthday.read");
    provider.addScope("https://www.googleapis.com/auth/user.phonenumbers.read");
    provider.addScope("https://www.googleapis.com/auth/userinfo.email");
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
    let result = await signInWithPopup(fire.auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log(credential);
  } catch (error) {
    console.log(error);
    Notify.create({
      message: "Erreur lors de la connexion à Google",
      color: "red",
    });
  }
}

export async function logFacebook() {
  try {
    const provider = new FacebookAuthProvider();
    provider.addScope("email");
    provider.addScope("instagram_basic");
    let result = await signInWithPopup(fire.auth, provider);
    const credential = FacebookAuthProvider.credentialFromResult(result);
    console.log(credential);
  } catch (error) {
    console.log(error);
  }
}
