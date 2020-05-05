window.onload = function() {

  let map;
  let dir;
  
  map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [39.429204, -0.417839],
    zoom: 15
  });

  dir = MQ.routing.directions();


  dir.route({
      locations: [
          'Paiporta, Santa Ana',
          'Paiporta, Colombicultura',
        
          'Paiporta, Jaime'
          
      ]
   
  });

  map.addLayer(MQ.routing.routeLayer({
      directions: dir,
      fitBounds: true
  }));
}