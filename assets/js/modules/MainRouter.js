"use strict";
WA.MainRouter = Backbone.Router.extend({
  routes : {
  	'' : 'setWeatherForm',
  	'get_weather' : 'getWeather'
  },
  setWeatherForm : function() {
  	require(['assets/js/modules/weather/views/WeatherForm.js'], function() {
  		var WeaherForm_object = new WA.views.WeatherForm();
  	});
  },
  getWeather : function() {
  	require(['assets/js/modules/weather/models/WeatherModel.js'], function() {
      require(['assets/js/modules/weather/views/DisplayWeather.js'],function() {
        var DisplayWeather_object = new WA.views.DisplayWeather();  
      });
  		
  	});
  }
});
var routerObject = new WA.MainRouter();
if(!Backbone.history.isStarted) {
        Backbone.history.start();
}


