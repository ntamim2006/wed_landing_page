﻿var latlng="";


document.addEventListener("DOMContentLoaded", function(){
	
	var URLParams = {
		event: findGetParameter("event"),
		guest: findGetParameter("guest")
	};
	
	
	database.ref('/users/' + URLParams.event + '/Invitations/Event').once('value').then(function(snapshot) {
		var event = snapshot.val();
		
		var htmlData = {
			eventName: event.name,
			eventTitle: event.name,
			eventDetails: event.event_details,
			event_start: event.date + " 00:00:00",
			event_end: event.date + "24:00:00",
			event_time: event.date,
			event_title: event.name,
			event_place: event.place,
			
		};
		
		
		for(id in htmlData)
			document.getElementById(id).innerHTML = htmlData[id];
	  
	    document.getElementById("wazeLink").href = "waze://?ll=" + event.latlng + "&navigate=yes"
	  
		latlng = event.latlng;
		if (window.addtocalendar)if(typeof window.addtocalendar.start == "function")return;
            if (window.ifaddtocalendar == undefined) { window.ifaddtocalendar = 1;
                var d = document, s = d.createElement('script'), g = 'getElementsByTagName';
                s.type = 'text/javascript';s.charset = 'UTF-8';s.async = true;
                s.src = ('https:' == window.location.protocol ? 'https' : 'http')+'://addtocalendar.com/atc/1.5/atc.min.js';
                var h = d[g]('body')[0];h.appendChild(s); };
	});
	
	
	
	document.querySelector("input[type=submit]").addEventListener("click", function (){
		if(document.querySelector("input[name='attending']:checked") && document.querySelector("select").value){
			var attend = document.querySelector("input[name='attending']:checked").value;
			var numOfPeoples = document.querySelector("select").value;
			
			database.ref('/users/' + URLParams.event + '/Invitations/sent_contacts/'+URLParams.guest+'/num_of_guests').set(numOfPeoples);
			database.ref('/users/' + URLParams.event + '/Invitations/sent_contacts/'+URLParams.guest+'/arrive_state').set(attend);
						alert("תודה רבה, תשובתך נשלחה");

			
			
		}else{
			alert("נא לסמן האם ברצונך להגיע, ומספר נפשות");
		}
		
		
	});
	
	
	
});




function myNavFunc(){
    // If it's an iPhone..
    if( (navigator.platform.indexOf("iPhone") != -1) 
        || (navigator.platform.indexOf("iPod") != -1)
        || (navigator.platform.indexOf("iPad") != -1))
         window.open("maps://maps.google.com/maps?daddr=" + latlng + "&amp;ll=");
    else
         window.open("http://maps.google.com/maps?daddr=" + latlng + "&amp;ll=");
}


function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
    .substr(1)
        .split("&")
        .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
    return result;
}