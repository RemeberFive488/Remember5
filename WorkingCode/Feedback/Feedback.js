$(document).ready(function() {

    const firebaseConfig = {
      apiKey: "AIzaSyBxoV0Qji0j8GjG2N4jqYWWUtmUnN1Qyec",
      authDomain: "remember5-321e2.firebaseapp.com",
      projectId: "remember5-321e2",
      storageBucket: "remember5-321e2.appspot.com",
      messagingSenderId: "363183328287",
      appId: "1:363183328287:web:3f597b880859c5eb18192a",
      measurementId: "G-XPX3Y2K184"
    };

    const form = document.querySelector('form');
const reviewInput = document.getElementById('review');
const suggestionInput = document.getElementById('suggestion');
const ratingInputs = document.querySelectorAll('input[name="rate"]');

    firebase.initializeApp(firebaseConfig)
      const db = firebase.firestore()
      db.settings({});

      const auth = firebase.auth();


      var currentUser = ""
      auth.onAuthStateChanged(user => {
          if (user) {
            console.log('User logged in: ', user);
            currentUser = user.displayName
            console.log(user.displayName)
          } else {
            console.log('User logged out');
          }
        })

        db.collection("Feedback").where("rating", "==", "5")
            .get()
            .then((querySnapshot) => {
                const testimonials = [];
                querySnapshot.forEach((doc) => {
                testimonials.push(doc.data());
                });
                const randomIndex = Math.floor(Math.random() * testimonials.length);
                const randomTestimonial = testimonials[randomIndex];
                $("#testimonialPara").text(randomTestimonial.review);
                $("#author").text(randomTestimonial.username);
            })
            .catch((error) => {
                console.log("Error getting testimonials: ", error);
        });

        $(".myButton").on("click", function() {
          db.collection("Feedback")
            .where("rating", "==", "5")
            .get()
            .then((querySnapshot) => {
              const testimonials = [];
              querySnapshot.forEach((doc) => {
                testimonials.push(doc.data());
              });
              if (testimonials.length > 1) {
                const currentIndex = testimonials.findIndex((testimonial) => {
                  return testimonial.review === $("#testimonialPara").text();
                });
                let newIndex = 0;
                do {
                  newIndex = Math.floor(Math.random() * (testimonials.length));
                } while (newIndex === currentIndex);
                const randomTestimonial = testimonials[newIndex];
                $("#testimonialPara").text(randomTestimonial.review);
                $("#author").text(randomTestimonial.username);
              } else {
                //console.log("Not enough testimonials with rating 5");
              }
            })
            .catch((error) => {
              console.log("Error getting testimonials: ", error);
            });
        });
        
        

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const review = reviewInput.value;
            const suggestion = suggestionInput.value;
            const rating = Array.from(ratingInputs).find(input => input.checked)?.value || null;
            
            const chatroomMessagesRef = db.collection('Feedback');
            
            chatroomMessagesRef.get().then((snapshot) => {
              const numDocuments = snapshot.size;
              
              // Create a new document with the updated document name
              const newDocumentName = `${numDocuments + 1}_feedback`;
              
              chatroomMessagesRef.doc(newDocumentName).set({
                review: review,
                suggestion: suggestion,
                rating: rating,
                username: currentUser
              })
              .then(() => {
                console.log("Document successfully written!");
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
              });
            });
            
            // Reset form inputs
            form.reset();
            ratingInputs.forEach(input => input.checked = false);
          });

})

        