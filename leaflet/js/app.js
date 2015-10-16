/*
    script file for index.html
    dependencies: leaflet, jquery

    Open Street Maps tile layer URL template:
    http://{s}.tile.osm.org/{z}/{x}/{y}.png

    attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
*/
$(function() {
    'user strict';
    function createMap(loc, zoom) {

        var map = L.map('map').setView(loc, zoom);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.circleMarker(loc).addTo(map).bindPopup('<h2>Hello></h2>');
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
           createMap([pos.coords.latitude, pos.coords.longitude], 15);
        });
    } else {
        createMap([47.6097, -122.3331], 12);
    }
})


//get json
//iterate over it using the .foreach
//each element in array has properties
//two most important are latitude and logitutde
//adding markers to a map per camera
//who owns the camera, the wdot or sdot
//bindpopup pops up with the marker after you click it. it can be any html, img tag picture requested from server