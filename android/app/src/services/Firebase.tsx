// eslint-disable-next-line @typescript-eslint/ban-ts-comment

// Import the functions you need from the SDKs you need
import firebase from '@react-native-firebase/app';

import {addUserMongoDB} from './MongoDBFetch'
// import ReactObserver from 'react-event-observer';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACXjdizzhp4-5Qn8jxFuz8I6rL8rulsDM",
    authDomain: "reflix-auth-d87c8.firebaseapp.com",
    // authDomain: "http://localhost:3000/",
    projectId: "reflix-auth-d87c8",
    storageBucket: "reflix-auth-d87c8.appspot.com",
    messagingSenderId: "923359454044",
    appId: "1:923359454044:web:c8db157a8f594c8a191799"
  };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const auth = firebase.auth()
// const user = auth.currentUser;
// export const firebaseObserver = ReactObserver();

// async function registerUser(username, email, password){
//     createUserWithEmailAndPassword(auth, email, password)
//     .then(res => {
//       updateProfile(auth.currentUser, {
//         displayName: username, photoURL: "https://example.com/jane-q-user/profile.jpg"
//       })
//       addUserMongoDB(res.user.uid)
//       localStorage.setItem("accessToken", JSON.stringify(res.user.accessToken));
//       localStorage.setItem("userId", JSON.stringify(res.user.uid));
//       localStorage.setItem("userData", JSON.stringify(res.user));
//     }
//   )
// }

// async function signInUser(email, password){
//   signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//       console.log(userCredential.user.email)
//       localStorage.setItem("accessToken", JSON.stringify(userCredential.user.accessToken));
//       localStorage.setItem("userId", JSON.stringify(userCredential.user.uid));
//       localStorage.setItem("userData", JSON.stringify(userCredential.user));
//       firebaseObserver.publish("loggedIn", userCredential.user)
//   })
//   .catch((error) => {
//     console.log(error.code)
//     firebaseObserver.publish("loginError", error)
//   });
// }

// async function checkUserState(){
//   onAuthStateChanged(auth, async (user)=>{      
//     firebaseObserver.publish("checkingState", user)
//       // localStorage.setItem("userData", JSON.stringify(auth.currentUser));
//   })
//   console.log(uid)
// }

// async function signUserOut(){
//   signOut(auth).then(() => {
//     console.log('User signed out')
//   }).catch((error) => {
//     console.log(error)
//   });  
// }

// const provider = new GoogleAuthProvider();

// async function googleSignIn(){
//   signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     localStorage.setItem("accessToken", JSON.stringify(user.accessToken));
//     localStorage.setItem("userId", JSON.stringify(user.uid));
//     localStorage.setItem("userData", JSON.stringify(user))
//     console.log(user)
//     firebaseObserver.publish("googleLoggedIn", user)
//     window.location.href = ('/')
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     // const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });
// }

// onAuthStateChanged(function(user) {
//   firebaseObserver.publish("authStateChanged", loggedIn())
// });

// export { app, auth, registerUser, signInUser, signUserOut, checkUserState, googleSignIn };
// export { app, auth };