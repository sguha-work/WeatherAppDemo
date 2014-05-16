"use strict";
WA.views.DisplayWeather = Backbone.View.extend({
	
	el    : $("#weatherList"),
	initialize : function() {
		if(typeof WA.cityNames=="undefined" || WA.cityNames=="") {
			window.location = "#";
			return false;
		}
		this.model = new WA.models.WeatherModel();
		var citynames = WA.cityNames;
		this.cityNameArray = citynames.split(",");
		this.bindEvents();
		this.index = 0;
		this.getWeather(this.cityNameArray[0]);
	},
	events : {
		'click .expand'   : "expandWeatherList",
		'click .collapse' : "collapseWeatherList"
	},
	bindEvents : function() {
		this.listenTo(this.model, 'WEATHER_DATA_RECEIVED', this.populateWeatherData);
		this.listenTo(this.model, "DATA_FETCH_ERROR", this.DataFetchError);
	},
	getWeather : function(cityName) {
		this.model.getWeatherDetail(cityName);
	},
	DataFetchError : function() {
		var errorObject = {cityName : this.cityNameArray[this.index],error : true};
		if(typeof WA.templates.DisplayWeather == "undefined") {
			var selfObject = this;
			$.ajax({
				url     : "assets/js/modules/weather/views/DisplayWeather.html",
				success : function(data) {
					selfObject.template = data;
					WA.templates.DisplayWeather = data;
					selfObject.render(errorObject)
					selfObject.increaseIndex();
					
				}
			});
		}
		else {
			this.template = WA.templates.DisplayWeather;
			this.render(errorObject);
			this.increaseIndex();
		}
	},
	render : function(data) {
		if(this.index == 0) {
			this.$el.html(Mustache.render(this.template, data));			
		}
		else {
			this.$el.append(Mustache.render(this.template, data));				
		}
	},
	populateWeatherData : function() {
		var rendarableData  = this.model.get('WeatherData');
		rendarableData.name = this.cityNameArray[this.index];
		//Converting all timestamp to readable date time string and temparature from kelvin to celcius farenhite
		for(var index in rendarableData.list) {
			rendarableData.list[index].dt       = WA.common.convertTimeStampToDate(rendarableData.list[index].dt);
			rendarableData.list[index].temp.min = WA.common.convertKelvinToCelcius(rendarableData.list[index].temp.min) + "(" + WA.common.convertKelvinToFahrenheit(rendarableData.list[index].temp.min) + ")";
			rendarableData.list[index].temp.max = WA.common.convertKelvinToCelcius(rendarableData.list[index].temp.max) + "(" + WA.common.convertKelvinToFahrenheit(rendarableData.list[index].temp.max) + ")";
			rendarableData.list[index].overview = rendarableData.list[index].weather[0].main;
			rendarableData.list[index].sky = rendarableData.list[index].weather[0].description;
		}
		//Finished converting all timestamp to readable date time string and temparature from kelvin to celcius farenhite
		if(typeof WA.templates.DisplayWeather == "undefined") {
			var selfObject = this;
			$.ajax({
				url     : "assets/js/modules/weather/views/DisplayWeather.html",
				success : function(data) {
					selfObject.template = data;
					WA.templates.DisplayWeather = data;
					selfObject.render(rendarableData);			
					if(rendarableData.cod!="404") {
						selfObject.createHideShow($("div.cityWeather").last());
					}
					selfObject.increaseIndex();
				}
			});
		}
		else {
			this.template = WA.templates.DisplayWeather;
			this.render(rendarableData);
			if(rendarableData.cod!="404") {
				this.createHideShow($("div.cityWeather").last());
			}
			this.increaseIndex();
		}
	},
	increaseIndex : function() {
		this.index += 1;
		if(this.index<this.cityNameArray.length) {
			this.getWeather(this.cityNameArray[this.index]);
		}
		else {
			$("#txt_cityNames").removeAttr('readonly');
			$('button').removeAttr('disabled');
			$(".img_loadingImage").css({
				"display" : "none"
			});
			window.location = "#";
		}
	},
	createHideShow : function(element) {
		$("table tr:eq(0)",element).append("<td class='expand'>" + WA.resource.DisplayWeather.ExpandText + "</td>");
		$("table tr:gt(1)",element).css({
			"display" : "none"
		});
	},
	expandWeatherList : function(event) {
		$(event.currentTarget).html(WA.resource.DisplayWeather.CollapseText);
		$(event.currentTarget).removeClass('expand');
		$(event.currentTarget).addClass('collapse');
		var presentTable = $(event.currentTarget).parent().parent();
		$("tr:gt(1)",presentTable).each(function(index) {
			var row = $(this);
			setTimeout(function() {
	            row.slideDown(50);
	        }, 40 * index);
		})
	},
	collapseWeatherList : function(event) {
		$(event.currentTarget).html(WA.resource.DisplayWeather.ExpandText);
		$(event.currentTarget).removeClass('collapse');
		$(event.currentTarget).addClass('expand');
		var presentTable = $(event.currentTarget).parent().parent();
		$("tr:gt(1)",presentTable).each(function(index) {
			var row = $(this);
			setTimeout(function() {
	            row.slideUp(50);
	        }, 40 * index);
		})
	}
});