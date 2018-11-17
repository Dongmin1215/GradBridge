import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBAalLJddLr2Ak_Rp6B7vqbE2U5vqPzmnM",
    authDomain: "gradbridge-274fe.firebaseapp.com",
    databaseURL: "https://gradbridge-274fe.firebaseio.com",
    projectId: "gradbridge-274fe",
    storageBucket: "gradbridge-274fe.appspot.com",
    messagingSenderId: "344949878320"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};
