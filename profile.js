import {
    doc,
    getDoc,
    addDoc,
    query, where, getDocs, collection
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { db, auth } from './data.js'
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";




onAuthStateChanged(auth, async(user) => {
    if (user) {
        let main_div = document.getElementsByClassName('main_div')

        const docRef = doc(db, "Users",user.uid)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data()
            main_div[0].innerHTML = `
    <div class="card_div">
    <div class="profile_picture">
        <img src="${data.url}"
            alt="">
    </div>
    <h1 style="font-family: sans-serif;">${data.name}</h1>
    <h2 style="font-family: sans-serif; color: gray;">${data.email}</h2>
</div>
    `
            console.log("Document data:", docSnap.data());
        } else {

            console.log("No such document!");
        }
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        window.location.replace('./signin.html')
        // ...
    }
});





// const querySnapshot = await getDocs(collection(db, "Users")).data();
// console.log(querySnapshot);
// querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => ${doc.data()}`);
// });