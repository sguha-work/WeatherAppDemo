"use strict";
WA.models.WeatherModel = Backbone.Model.extend({
	apiKey : "b35e5e51128992747a9393ab8ba53b8b",
	count  : 14,
	urlBase : "http://api.openweathermap.org/data/2.5/forecast/daily?",
	getWeatherDetail : function(cityName) {
		cityName = $.trim(cityName);
		var selfObject = this;
		this.fetch({
			url : this.urlBase + "q=" + cityName + "&cnt=" + this.count +"&APPID=" + this.apiKey,
			crossDomain : true,
			timeout     : 10000,
			success : function(modelInstance, rawResult) {
				selfObject.clear("WeatherData");
				selfObject.set("WeatherData",rawResult);
				selfObject.trigger("WEATHER_DATA_RECEIVED");
			},
			error : function() {
				selfObject.trigger("DATA_FETCH_ERROR");
			}
		});
	}
});