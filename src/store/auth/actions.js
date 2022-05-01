import fire from "src/boot/Firebase";
import { LocalStorage } from "quasar";
import router from "src/router";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  OAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  setPersistence,
  indexedDBLocalPersistence,
  updateEmail,
} from "firebase/auth";
import { Notify } from "quasar";
import "core-js/es/array";

export async function lostPassword({ commit }, { email }) {
  try {
    await sendPasswordResetEmail(fire.auth, email.toString().trim());
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "done",
      message: "Email de résiliation de mot de passe envoyé",
      color: "positive",
    });
  } catch (error) {
    console.log(error);
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "done",
      message: "Email de résiliation de mot de passe envoyé",
      color: "positive",
    });
  }
}

export async function getUserInfo({ commit, dispatch }) {
  try {
    let credential = LocalStorage.getItem("authCredential");
    let uid = "";
    if (fire.auth.currentUser) {
      uid = fire.auth.currentUser.uid;
    } else {
      uid = credential.user.uid;
    }

    const q = await query(
      collection(fire.firebasebd, "utilisateurs"),
      where("uid", "==", uid)
    );
    const res = await getDocs(q);
    let userInfo = res.docs[0].data();
    await LocalStorage.set("user", userInfo);
    return userInfo;
  } catch (error) {
    console.log(error);
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "error",
      message: "Error lors de la récupération des informations",
      color: "negative",
    });
    await dispatch("signLeft");
  }
}

export async function signIn({ commit, dispatch }, { infos }) {
  try {
    setPersistence(fire.auth, indexedDBLocalPersistence);
    const res = await signInWithEmailAndPassword(
      fire.auth,
      infos.email.toString().trim(),
      infos.password.toString().trim()
    );
    await LocalStorage.set("authCredential", res);
    let user = await dispatch("getUserInfo");
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "insert_emoticon",
      message: "Vous etes en ligne.",
      color: "positive",
    });
    return user;
  } catch (error) {
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "warning",
      message: "Adresse e-mail ou mot de passe incorrect.",
      color: "negative",
    });
  }
}

export async function signLeft({ commit }) {
  try {
    await signOut(fire.auth);
    LocalStorage.clear();
    commit("out");
    Notify.create({
      progress: true,
      icon: "warning",
      message: "Vous avez été deconnecté",
      color: "warning",
      textColor: "dark",
    });
  } catch (e) {
    Notify.create({
      progress: true,
      timeout: 1000,
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
    let result = await signInWithRedirect(fire.auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
  } catch (error) {
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "error",
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
  } catch (error) {}
}

export async function logApple() {
  try {
    const provider = new OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");
    await signInWithPopup(fire.auth, provider);
    const credential = OAuthProvider.credentialFromResult(result);
  } catch (error) {
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "error",
      message: "Erreur lors de la connexion à Apple",
      color: "red",
    });
  }
}

export async function signUp({ dispatch }, { inscription }) {
  try {
    let res = await createUserWithEmailAndPassword(
      fire.auth,
      inscription.email,
      inscription.password
    );
    let user = res.user;
    await dispatch("createUser", { user: user, infos: inscription });
    await dispatch("signIn", {
      infos: { email: inscription.email, password: inscription.password },
    });
    return true;
  } catch (error) {
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "error",
      message: "Erreur lors de la création du compte",
      color: "red",
    });
    return false;
  }
}

export async function createUser({ commit }, { user, infos }) {
  let account = {
    nom: infos.nom,
    prenom: infos.prenom,
    banque: {
      active: true,
      comptes: [],
    },
    chat: {
      amis: [],
      demandes: [],
    },
    heure: {
      active: true,
      dayly: {
        start: { value: null, parse: null },
        status: 0,
        event: { index: [], list: [] },
        end: { value: null, parse: null },
      },
      fiches: [],
      param: {
        nbHeureSemaine: 35,
      },
    },
    isFirstConnect: true,
    paie: {
      active: true,
      fiches: [],
      param: {
        annuel: 19237.4,
        horraire: 10.57,
        mensuel: 1603.12,
        mois: 12,
      },
    },
    phone: "",
    birth: "",
    uid: user.uid,
  };
  await addDoc(collection(fire.firebasebd, "utilisateurs"), account);
}

export async function verifyEmail() {
  try {
    let user = await fire.auth.currentUser;
    if (user.emailVerified) {
      Notify.create({
        progress: true,
        timeout: 1000,
        icon: "done",
        message: "Votre adresse e-mail à bien été vérifier.",
        color: "positive",
      });
      return true;
    } else {
      Notify.create({
        progress: true,
        timeout: 1000,
        icon: "warning",
        message: "Adresse mail non vérifier, regarder votre boite mail.",
        color: "negative",
      });
      await sendEmailVerification(user);
      Notify.create({
        progress: true,
        timeout: 1000,
        icon: "info",
        message: "Email de vérification envoyer !",
        color: "warning",
      });
      return false;
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function completeProfile({ commit }, { infos }) {
  try {
    const uid = fire.auth.currentUser.uid;
    const q = await query(
      collection(fire.firebasebd, "utilisateurs"),
      where("uid", "==", uid)
    );
    const res = await getDocs(q);
    let user = res.docs[0].data();
    const id = res.docs[0].ref.id;
    user.phone = infos.phone;
    user.birth = infos.date;
    await setDoc(doc(fire.firebasebd, "utilisateurs", id), user);
  } catch (error) {
    console.log(error);
  }
}

export async function choixFonctions({ commit }, { choix }) {
  const credential = await LocalStorage.getItem("authCredential");
  const uid = credential.user.uid;
  const q = await query(
    collection(fire.firebasebd, "utilisateurs"),
    where("uid", "==", uid)
  );
  const res = await getDocs(q);
  let user = res.docs[0].data();
  const id = res.docs[0].ref.id;
  user.heure.active = choix.heure;
  user.paie.active = choix.paie;
  user.banque.active = choix.banque;
  await setDoc(doc(fire.firebasebd, "utilisateurs", id), user);
}

export async function heureGuide({ commit }, { nb }) {
  const uid = fire.auth.currentUser.uid;
  const q = await query(
    collection(fire.firebasebd, "utilisateurs"),
    where("uid", "==", uid)
  );
  const res = await getDocs(q);
  let user = res.docs[0].data();
  const id = res.docs[0].ref.id;
  user.heure.param.nbHeureSemaine = nb;
  await setDoc(doc(fire.firebasebd, "utilisateurs", id), user);
}

export async function paieGuide({ commit }, { infos }) {
  const uid = fire.auth.currentUser.uid;
  const q = await query(
    collection(fire.firebasebd, "utilisateurs"),
    where("uid", "==", uid)
  );
  const res = await getDocs(q);
  let user = res.docs[0].data();
  const id = res.docs[0].ref.id;
  user.paie.param.mensuel = infos.mensuel;
  user.paie.param.annuel = infos.annuel;
  user.paie.param.horraire = infos.horraire;
  user.paie.param.mois = infos.mois;
  await setDoc(doc(fire.firebasebd, "utilisateurs", id), user);
}

export async function endGuide({ commit }) {
  try {
    const uid = fire.auth.currentUser.uid;
    const q = await query(
      collection(fire.firebasebd, "utilisateurs"),
      where("uid", "==", uid)
    );
    const res = await getDocs(q);
    let user = res.docs[0].data();
    const id = res.docs[0].ref.id;
    user.isFirstConnect = false;
    await setDoc(doc(fire.firebasebd, "utilisateurs", id), user);

    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "info",
      message: "Profile mis à jour.",
      color: "info",
    });
  } catch (error) {}
}

export async function updateUserInfo({ commit }, { userInfos }) {
  try {
    let currentUser = LocalStorage.getItem("user");
    const uid = currentUser.uid;
    const q = await query(
      collection(fire.firebasebd, "utilisateurs"),
      where("uid", "==", uid)
    );
    const res = await getDocs(q);
    let user = userInfos;
    const id = res.docs[0].ref.id;
    await setDoc(doc(fire.firebasebd, "utilisateurs", id), user);
    LocalStorage.set("user", userInfos);
  } catch (error) {
    console.log(error);
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "error",
      message:
        "Erreur lors de la sauvegarde du profile, veuillez vous reconnectez !",
      color: "red",
    });
  }
}

export async function updateProfil({ commit }, { email }) {
  try {
    await updateEmail(fire.auth.currentUser, email);
  } catch (error) {
    console.log(error);
    Notify.create({
      progress: true,
      timeout: 1000,
      icon: "error",
      message:
        "Erreur lors de la sauvegarde du profile, veuillez vous reconnectez !",
      color: "red",
    });
  }
}
