import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvanWMuVilkQduq1SSpGxyZastDPD0k9A",
  authDomain: "plan-ee4bb.firebaseapp.com",
  projectId: "plan-ee4bb",
  storageBucket: "plan-ee4bb.appspot.com",
  messagingSenderId: "556021961570",
  appId: "1:556021961570:web:b8fb60f961cf3fc405923b",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };
