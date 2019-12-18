  var lat1;
  var lng1;
  var lat2;
  var lng2;
  var pickupdata=[];
  var dropdata=[];
  var waypoints=[];
  var totalDistance=0;
  var del=false;

  // initial Map

  window.onload = function myMap() 
  {
    var mapProp= 
    {
      center:new google.maps.LatLng(11.342423,77.728165),
      zoom:4,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  }

  // function to set a first mark in a google map

  function myMap(lat,long) 
  {
        var myLatlng = new google.maps.LatLng(lat,long);
        var mapOptions = {
          zoom: 11,
          center: myLatlng,
        }
        var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            icon: {
            url: "images/startMarker.png"
          }
        });
        marker.setMap(map);
  }

  // Auto Complete Function

  function initializeAutocomplete()
  {

    var directionsDisplay = new google.maps.DirectionsRenderer;

    var directionsService = new google.maps.DirectionsService;

    var input = document.getElementById('locality');

    var options = {};

    var autocomplete = new google.maps.places.Autocomplete(input, options);

    // Pickup Location

    google.maps.event.addListener(autocomplete, 'place_changed', function() 
    {
      var place = autocomplete.getPlace();
      lat1 = place.geometry.location.lat();
      lng1 = place.geometry.location.lng();
      pickupdata=[lat1,lng1];
      myMap(lat1,lng1);
      pickup();
    });

  }

  // function for autocomplete googlemap location

  function initializeAutocompletee(id)
  {

    toAutocomplete = new google.maps.places.Autocomplete(document.getElementById('drop_location'+id));

    var directionsDisplay = new google.maps.DirectionsRenderer;

    var directionsService = new google.maps.DirectionsService;

    var input = document.getElementById('locality');

    var options = {};

    var autocomplete = new google.maps.places.Autocomplete(input, options);

    // Drop Location

      google.maps.event.addListener(toAutocomplete, 'place_changed', function () 
      {
      var droploc = toAutocomplete.getPlace();
      lat2 = droploc.geometry.location.lat();
      lng2 = droploc.geometry.location.lng();
      dropdata.push([lat2,lng2,id]);
      console.log(dropdata);
      myMap(lat2,lng2);
      pickup();
      });
  }


  // Function to find if the values are valid and not empty

  function pickup()
  {
    if(pickupdata.length!=0&&dropdata.length!=0)
    {
      if(lat1!=0 && lng1!=0 && lat2!=0 && lng2!=0)
      {
        route(pickupdata,dropdata);
        distance(pickupdata,dropdata);
      }
    }
  }

  // find route between the pickup and drop location

  function route(pickupdata,dropdata) 
  {
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;

    document.getElementById("dist").innerHTML = " ";

    var map = new google.maps.Map(document.getElementById('googleMap'), 
    {
      zoom: 14,
      center: {lat: 11.342423, lng: 77.728165}
    });
    directionsDisplay.setMap(map);

    direction(pickupdata,dropdata);
  }


// Get the multiple point location in the maps

  function direction(pickupdata,dropdata)
  {

    var directionsService = new google.maps.DirectionsService();

    var renderOptions = { draggable: false };

    var directionDisplay = new google.maps.DirectionsRenderer(renderOptions);

    var map = new google.maps.Map(document.getElementById('googleMap'), 
        {
          zoom: 14,
          center: {lat: 11.342423, lng: 77.728165}
        });

    directionDisplay.setMap(map);

    var items = dropdata;
    var len=dropdata.length;
    var waypoints = [];
    for (var i = 0; i < items.length-1; i++) {
        var lat = items[i][0];
        var lng = items[i][1];
            waypoints.push(
            {
                location:
                {
                  lat:items[i][0],lng:items[i][1]
                },
                stopover: true
            });
    }

    var originAddress = "starting address";
    var destinationAddress = "destination address";

    var request = {
                origin: {lat:pickupdata[0], lng: pickupdata[1]},
                destination: {lat: dropdata[len-1][0], lng: dropdata[len-1][1]},
                waypoints: waypoints, 
                optimizeWaypoints: true,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionDisplay.setDirections(response);
        }
        else {
          console.log("Error");
        }
    });
  }

// calculate the the distance between the two points (And calculates the total distance)

  function distance(pickupdata,dropdata) 
  {
    var R = 6371; // km (change this constant to get miles)
    var dLat = (dropdata[dropdata.length-1][0]-pickupdata[0]) * Math.PI / 180;
    var dLon = (dropdata[dropdata.length-1][1]-pickupdata[1]) * Math.PI / 180;
    var distance;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    if (d>1)
      { 
        distance=Math.round(d)+" km";
        console.log(del);
        if(!del)
        {
        var integer = parseInt(distance, 10);
        totalDist = parseInt(totalDistance, 10);
        totalDis=totalDist+integer;
        totalDistance+=totalDis;
        }
        else
        {
        var integer = parseInt(distance, 10);
        totalDist = parseInt(totalDistance, 10);
        totalDis=totalDist+integer;
        totalDistance-=totalDis; 
        del=false;  
        }
      }
    else if (d<=1) 
      {
        distance= Math.round(d*1000)+"m";
        var integer = parseInt(distance, 10);
        totalDist = parseInt(totalDistance, 10);
        totalDis=totalDist+integer;
        totalDistance+=totalDis;

      }
      $("#dist").append(Math.abs(totalDistance));
  }
