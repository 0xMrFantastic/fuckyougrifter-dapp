import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAB_2O3iR8eDjIAolcfouV5ArrYzjkv3Ac",
  authDomain: "fuga-awards.firebaseapp.com",
  projectId: "fuga-awards",
  storageBucket: "fuga-awards.appspot.com",
  messagingSenderId: "310980832308",
  appId: "1:310980832308:web:859ec0fb3c833ca8442e61"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }