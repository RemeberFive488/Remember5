let usernameDB;
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
        usernameDB=user.displayName;
      } else {
        console.log('User logged out');
      }
    })

    auth.onAuthStateChanged(user => {
        var collectionRef = db.collection(user.uid);
        var docRef = collectionRef.doc("Preferences");
      
        docRef.get().then(function (doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
      
            console.log("Notify", doc.data().notification);
            console.log("Locay", doc.data().location);
      
            // Set the initial state of the checkbox
            //if(doc.data().notification==true){
                const notificationCheckbox = document.getElementById("click");
                notificationCheckbox.checked = doc.data().notification;
            //}
            
           // if(doc.data().location==true){
                const notificationCheckbox2 = document.getElementById("click2");
                notificationCheckbox2.checked = doc.data().location;
           // }

          
      
          } else {
            console.log("Default will be off for both");
          }
        }).catch(function (error) {
          console.error("Error getting document:", error);
        });
      });
  
  });

  
 
  












//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async function permission() {
    const notifStatus = Notification_on();
    const locStatus = Location_on();

    if (locStatus) {
        Loc_DB(locStatus);
        getLocation();
    } else {
        Loc_DB(locStatus);
    }

    await sleep(1000);

    if (notifStatus) {
        Notif_DB(notifStatus);
        Notification.requestPermission().then(perm => {
            if (perm === "granted") {
                new Notification("Test Notification", {});
            }
        });
    } else {
        Notif_DB(notifStatus);
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function Notification_on(){
    let switchFlags = "";
    switchFlags=document.getElementById("click").checked;

    let notificationPreference = false;

    if (switchFlags == true) 
    {
        console.log("Notification: ON");
        notificationPreference = true;

    } 
    else if (switchFlags == false) 
    {
        console.log("Notification: OFF");
        notificationPreference = false;
    }

    

    return notificationPreference;
    
}

function Notif_DB(notificationPreference){
    const db = firebase.firestore();
    const auth = firebase.auth();

    // Update or create the Preferences document with the notification preference
    auth.onAuthStateChanged(async user => {
        if (user) {
            const collectionRef = db.collection(user.uid);
            const docRef = collectionRef.doc("Preferences");

            const doc = await docRef.get();

            if (doc.exists) {
                console.log("Document data:", doc.data());

                // Update the document with the notification preference
                docRef.update({
                    notification: notificationPreference,
                })
                    .then(function () {
                        console.log("Notification preference successfully updated!");
                    })
                    .catch(function (error) {
                        console.error("Error updating notification preference:", error);
                    });

            } else {
                console.log("Document(Notificatoin) does not exist");

                // Create the document with the notification preference
                docRef.set({
                    notification: notificationPreference,
                     username: usernameDB
                })
                    .then(function () {
                        console.log("Notification preference successfully added!");
                    })
                    .catch(function (error) {
                        console.error("Error adding notification preference:", error);
                    });
            }
        } else {
            console.log("User not logged in");
        }
    });
}

function Loc_DB(notification){
    const db = firebase.firestore();
    const auth = firebase.auth();

    // Update or create the Preferences document with the notification preference
    auth.onAuthStateChanged(async user => {
        if (user) {
            const collectionRef = db.collection(user.uid);
            const docRef = collectionRef.doc("Preferences");

            const doc = await docRef.get();

            if (doc.exists) {
                console.log("Document data:", doc.data());

                // Update the document with the notification preference
                docRef.update({
                    location: notification,
                    username: usernameDB
                })
                    .then(function () {
                        console.log("Location preference successfully updated!");
                    })
                    .catch(function (error) {
                        console.error("Error updating Location preference:", error);
                    });

            } else {
                console.log("Document(Location) does not exist");

                // Create the document with the notification preference
                docRef.set({
                    location: notification,
                    username: usernameDB
                })
                    .then(function () {
                        console.log("Location preference successfully added!");
                    })
                    .catch(function (error) {
                        console.error("Error adding Location preference:", error);
                    });
            }
        } else {
            console.log("User not logged in");
        }
    });
}

function Location_on(){
    let switchFlags = "";
    switchFlags=document.getElementById("click2").checked;


    let notificationPreference = false;

    if (switchFlags == true) 
    {
        console.log("Location: ON");
        notificationPreference = true;

    } 
    else if (switchFlags == false) 
    {
        console.log("Location: OFF");
        notificationPreference = false;
    }

    

    return notificationPreference;
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log("Latitude: " + lat + ", Longitude: " + lon);
    getAddress(lat, lon);
  }

  async function getAddress(lat, lon) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    );
  
    if (response.ok) {
        const data = await response.json();
        const address = data.display_name;
        console.log("Address:", address);
      
        
        const db = firebase.firestore()
        db.settings({});
        const auth = firebase.auth();
        auth.onAuthStateChanged(user => {
          var collectionRef = db.collection(user.uid);
          var docRef = collectionRef.doc("Preferences");
      
          docRef.get().then(function (doc) {
            if (doc.exists) {
              console.log("Document data:", doc.data());
      
              docRef.update({
                address: address,
                username: usernameDB
              })
                .then(function () {
                  console.log("Address successfully updated!");
                })
                .catch(function (error) {
                  console.error("Error updating address:", error);
                });
      
            } else {
              console.log("Document does not exist");
      
              docRef.set({
                address: address,
                username: usernameDB
              })
                .then(function () {
                  console.log("Address successfully added!");
                })
                .catch(function (error) {
                  console.error("Error adding address:", error);
                });
            }
          }).catch(function (error) {
            console.error("Error getting document:", error);
          });
        });
      } else {
        console.log("Error fetching address data");
      }
      
  }
  
