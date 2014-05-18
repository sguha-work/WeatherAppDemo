WeatherAppDemo
==============

This is a demo weather app using backbone js framework

Short Technical Description:-->
The weather app demo is created based on the javascript framework Backbonejs. And the used structure is MVVM.

All the text which is being displayed in the app (except text in html templates) are stored in resource.js file.

All the common functions which areused in entire app is located in the common.js file.

WA is the global object which is holding all the views, models, templates of the application.

For reducing initial page load require js is used to fetch files from nthe server only when necessary.

To reduce code complexity every views, models, templates are separatedin modules.

Mustache js is used for short and simple logicless templating.

