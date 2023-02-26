const firebaseConfig = {
  apiKey: "AIzaSyBxoV0Qji0j8GjG2N4jqYWWUtmUnN1Qyec",
  authDomain: "remember5-321e2.firebaseapp.com",
  projectId: "remember5-321e2",
  storageBucket: "remember5-321e2.appspot.com",
  messagingSenderId: "363183328287",
  appId: "1:363183328287:web:3f597b880859c5eb18192a",
  measurementId: "G-XPX3Y2K184"
};
     
      firebase.initializeApp(firebaseConfig)
      const db = firebase.firestore()
      db.settings({});

      const auth = firebase.auth();


const ul = document.getElementById('landmarks_ul')
const form = document.getElementById('add_landmark_form')

const renderLandmark = (doc) => {

    
    console.log("Nigga we made it")
}

db.collection("CreateAccount").onSnapshot(
    snapshot => {
         console.log(snapshot)
        let changes = snapshot.docChanges()
         console.log(changes)
        changes.forEach(
            change => {
                console.log(change.type)
                console.log(change.doc.data())
                switch (change.type) {
                    case "added":
                        renderLandmark(change.doc)
                        break;
                    case "removed":
                        let li = document.querySelector(`[data-id=${change.doc.id}]`)
                        ul.removeChild(li)
                        break;
                    default:
                        console.log("unsupported event", change.type)
                }
            }
        )
    }
)

form.addEventListener("submit", e => {
    e.preventDefault();

    console.log("FORM SUBMITTED")

    db.collection("CreateAccount").add({
        nameid: form.nameid.value,
        emailid: form.emailid.value,
        passwordid: form.passwordid.value
    });

    // sign up the user
  auth.createUserWithEmailAndPassword(form.emailid.value, form.passwordid.value).then(cred => {
    console.log(cred.user);
    // close the signup modal & reset form

  });

    form.nameid.value = ''
    form.emailid.value = ''
    form.passwordid.value = ''


   
  

})

const logout = document.getElementById("logout");
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{

        console.log("Signed Out")
    })
})