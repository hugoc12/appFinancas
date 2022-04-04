import {initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAOWyXjoCF8lci9wUtxddYsNi9QqnLipEs",
    authDomain: "myappfinancas.firebaseapp.com",
    databaseURL: "https://myappfinancas-default-rtdb.firebaseio.com",
    projectId: "myappfinancas",
    storageBucket: "myappfinancas.appspot.com",
    messagingSenderId: "75987946708",
    appId: "1:75987946708:web:734591441098361986ff41"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;