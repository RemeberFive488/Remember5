let time = document.getElementById("current-time");
setInterval(() =>{

    const d = new Date();
    time.innerHTML = (d.toLocaleTimeString());   

},1000);

function getTwentyFourHourTime(amPmString) { 
    var d = new Date("1/2/2023 " + amPmString); 
    min = (d.getMinutes()<10?'0':'') + d.getMinutes();
    sec = (d.getSeconds()<10?'0':'') + d.getSeconds();

    return d.getHours() + ':' + min + ':' + sec; 
    
}