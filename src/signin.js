//Anna

import { initializeApp } from "firebase/app";
import { signInWithEmailAndPassword, signInWithRedirect, getAuth,  GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAytz-Il5aqBSvLfjKJp6bKjbbkDcgGJZM",
    authDomain: "online-shop-projectjs.firebaseapp.com",
    projectId: "online-shop-projectjs",
    storageBucket: "online-shop-projectjs.firebasestorage.app",
    messagingSenderId: "326894623124",
    appId: "1:326894623124:web:30924e27a81f6358559781"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

function logInUser(email, password, auth){
    signInWithEmailAndPassword (auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert ('Ошибка регистрации')
    });
}

function signinWithGoogle(){
    signInWithRedirect(auth, provider)
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

const inGoogleButton = document.getElementById('signin_google')

inGoogleButton.addEventListener('click', async(event) => {
    event.preventDefault();
    signinWithGoogle();
})

const signinForm = document.getElementById("signin_form");

signinForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('signin_email').value;
    const password = document.getElementById('signin_password').value;
    logInUser(email, password, auth);
    window.location.href = './welcome_after_sign.html';
});

const registerBtn = document.getElementById('register_btn');
registerBtn.addEventListener('click', function() {
    window.location.href = './signup_page.html';
});
