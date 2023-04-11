let userID;
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

auth.onAuthStateChanged(user => {
    if (user) {
      userID=user.uid;
      console.log(userID);

      db.collection("CreateAccount")
      .doc(form.emailid.value)
      .update({
        ID: userID
      })
      .then(() => {
        console.log("UID successfully Entered!");
      })
      .catch((error) => {
        console.error("Error adding UID: ", error);
      });
    
      console.log('User logged in: ', user);
    } else {
      console.log('User logged out');
    }
  })

const renderLandmark = (doc) => {

    
    //console.log("we made it")
}

db.collection("CreateAccount").onSnapshot(
    snapshot => {
         //console.log(snapshot)
        let changes = snapshot.docChanges()
         //console.log(changes)
        changes.forEach(
            change => {
                //console.log(change.type)
                //console.log(change.doc.data())
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

    const user_name = form.nameid.value

    db.collection("CreateAccount")
    .doc(form.emailid.value)
    .set({
      nameid: form.nameid.value,
      emailid: form.emailid.value,
      passwordid: form.passwordid.value,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

  
  
    // sign up the user
  auth.createUserWithEmailAndPassword(form.emailid.value, form.passwordid.value).then(cred => {
   
    var userc = firebase.auth().currentUser;
    if (userc) {
        userc.updateProfile({
          displayName: user_name
        }).then(() => {
          // Update successful
          // ...
          console.log("Name is updated")
        }).catch((error) => {
          // An error occurred
          // ...
           console.log("Error in updating Name")
        });  
        
        // console.log("User ID:")
        // console.log(userc.uid)
        // console.log("END User ID:")

      db.collection(userc.uid).add({
         
          });



      
      } else {
          // User is not signed in
          console.log("User is not signed in again")
        }

  }).catch(function(error) {
    //Error could be something like EMAIL already in use
    //TODO: add something for user to see the error message
    console.log(error.message);
  });

//   const upuser = firebase.auth().currentUser;




    // form.nameid.value = ''
    // form.emailid.value = ''
    // form.passwordid.value = ''


   
  

})

const logout = document.getElementById("logout");
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{

        console.log("Signed Out")
    })
})