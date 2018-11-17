import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCKPGFZa-CrSlNxqHrBjvHAe5bh4rJGIBc",
    authDomain: "myapp-2ccee.firebaseapp.com",
    databaseURL: "https://myapp-2ccee.firebaseio.com",
    projectId: "myapp-2ccee",
    storageBucket: "",
    messagingSenderId: "1077242452126"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};
