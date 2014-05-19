WeatherAppDemo
==============

This is a demo weather app using backbone js framework

Short Technical Description:-->
The weather app demo is created based on the javascript framework Backbonejs. And the used structure is MVVM.

All the text which is being displayed in the app (except text in html templates) are stored in resource.js file.

All the common functions which are used in entire app is located in the common.js file.

WA is the global object which is holding all the views, models, templates, and common functions of the application.

For reducing initial page load require js is used to fetch files from nthe server only when necessary.

To reduce code complexity every views, models, templates are separatedin modules.

Mustache js is used for short and simple logicless templating.

"use strict" is used to keep the program's keyword and syntax strict

The application will receive multiple city as a comma separated value inside a input box, and after entering the city name(s) whenever user press enter or click on the button the details will be loaded. Initially every city's present day weather details will be shown, to see next 14 days weather user have to click on the expand button on corresponding city.

