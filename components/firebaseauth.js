import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const signUpSection = document.getElementById('signUpSection');
const signInSection = document.getElementById('signInSection');
const signUpButton = document.querySelector('.sign-up-btn');
const signInButton = document.querySelector('.sign-in-btn');
signUpButton.addEventListener('click', (event) => {
    event.preventDefault();
    const firstName = document.getElementById('fName').value.trim();
    const lastName = document.getElementById('lName').value.trim();
    const email = document.getElementById('rEmail').value.trim();
    const password = document.getElementById('rPassword').value;

    if (!firstName || !lastName) {
        alert("First and last name can not be blank!");
        return; 
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
                email,
                uid: user.uid
            }).then(() => {
                alert("User registered successfully!");
                switchToSignIn();
            }).catch((error) => {
                console.error("Error!!!", error);
            });
        })
        .catch((error) => {
            alert(error.message);
        });
});

// signInButton.addEventListener('click', (event) => {
//     event.preventDefault();

//     const email = document.getElementById('email').value.trim();
//     const password = document.getElementById('password').value;

//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             window.location.href = 'components/homepage.html';  
//         })
//         .catch((error) => {
//             alert("Invalid email or password");
//         });
// });
document.querySelector('.sign-in').addEventListener('click', switchToSignIn);
document.querySelector('.sign-up').addEventListener('click', switchToSignUp);

function switchToSignIn() {
    signUpSection.style.visibility = "hidden";
    signInSection.style.visibility = "visible";
}

function switchToSignUp() {
    signInSection.style.visibility = "hidden";
    signUpSection.style.visibility = "visible";
}
