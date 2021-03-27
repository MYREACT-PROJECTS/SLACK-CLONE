import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyBl6dRxjicHCK7UbCtVEZTOvOp78-s6VOQ",
  authDomain: "slack-clone-9a916.firebaseapp.com",
  projectId: "slack-clone-9a916",
  storageBucket: "slack-clone-9a916.appspot.com",
  messagingSenderId: "651100845499",
  appId: "1:651100845499:web:1556c5903bbb813246c09e"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db= firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider(); 

  
  export {auth,provider,db};
  //export default db; 
