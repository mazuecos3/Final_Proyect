/*<!DOCTYPE html>
<html lang="en">
    <head>
      <!-- Leaflet css-->
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
      <!-- My css-->
        <style>
          @import url("css/map.css");
      </style>
    </head>

    <body>
        <div id="mapid"></div>

 <!-- Leaflet js-->
        <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
 <!-- My js-->
        <script>
            var mymap = L.map('mapid').setView([39.4697495, -0.37739], 15);

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


var marker = L.marker([39.4697495, -0.37739]).addTo(mymap);



marker.bindPopup("<b>Start Here!</b>").openPopup();





        </script>
    </body>
</html>
*/