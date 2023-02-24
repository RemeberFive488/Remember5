function permission(){
    if(Notification_on()){
 Notification.requestPermission().then(perm =>{
        if(perm === "granted"){
            new Notification("Test Notification",{
                
            
            });
        }
        
        
    })  
    }
   
}

function Notification_on(){
    let switchFlags = "";
    switchFlags=document.getElementById("click").checked;


    if(switchFlags==true){
        return true;

    }
    else if(switchFlags==false){
        return false;

    }
    
}
