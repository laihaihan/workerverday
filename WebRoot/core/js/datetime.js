function get_time(timetable){
	
	var today=new Date();
	var month=today.getMonth()+1;
	var year, date, hours, minutes, seconds;
	var intHours, intMinutes, intSeconds;
	
	intHours = today.getHours();
	intMinutes = today.getMinutes();
	intSeconds = today.getSeconds();
	year=today.getFullYear();
	date=today.getDate();
	var time;
	if (intHours == 0) {
	 hours = "00:";
	} 
	else if (intHours < 10) {
	 hours = "0" + intHours+":";
	}
	else {
	 hours = intHours + ":";
	}
	if (intMinutes < 10) {
	 minutes = "0"+intMinutes;
	} 
	else {
	 minutes = intMinutes;
	}
	if (intSeconds < 10) {
	 seconds = "0"+intSeconds+" ";
	} 
	else {
	 seconds = intSeconds+" ";
	}
	timeString=""+year+"/"+month+"/"+date+"  "+hours+minutes+"&nbsp;&nbsp;&nbsp;";
	document.getElementById(timetable).innerHTML = timeString;
	
}
