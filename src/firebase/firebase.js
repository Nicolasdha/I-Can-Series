import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA-fxyiCfpgLAMxfuPyTVdyshS-bTMU-9U",
  authDomain: "the-i-can-series.firebaseapp.com",
  projectId: "the-i-can-series",
  storageBucket: "the-i-can-series.appspot.com",
  messagingSenderId: "742990651381",
  appId: "1:742990651381:web:a8fe4ead2eb5188c440abc",
  measurementId: "G-G5WXV8C3XP",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const database = firebaseApp.firestore();

const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

export {
  database,
  auth,
  firebase,
  googleAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDrU66wvYQD4kE-RfnODQjygS1e2KcUGKk",
//   authDomain: "neurodiverse-book-series.firebaseapp.com",
//   databaseURL: "https://neurodiverse-book-series-default-rtdb.firebaseio.com",
//   projectId: "neurodiverse-book-series",
//   storageBucket: "neurodiverse-book-series.appspot.com",
//   messagingSenderId: "662234769914",
//   appId: "1:662234769914:web:1891a4f5c1f40efb9b5c43",
//   measurementId: "G-3F6SW1428L",
// };

// Production secturity

// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if false;
//     }
//   }
// }
