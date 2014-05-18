/** 
*   This is the common file which holds all the common 
*   function which are going to be used throughout the application
*/
"use strict";
WA.common.convertTimeStampToDate = function(timeStamp) {
    var monthNameArray    = ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'];
    var weekDaysNameArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    timeStamp = timeStamp*1000;
    var date = new Date(timeStamp);
	var dateString = date.getDate() + " " + monthNameArray[date.getMonth()] + " " + date.getFullYear() + "," + weekDaysNameArray[date.getDay()]; //+ " " + date.getHours() + ":" + date.getMinutes();
	return dateString;
};

WA.common.convertKelvinToCelcius = function(kelvin) {
	return ((kelvin - 273).toFixed(2) + " degree Celcius");
};

WA.common.convertKelvinToFahrenheit = function(kelvin) {
	return ((((kelvin - 273)*(9/5))+32).toFixed(2) + " degree Fahrenheit");
};