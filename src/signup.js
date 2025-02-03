import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAytz-Il5aqBSvLfjKJp6bKjbbkDcgGJZM",
    authDomain: "online-shop-projectjs.firebaseapp.com",
    projectId: "online-shop-projectjs",
    storageBucket: "online-shop-projectjs.firebasestorage.app",
    messagingSenderId: "326894623124",
    appId: "1:326894623124:web:30924e27a81f6358559781"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

function signupWithGoogle(){
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    })
}

const upGoogleButton = document.getElementById('signup_google');

upGoogleButton.addEventListener('click', async(event) => {
    event.preventDefault();
    signupWithGoogle();
})

function createUser(email, password, auth) {
    createUserWithEmailAndPassword (auth, email, password)
    .then((userCredential) => { 
        const user = userCredential.user;
        alert ('Регистрация прошла успешно')
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert ('Ошибка регистрации')
    });
}


const signupForm = document.getElementById("signupForm");
signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('signup_email').value;
    const password = document.getElementById('signup_password').value;
    const auth = getAuth();
    createUser(email, password, auth);
});

