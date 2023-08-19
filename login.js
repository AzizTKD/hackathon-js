import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js";
 import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
 import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
 import { sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
 import { doc, setDoc,getFirestore } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"; 
 import { getDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "AIzaSyCzDBKBx6PLKeAFPNzRjPwKKlXwgO_9Ldo",
  authDomain: "hackathone-5e4d8.firebaseapp.com",
  projectId: "hackathone-5e4d8",
  storageBucket: "hackathone-5e4d8.appspot.com",
  messagingSenderId: "709107012355",
  appId: "1:709107012355:web:f3ca7c04e4862678cd0f36",
  measurementId: "G-S2R6MNP9VV"
};

 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const auth = getAuth();
 const db=getFirestore();
 let logbutton=document.getElementById("button2")
 console.log(logbutton)
 logbutton.addEventListener("click",function(){
 let loginemail=document.getElementById("login-email")
 let loginpassword=document.getElementById("login-password")

 let show=document.getElementById("pp")

 signInWithEmailAndPassword(auth, loginemail.value, loginpassword.value)
  .then( async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    window.location.href="user.html"
    console.log("Singed In")
    
    // ...
    const docRef = doc(db, "Users", userCredential.user.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }


  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorCode,
      
    })

  });


  sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    // ...
    console.log("sent")
  });

 })
 

