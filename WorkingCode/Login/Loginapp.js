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

        auth.onAuthStateChanged(user => {
            if (user) {
              console.log('User logged in: ', user);
            } else {
              console.log('User logged out');
            }
          })


        const logout = document.getElementById("logout");
        logout.addEventListener('click',(e)=>{
            e.preventDefault();
            auth.signOut().then(()=>{
        
                console.log("Signed Out")
            })
        })

        // db.collection("lt64Zd3xdrTtRr9r5KYN").add({
        //   //ICmUSgLz0XO72g9CMdPU51ZtKWk1
        //         new: "ICmUSgLz0XO72g9CMdPU51ZtKWk1"
        //     });

 function Login(){

      
  const loginForm = document.getElementById('Login_form');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = loginForm['nameidl'].value;
    const password = loginForm['passwordidl'].value;
    let infinite = true;

    // while(infinite==true){ }
  
    try {
      const cred = await auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
      console.log(email);
      console.log(password);
      console.log("Logged User in");

      window.location.href = "\\WorkingCode\\Homepage\\ActuallyHomePage.html";

      document.getElementById("error-message").innerHTML = "";

      })
      
    } catch (error) {
      

      var newDiv = document.createElement("div");
      newDiv.id = "error-message";

      // Append the new div to an existing element
      var parentElement = document.getElementById("parentError");
      parentElement.appendChild(newDiv);

        //console.log(error.message)
        console.log("Unsuccessful Login: "+error.message)
        var errorMessage = "Unsuccessful Login: " + error.message;
        document.getElementById("error-message").innerHTML = errorMessage;
        //alert(error.message)
        //Login()
        
    }


  });
  

    


} 