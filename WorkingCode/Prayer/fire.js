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
    if (user) 

    {
      console.log('User logged in: ', user);
  

      ///////////////////////////////////////////////////////////////////////////////
      var uid = user.uid;
      var docRef = db.collection(uid).doc("Prayer_City_Country");

      docRef.set({
        newm: "Sup yo"
      }).then(function() 
      {
        console.log("Data written to collection");
      }).catch(function(error) 
      {
        console.error("Error writing to collection: ", error);
      });
    } 




    else 
    {
      console.log('User logged out');
    }

  });

 