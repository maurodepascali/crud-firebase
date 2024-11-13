import { initializeApp } from "firebase/app";
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAorVWHh_Kql_ea_NzzjD64nHTxdw4ZzrQ",
  authDomain: "pacientes-87cab.firebaseapp.com",
  projectId: "pacientes-87cab",
  storageBucket: "pacientes-87cab.appspot.com",
  messagingSenderId: "227880127346",
  appId: "1:227880127346:web:3ea57608b2134ad71a2beb"
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
