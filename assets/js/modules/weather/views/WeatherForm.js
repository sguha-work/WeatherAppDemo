"use strict";
WA.views.WeatherForm = Backbone.View.extend({
	el          : $("#div_weatherForm"),
	initialize  : function() {
		this.getTemplate();
	},
	events : {
		'click button'         : 'navigateToGetWeather',
		'keyup #txt_cityNames' : 'checkKey'
	},
	getTemplate : function() {
		if(typeof WA.templates.WeatherForm == "undefined") {
			var selfObject = this;
			$.ajax({
				url     : "assets/js/modules/weather/views/WeatherForm.html",
				success : function(data) {
					WA.templates.WeatherForm = data;
					selfObject.template     = data;
					selfObject.loadTemplate();
				}
			});
		}
		else {
			this.template = WA.templates.WeatherForm;
			this.loadTemplate();
		}	
	},
	loadTemplate : function() {
		this.$el.html(this.template);
		$("#txt_cityNames").focus();
	},
	navigateToGetWeather : function() {
		if($.trim($("#txt_cityNames").val()) != "") {
			$("#weatherList").empty();
			$("#txt_cityNames").attr('readonly','readonly');
			$('button').attr('disabled','disabled');
			$(".img_loadingImage").css({
				"display" : "block"
			});
			WA.cityNames = $.trim($("#txt_cityNames").val());
			window.location = "#get_weather";
		}
		
	},
	checkKey : function(event) {
		if(event.keyCode == 13) {
			this.navigateToGetWeather();
		}
	},
	
});