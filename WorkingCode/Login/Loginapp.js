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
  


        const logout = document.getElementById("logout");
        logout.addEventListener('click',(e)=>{
            e.preventDefault();
            auth.signOut().then(()=>{
        
                console.log("Signed Out")
            })
        })



 function Login(){

      
  const loginForm = document.getElementById('Login_form');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = loginForm['nameidl'].value;
    const password = loginForm['passwordidl'].value;
    
  
    try {
      const cred = await auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
      console.log(email);
      console.log(password);
      console.log("Logged User in");

      window.location.href = "\\WorkingCode\\Homepage\\ActuallyHomePage.html";


      })
      
    } catch (error) {
        console.log(error)
        console.log("Unsuccessful Login")
        alert("Wrong Email/Password")
        
    }
  });
  

    


} 