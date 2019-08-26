// javascript function to search from locations list
function myFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("mySearch");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myMenu");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
// open navbar
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}
// toggle navbar
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}
// Object array from Brasilia Locations
var locations = [
    { name: "Juscelino Kubitschek bridge", ltd: -15.822086, lng: -47.829784},
    { name: "Cultural Complex of the Republic", ltd: -15.797219, lng: -47.877702},
    { name: "National Congress of Brazil", ltd: -15.799583, lng: -47.863905},
    { name: "Estádio Mané Garrincha", ltd: -15.782280, lng: -47.899396},
    { name: "Brasilia TV Tower", ltd: -15.790741, lng: -47.891196}
  ];

// initMap is the default function to load google maps API js (ref: https://developers.google.com/maps/documentation/javascript/examples/map-simple)
function initMap() {

//View function based on knockout.js (ref https://knockoutjs.com/)
var LocalView = function(items) {
    this.items = ko.observableArray(items);
    function mysearch(d){
      alert(d);
      service.nearbySearch(d, callback);
    };
};
ko.applyBindings(new LocalView(locations));

//seting initial map location
var myLatLng = {lat: -15.7797200, lng: -47.9297200};

var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 13,
  center: myLatLng
});

locations.forEach(function (location){
  var $body = $('body');
  var $wikiElem = $('#wikipedia-links');
  var contentString = '<div id="content">'+
    '<div class="wikipedia-container">'+
    '<h3 id="wikipedia-header">Relevant Wikipedia Links</h3>'+
    '<ul id="wikipedia-links">List</ul>'+
    '</div>';

  // clear out old data before new request
  $wikiElem.text("");

  var wiki_url = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+ location.name +'&format=json&callback=wikiCallback';
  var wikirequesttimeout = setTimeout(function(){
    $wikiElem.text("Failed to get wikipedia resourses");
  }, 8000);

//wiki ajax funciton to load data from locations
  $.ajax({
    url: wiki_url,
    dataType: "jsonp",
    success: function(response){
      var articleList = response[1];
      for (var i =0; i < articleList.length; i++){
        articleStr = articleList[i];
        var url = 'http://en.wikipedia.org/wiki/'+ articleStr;
        $wikiElem.append('<li><a href="'+ url +'">'+ articleStr +'</a></li>');

        infowindow.setContent(
          '<div>'+
          '<h3>Relevant Wikipedia Links</h3>'+
          '<li><a href="'+ url +'">'+ articleStr +'</a></li>'+
          '</div>');

      };
      clearTimeout(wikirequesttimeout);
    }
  });

// google marker function to add markers on map based on locations (ref https://developers.google.com/maps/documentation/javascript/examples/marker-simple)
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(location.ltd,location.lng),
    map: map,
    title: location.name

  });

  marker.addListener('click', function() {
    map.setZoom('20');
    map.setCenter(marker.getPosition());
    infowindow.open(map, marker);
  });

  // function google infowindows to open window on marker click (ref https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple)
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
});

}
