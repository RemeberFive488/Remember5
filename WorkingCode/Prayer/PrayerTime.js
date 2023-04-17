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
  
  let UniBool=true;
  const auth = firebase.auth();

  auth.onAuthStateChanged(user => {
    if (user) 

    {
      console.log('User logged in: ', user);

    } 


    else 
    {
      console.log('User logged out');
    }

  });

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 auth.onAuthStateChanged(user => {
 var collectionRef = db.collection(user.uid);
  var docRef = collectionRef.doc("Prayer_City_Country");

  docRef.get().then(function(doc) {
  if (doc.exists) {
      console.log("Document data:", doc.data());

    //   console.log(doc.data().City)
    //   console.log(doc.data().Country)


      var cityInput = document.getElementById("city");
    //   cityInput.innerHTML = doc.data().City;
      cityInput.setAttribute("value", doc.data().City);

      var stateInput = document.getElementById("state");
      //   countryInput.innerHTML = doc.data().State;
      stateInput.setAttribute("value", doc.data().State);


      var countryInput = document.getElementById("country");
    //   countryInput.innerHTML = doc.data().Country;
    countryInput.setAttribute("value", doc.data().Country);

    
       initial(doc.data().City,doc.data().Country,doc.data().State)
      
  } else {
      console.log("Document does not exist");
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log("Calling this")

fetch("https://api.aladhan.com/v1/timingsByCity?city=West%20Grove&state=PA&country=United%20States&method=2").then((data)=>{
    //console.log(data); json formatr
    return data.json(); //Convert to object
}).then((objectData)=>{
    //console.log(objectData.data.timings);

    
    Fajr=`<p>${Twelve_hour_format(objectData.data.timings.Fajr)}</p>`;
    document.getElementById("Fajr").innerHTML= Fajr;

    
    Sunrise=`<p>${Twelve_hour_format(objectData.data.timings.Sunrise)}</p>`;
    document.getElementById("Sunrise").innerHTML= Sunrise;

    Sunrise2=`<p>${Twelve_hour_format(objectData.data.timings.Sunrise)}</p>`;
    document.getElementById("Sunrise2").innerHTML= Sunrise2;

    Sunrise3=`<p>${Twelve_hour_format(objectData.data.timings.Sunrise)}</p>`;
    document.getElementById("Sunrise3").innerHTML= Sunrise3;


    Dhuhr=`<p>${Twelve_hour_format(objectData.data.timings.Dhuhr)}</p>`;
    document.getElementById("Dhuhr").innerHTML= Dhuhr;

   
    Asr=`<p>${Twelve_hour_format(objectData.data.timings.Asr)}</p>`;
    document.getElementById("Asr").innerHTML= Asr;

    Asr2=`<p>${Twelve_hour_format(objectData.data.timings.Asr)}</p>`;
    document.getElementById("Asr2").innerHTML= Asr2;

    
    Maghrib=`<p>${Twelve_hour_format(objectData.data.timings.Maghrib)}</p>`;
    document.getElementById("Maghrib").innerHTML= Maghrib;

    Maghrib2=`<p>${Twelve_hour_format(objectData.data.timings.Maghrib)}</p>`;
    document.getElementById("Maghrib2").innerHTML= Maghrib2;

    Isha=`<p>${Twelve_hour_format(objectData.data.timings.Isha)}</p>`;
    document.getElementById("Isha").innerHTML= Isha;
    
    Isha2=`<p>${Twelve_hour_format(objectData.data.timings.Isha)}</p>`;
    document.getElementById("Isha2").innerHTML= Isha2;

    document.getElementById("Midnight").innerHTML= '11:59 PM';

    let time = document.getElementById("Upcoming");
    setInterval(() =>{

        const d = new Date();
        
        var a = (d.getHours());
        var b = (getHours(objectData.data.timings.Fajr));
        
        //console.log((d.getHours())-(b));
        //console.log(a);
        //console.log(b);
        //console.log(a-b);

        if (getTwentyFourHourTime(d.toLocaleTimeString()) > objectData.data.timings.Fajr && getTwentyFourHourTime(d.toLocaleTimeString()) < objectData.data.timings.Dhuhr ) {
            console.log("Dhuhr-auth");
            time.innerHTML = "Dhuhr";   
        } 
        else if(getTwentyFourHourTime(d.toLocaleTimeString()) > objectData.data.timings.Dhuhr && getTwentyFourHourTime(d.toLocaleTimeString()) < objectData.data.timings.Asr) {
            time.innerHTML = "Asr"; 
        }
        else if(getTwentyFourHourTime(d.toLocaleTimeString()) > objectData.data.timings.Asr && getTwentyFourHourTime(d.toLocaleTimeString()) < objectData.data.timings.Maghrib) {
            time.innerHTML = "Maghrib"; 
        }
        else if(getTwentyFourHourTime(d.toLocaleTimeString()) > objectData.data.timings.Maghrib && getTwentyFourHourTime(d.toLocaleTimeString()) < objectData.data.timings.Isha) {
            time.innerHTML = "Isha"; 
        }
        else if(getTwentyFourHourTime(d.toLocaleTimeString()) > objectData.data.timings.Isha) {
            time.innerHTML = "Fajr";

           
        }
        else{
            time.innerHTML = "Fajr"; 
        }
        //console.log(getTwentyFourHourTime(d.toLocaleTimeString()+(15)));

    },1000);
    //console.log(time.innerHTML);
    
    ShowNotification(objectData.data.timings.Fajr,objectData.data.timings.Sunrise,objectData.data.timings.Dhuhr,objectData.data.timings.Asr,objectData.data.timings.Maghrib,objectData.data.timings.Isha);

    //Upcoming
 
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }
  }).catch(function(error) {
  console.error("Error getting document:", error);
  });
});


function myFunction(){

UniBool=false;
let city = document.querySelector("#city");
let country = document.querySelector("#country");
let state = document.querySelector("#state");
let message = document.querySelector("#message");
//console.log(city.value);

auth.onAuthStateChanged(user => {
    if (user) 
    {
  
      var uid = user.uid;
      var docRef = db.collection(uid).doc("Prayer_City_Country");

      docRef.set({
        City: city.value,
        State: state.value,
        Country: country.value
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


  //initial(city.value,country.value,state.value);

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

fetch("https://api.aladhan.com/v1/timingsByCity?city="+city.value+"&state="+state.value+"&country="+country.value+"&method=2").then((data)=>{
    //console.log(data); json formatr
    return data.json(); //Convert to object
}).then((objectData)=>{
    //console.log(objectData.data.timings);

    
     
    Fajr=`<p>${Twelve_hour_format(objectData.data.timings.Fajr)}</p>`;
    document.getElementById("Fajr").innerHTML= Fajr;

    
    Sunrise=`<p>${Twelve_hour_format(objectData.data.timings.Sunrise)}</p>`;
    document.getElementById("Sunrise").innerHTML= Sunrise;

    Sunrise2=`<p>${Twelve_hour_format(objectData.data.timings.Sunrise)}</p>`;
    document.getElementById("Sunrise2").innerHTML= Sunrise2;

    Sunrise3=`<p>${Twelve_hour_format(objectData.data.timings.Sunrise)}</p>`;
    document.getElementById("Sunrise3").innerHTML= Sunrise3;


    Dhuhr=`<p>${Twelve_hour_format(objectData.data.timings.Dhuhr)}</p>`;
    document.getElementById("Dhuhr").innerHTML= Dhuhr;

   
    Asr=`<p>${Twelve_hour_format(objectData.data.timings.Asr)}</p>`;
    document.getElementById("Asr").innerHTML= Asr;

    Asr2=`<p>${Twelve_hour_format(objectData.data.timings.Asr)}</p>`;
    document.getElementById("Asr2").innerHTML= Asr2;

    
    Maghrib=`<p>${Twelve_hour_format(objectData.data.timings.Maghrib)}</p>`;
    document.getElementById("Maghrib").innerHTML= Maghrib;

    Maghrib2=`<p>${Twelve_hour_format(objectData.data.timings.Maghrib)}</p>`;
    document.getElementById("Maghrib2").innerHTML= Maghrib2;

    Isha=`<p>${Twelve_hour_format(objectData.data.timings.Isha)}</p>`;
    document.getElementById("Isha").innerHTML= Isha;
    
    Isha2=`<p>${Twelve_hour_format(objectData.data.timings.Isha)}</p>`;
    document.getElementById("Isha2").innerHTML= Isha2;

    document.getElementById("Midnight").innerHTML= '11:59 PM';

    let time = document.getElementById("Upcoming");
    setInterval(() =>{

        const d = new Date();
        
        var a = (d.getHours());
        var b = (getHours(objectData.data.timings.Fajr));
        
        //console.log((d.getHours())-(b));
        //console.log(a);
        //console.log(b);
        //console.log(a-b);

        if (getTwentyFourHourTime(d.toLocaleTimeString()) > objectData.data.timings.Fajr && getTwentyFourHourTime(d.toLocaleTimeString()) < objectData.data.timings.Dhuhr ) {
            console.log("Dhuhr-myfunction");
            time.innerHTML = "Dhuhr";   
        } 
        else if(getTwentyFourHourTime(d.toLocaleTimeString()) > objectData.data.timings.Dhuhr && getTwentyFourHourTime(d.toLocaleTimeString()) < objectData.data.timings.Asr) {
            time.innerHTML = "Asr"; 
        }
        else if(getTwentyFourHourTime(d.toLocaleTimeString()) > objectData.data.timings.Asr && getTwentyFourHourTime(d.toLocaleTimeString()) < objectData.data.timings.Maghrib) {
            time.innerHTML = "Maghrib"; 
        }
        else if(getTwentyFourHourTime(d.toLocaleTimeString()) > objectData.data.timings.Maghrib && getTwentyFourHourTime(d.toLocaleTimeString()) < objectData.data.timings.Isha) {
            time.innerHTML = "Isha"; 
        }
        else if(getTwentyFourHourTime(d.toLocaleTimeString()) > objectData.data.timings.Isha) {
            time.innerHTML = "Fajr";

           
        }
        else{
            time.innerHTML = "Fajr"; 
        }

    },1000);
    
    ShowNotification(objectData.data.timings.Fajr,objectData.data.timings.Sunrise,objectData.data.timings.Dhuhr,objectData.data.timings.Asr,objectData.data.timings.Maghrib,objectData.data.timings.Isha);
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

 
}).catch((error) => {
    console.error("Error fetching data from API:");
    alert("Bad Address, Please Try Again")
  });

}

function getTwentyFourHourTime(amPmString) { 
    var d = new Date("1/2/2023 " + amPmString); 
    min = (d.getMinutes()<10?'0':'') + d.getMinutes();
    

    return d.getHours() + ':' + min + ':' + d.getSeconds(); 
}


function getHours(amPmString) { 
    var d = new Date("1/1/2013 " + amPmString); 
    return d.getHours(); 
}

function ShowNotification(Fajr,Sunrise,Dhuhr,Asr,Maghrib,Isha) { 

   

    setInterval(() =>{ 


   
    
    const d = new Date();
        
        

        if (getTwentyFourHourTime(d.toLocaleTimeString()) > Fajr && getTwentyFourHourTime(d.toLocaleTimeString()) < Sunrise ) {
            Notification.requestPermission().then(perm =>{
                if(perm === "granted"){
                    new Notification("Notification from Remember5",{
                        body: "Time for Prayer: Fajr",
                        icon: "\\WorkingCode\\Images\\Moon.png",
                        tag: "Time for Prayer: Fajr",
                    
                    });
                }
                
                
            })  
        } 
        else if(getTwentyFourHourTime(d.toLocaleTimeString()) > Dhuhr && getTwentyFourHourTime(d.toLocaleTimeString()) < Asr) {
            Notification.requestPermission().then(perm =>{
                if(perm === "granted"){
                    new Notification("Notification from Remember5",{
                        body: "Time for Prayer: Dhuhr",
                        icon: "\\WorkingCode\\Images\\Moon.png",
                        tag: "Time for Prayer: Dhuhr",
                    
                    });
                }
                
                
            })  
        }
        else if(getTwentyFourHourTime(d.toLocaleTimeString()) > Asr && getTwentyFourHourTime(d.toLocaleTimeString()) < Maghrib) {
            
            Notification.requestPermission().then(perm =>{
                if(perm === "granted"){
                    new Notification("Notification from Remember5",{
                        body: "Time for Prayer: Asr",
                        icon: "\\WorkingCode\\Images\\Moon.png",
                        tag: "Time for Prayer: Asr",
                    
                    });
                }
                
                
            }) 


        }
        else if(getTwentyFourHourTime(d.toLocaleTimeString()) > Maghrib && getTwentyFourHourTime(d.toLocaleTimeString()) < Isha) {
            
            Notification.requestPermission().then(perm =>{
                if(perm === "granted"){
                    new Notification("Notification from Remember5",{
                        body: "Time for Prayer: Maghrib",
                        icon: "\\WorkingCode\\Images\\Moon.png",
                        tag: "Time for Prayer: Maghrib",
                    
                    });
                }
                
                
            }) 

        }
        else if(getTwentyFourHourTime(d.toLocaleTimeString()) > Isha) {

            Notification.requestPermission().then(perm =>{
                if(perm === "granted"){
                    new Notification("Notification from Remember5",{
                        body: "Time for Prayer: Isha",
                        icon: "\\WorkingCode\\Images\\Moon.png",
                        tag: "Time for Prayer: Isha",
                    
                    });
                }
                
                
            }) 

           
        }
        
    },30 * 1000);
}

function Twelve_hour_format(time){

var date = new Date("February 04, 2011 "+ time);
    var options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
    };
var timeString = date.toLocaleString('en-US', options);
return timeString;
}


function initial(city,country,state){
    console.log("initial")
    fetch("https://api.aladhan.com/v1/timingsByCity?city="+city+"&state="+state+"&country="+country+"&method=2").then((data)=>{
    //console.log(data); json formatr
    return data.json(); //Convert to object
}).then((objectData)=>{
    //console.log(objectData.data.timings);

    
     
    Fajr=`<p>${Twelve_hour_format(objectData.data.timings.Fajr)}</p>`;
    document.getElementById("Fajr").innerHTML= Fajr;

    
    Sunrise=`<p>${Twelve_hour_format(objectData.data.timings.Sunrise)}</p>`;
    document.getElementById("Sunrise").innerHTML= Sunrise;

    Sunrise2=`<p>${Twelve_hour_format(objectData.data.timings.Sunrise)}</p>`;
    document.getElementById("Sunrise2").innerHTML= Sunrise2;

    Sunrise3=`<p>${Twelve_hour_format(objectData.data.timings.Sunrise)}</p>`;
    document.getElementById("Sunrise3").innerHTML= Sunrise3;


    Dhuhr=`<p>${Twelve_hour_format(objectData.data.timings.Dhuhr)}</p>`;
    document.getElementById("Dhuhr").innerHTML= Dhuhr;

   
    Asr=`<p>${Twelve_hour_format(objectData.data.timings.Asr)}</p>`;
    document.getElementById("Asr").innerHTML= Asr;

    Asr2=`<p>${Twelve_hour_format(objectData.data.timings.Asr)}</p>`;
    document.getElementById("Asr2").innerHTML= Asr2;

    
    Maghrib=`<p>${Twelve_hour_format(objectData.data.timings.Maghrib)}</p>`;
    document.getElementById("Maghrib").innerHTML= Maghrib;

    Maghrib2=`<p>${Twelve_hour_format(objectData.data.timings.Maghrib)}</p>`;
    document.getElementById("Maghrib2").innerHTML= Maghrib2;
    console.log("Maghrib2: ",Maghrib2 )

    Isha=`<p>${Twelve_hour_format(objectData.data.timings.Isha)}</p>`;
    document.getElementById("Isha").innerHTML= Isha;
    
    Isha2=`<p>${Twelve_hour_format(objectData.data.timings.Isha)}</p>`;
    document.getElementById("Isha2").innerHTML= Isha2;

    document.getElementById("Midnight").innerHTML= '11:59 PM';

    let time = document.getElementById("Upcoming");
    setInterval(() =>{
        if(UniBool==true){
            const d = new Date();
        
            var a = (d.getHours());
            var b = (getHours(objectData.data.timings.Fajr));
            
            //console.log((d.getHours())-(b));
            //console.log(a);
            //console.log(b);
            //console.log(a-b);
    
            if (getTwentyFourHourTime(d.toLocaleTimeString()) > objectData.data.timings.Fajr && getTwentyFourHourTime(d.toLocaleTimeString()) < objectData.data.timings.Dhuhr ) {
                console.log("Dhuhr-initial");
                time.innerHTML = "Dhuhr";   
            } 
            else if(getTwentyFourHourTime(d.toLocaleTimeString()) > objectData.data.timings.Dhuhr && getTwentyFourHourTime(d.toLocaleTimeString()) < objectData.data.timings.Asr) {
                console.log("ASR-initial");
                time.innerHTML = "Asr"; 
            }
            else if(getTwentyFourHourTime(d.toLocaleTimeString()) > objectData.data.timings.Asr && getTwentyFourHourTime(d.toLocaleTimeString()) < objectData.data.timings.Maghrib) {
                time.innerHTML = "Maghrib"; 
            }
            else if(getTwentyFourHourTime(d.toLocaleTimeString()) > objectData.data.timings.Maghrib && getTwentyFourHourTime(d.toLocaleTimeString()) < objectData.data.timings.Isha) {
                time.innerHTML = "Isha"; 
                

            }
            else if(getTwentyFourHourTime(d.toLocaleTimeString()) > objectData.data.timings.Isha) {
                time.innerHTML = "Fajr";
    
               
            }
            else{
                time.innerHTML = "Fajr"; 
            }
        }

        

    },1000);
    
    ShowNotification(objectData.data.timings.Fajr,objectData.data.timings.Sunrise,objectData.data.timings.Dhuhr,objectData.data.timings.Asr,objectData.data.timings.Maghrib,objectData.data.timings.Isha);

 
});
}