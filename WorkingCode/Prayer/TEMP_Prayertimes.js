fetch("https://api.aladhan.com/v1/timingsByCity?city=West%20Grove&country=United%20States&method=2").then((data)=>{
    return data.json(); 
}).then((objectData)=>{
    
    ShowNotification(objectData.data.timings.Fajr,objectData.data.timings.Sunrise,objectData.data.timings.Dhuhr,objectData.data.timings.Asr,objectData.data.timings.Maghrib,objectData.data.timings.Isha);
});




function getTwentyFourHourTime(amPmString) { 
    var d = new Date("1/2/2023 " + amPmString); 
    min = (d.getMinutes()<10?'0':'') + d.getMinutes();
    return d.getHours() + ':' + min + ':' + d.getSeconds(); 
}


function ShowNotification(Fajr,Sunrise,Dhuhr,Asr,Maghrib,Isha) { 

    setInterval(() =>{ 

    const d = new Date();
        
        if (getTwentyFourHourTime(d.toLocaleTimeString()) > Fajr && getTwentyFourHourTime(d.toLocaleTimeString()) < Sunrise ) {
            Notification.requestPermission().then(perm =>{
                if(perm === "granted"){
                    new Notification("Notification from Remember5",{
                        body: "Time for Prayer: Fajr",
                        icon: "Moon.png",
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
                        icon: "Moon.png",
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
                        icon: "Moon.png",
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
                        icon: "Moon.png",
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
                        icon: "Moon.png",
                        tag: "Time for Prayer: Isha",
                    
                    });
                }
                
                
            }) 

           
        }
        
    },60 * 1000);
}