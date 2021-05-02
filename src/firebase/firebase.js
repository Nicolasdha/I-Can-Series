import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDrU66wvYQD4kE-RfnODQjygS1e2KcUGKk",
  authDomain: "neurodiverse-book-series.firebaseapp.com",
  databaseURL: "https://neurodiverse-book-series-default-rtdb.firebaseio.com",
  projectId: "neurodiverse-book-series",
  storageBucket: "neurodiverse-book-series.appspot.com",
  messagingSenderId: "662234769914",
  appId: "1:662234769914:web:1891a4f5c1f40efb9b5c43",
  measurementId: "G-3F6SW1428L",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const database = firebaseApp.firestore();

const auth = firebase.auth();

export { database, auth };
