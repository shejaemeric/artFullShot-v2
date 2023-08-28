import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v9.0.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTd5kTx9cKvtQxV0Dxo5YhH0eqzJLAVOY",
  authDomain: "artfullshot-a03bf.firebaseapp.com",
  projectId: "artfullshot-a03bf",
  storageBucket: "artfullshot-a03bf.appspot.com",
  messagingSenderId: "135523570096",
  appId: "1:135523570096:web:8c9259ea0985298ef38675",
  measurementId: "G-DDHX7KBZSZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Create a root reference
const storage = getStorage();

export { app, analytics, auth, db, storage, ref, uploadBytes };
export default app;
