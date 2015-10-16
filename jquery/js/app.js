/*
    script for the index.html page
    dependencies: jquery

    open weather API: 
    http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f
*/
// will run when DOM content has been loaded...
$(function() {
    'use strict';
    $('a').attr('target', 'blank');
    $('article').hide().fadeIn(2000);
    $('#toggle-article').click(function() {
        $('article').fadeToggle();
    });
    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f';

    $.getJSON(url).then(function(data) {
        console.log(data);
        var temperature = data.main.temp;
        //this sets the id = temp to the temperature data
        $('#temp').text(Math.round(temperature));
    });
    console.log('Test');

});