/**
 * @fileOverview City Registration app
 */
var Available = module.exports = function () {};

/**
 * Initialize the Available view.
 */
Available.prototype.init = function () {
  this._initAutocomplete();
};

/**
 * Initialize Google's Autocomplete library
 *
 * @todo get a list of Country's Geo values to populate the Country's select box
 * like this https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch
 *
 * @see https://developers.google.com/maps/documentation/javascript/places-autocomplete
 */
Available.prototype._initAutocomplete = function () {

  var cityInput = document.getElementById('city');

  autocomplete = new google.maps.places.Autocomplete(cityInput, {
    types: ['(cities)'],
    componentRestrictions: {country: 'gr'}
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    var place = autocomplete.getPlace();
    if (place.geometry) {
      map.panTo(place.geometry.location);
      map.setZoom(15);

      var marker = new google.maps.Marker({
                                            position: place.geometry.location,
                                            animation: google.maps.Animation.DROP
                                          });

      marker.setMap(map);
    }

  });

  map = new google.maps.Map(document.getElementById('map-canvas'), myOptions = {
    center: new google.maps.LatLng(54.8, -4.6),
    zoom: 5,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false
  });
};
