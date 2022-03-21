import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDRvt-YpPt7RoaM7io5NagtDTJFzEocCpU",
    authDomain: "todo-fa83b.firebaseapp.com",
    projectId: "todo-fa83b",
    storageBucket: "todo-fa83b.appspot.com",
    messagingSenderId: "594355060494",
    appId: "1:594355060494:web:fc1c8f50e9d4a5e340e15f"
};

const firebase = initializeApp(config);

// const { FieldValue } = firebase.firestore;

export { firebase };