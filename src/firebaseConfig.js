import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGQddNtmT_P99vqKD6UEYvdLKUlarIoLg",
  authDomain: "myweatherappreact.firebaseapp.com",
  projectId: "myweatherappreact",
  storageBucket: "myweatherappreact.appspot.com",
  messagingSenderId: "766258972485",
  appId: "1:766258972485:web:b3736c9451f6ff34b6202c",
  measurementId: "G-7G8EVJV166",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
