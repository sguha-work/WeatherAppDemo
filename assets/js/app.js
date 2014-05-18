/**
* This the entry point of the whole application
*/
"use strict";
var WA       = {};//This is the global object representing the whole application
WA.views     = {};
WA.models    = {};
WA.templates = {};
WA.common    = {};
WA.resource  = {};
$(document).ready(function(){

	getTheLibraryFiles(function(){
		initiateRouter();
	});

});
var getTheLibraryFiles = function(callBack) {

	require(['assets/js/libs/underscore-min.js'], function(){
		require(['assets/js/libs/backbone.js'], function() {
			require(['assets/js/modules/common.js'], function() {
				require(['assets/js/modules/resource.js'], function() {
					callBack();		
				});
			});
		});
	});

}
var initiateRouter = function() {

	require(['assets/js/modules/MainRouter.js'], function() {

	});

}