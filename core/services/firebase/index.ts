import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAyUkFMCyGOEPgNP6Rssb8NkBy7v27jSk8',
  authDomain: 'graphiql-app-d001a.firebaseapp.com',
  projectId: 'graphiql-app-d001a',
  storageBucket: 'graphiql-app-d001a.appspot.com',
  messagingSenderId: '478623468570',
  appId: '1:478623468570:web:45cc40700c76ad634915a3',
  measurementId: 'G-RL4T001V96',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    return err;
  }
};

const registerWithEmailAndPassword = async (email: string, password: string) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await addDoc(collection(db, 'users'), {
    uid: user.uid,
    authProvider: 'local',
    email,
  });
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    return err;
  }
};

const logout = async () => {
  await signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
