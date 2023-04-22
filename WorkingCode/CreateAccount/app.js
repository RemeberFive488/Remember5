let userID;
let writeDoc=false;
let error_nums=0;

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
      //console.log(userID);

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

// db.collection("CreateAccount").onSnapshot(
//     snapshot => {
//          //console.log(snapshot)
//         let changes = snapshot.docChanges()
//          //console.log(changes)
//         changes.forEach(
//             change => {
//                 //console.log(change.type)
//                 //console.log(change.doc.data())
//                 switch (change.type) {
//                     case "added":
//                         renderLandmark(change.doc)
//                         break;
//                     case "removed":
//                         let li = document.querySelector(`[data-id=${change.doc.id}]`)
//                         ul.removeChild(li)
//                         break;
//                     default:
//                         console.log("unsupported event", change.type)
//                 }
//             }
//         )
//     }
// )

form.addEventListener("submit", e => {
    e.preventDefault();

    console.log("FORM SUBMITTED")

    writeDoc=true;
    
  
    // sign up the user
  auth.createUserWithEmailAndPassword(form.emailid.value, form.passwordid.value).then(cred => {
    const user_name = form.nameid.value

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

        // Check if the error-message element exists
        var errorMessageDiv2 = document.getElementById("error-message");
        if (errorMessageDiv2) {
            errorMessageDiv2.remove();
        }
  

        var newDiv = document.createElement("div");
        newDiv.id = "success-message";
  
        // Append the new div to an existing element
        var parentElement = document.getElementById("parentError");
        parentElement.appendChild(newDiv);
  
          //console.log(error.message)
          console.log("Success:Your account has been created, please login!")
          var errorMessage = "Success: Account created, please login!";
          document.getElementById("success-message").innerHTML = errorMessage;
   

  }).catch(function(error) {

    //console.log("I AM HERERE")
    writeDoc=false;
   if(error.message !== "user_name is not defined"){
    
    if(error_nums>0){
      document.getElementById("error-message").innerHTML = "";
      var errorMessageDiv = document.getElementById("error-message");
      if (errorMessageDiv) {
          errorMessageDiv.remove();
      }

    }

    var newDiv = document.createElement("div");
      newDiv.id = "error-message";

      // Append the new div to an existing element
      var parentElement = document.getElementById("parentError");
      parentElement.appendChild(newDiv);

        //console.log(error.message)
        console.log("Error: "+error.message)
        var errorMessage = "Error: " + error.message;
        document.getElementById("error-message").innerHTML = errorMessage;
        error_nums++;
      }
      else{

        if(error_nums>0){
          document.getElementById("error-message").innerHTML = "";
          var errorMessageDiv = document.getElementById("error-message");
          if (errorMessageDiv) {
              errorMessageDiv.remove();
          }
    
        }
        // var newDiv = document.createElement("div");
        // newDiv.id = "success-message";
  
        // // Append the new div to an existing element
        // var parentElement = document.getElementById("parentError");
        // parentElement.appendChild(newDiv);
  
        //   //console.log(error.message)
        //   console.log("Success:Your account has been created, please login!")
        //   var errorMessage = "Success: Account created, please login!";
        //   document.getElementById("success-message").innerHTML = errorMessage;

      }
    
  });

  (async () => {
    console.log("Code before the delay.");

    await new Promise(resolve => setTimeout(resolve, 10000)); // 10000 ms = 10 seconds

    //console.log("Code after the delay.");
})();

console.log("writeDoc: ",writeDoc)

  if(writeDoc==true){

  
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
    // form.nameid.value="";
    //form.emailid.value="";
    //form.passwordid.value="";
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
  });
}
  


  

})

const logout = document.getElementById("logout");
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{

        console.log("Signed Out")
    })
})