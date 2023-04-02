document.addEventListener('DOMContentLoaded', () => {
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
  
    
  });