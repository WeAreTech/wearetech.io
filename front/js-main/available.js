/**
 * @fileOverview City Registration app
 */
var Available = module.exports = function () {
  this.$mapContainer = null;
  this.$searchCityForm = null;
  this.$cityInput = null;
  this.$autocompleteObject = null;
};

/**
 * Initialize the Available view.
 */
Available.prototype.init = function () {
  this.$mapContainer = null;
  this.$searchCityForm = $('.search-city-form');
  this.$cityInput = null;

  this.$searchCityForm.on('submit', function () { return false; });

  this._initAutocomplete();
  this._initMap();
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

  var options = {
    types: ['(cities)'],
    componentRestrictions: {country: 'gr'}
  };
  this.$autocompleteObject = new google.maps.places.Autocomplete(cityInput, options);

  google.maps.event.addListener(this.$autocompleteObject, 'place_changed', this._changeMapLocation.bind(this));

};

Available.prototype._initMap = function () {
  var mapOptions = {
    center: new google.maps.LatLng(54.8, -4.6),
    zoom: 5,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false
  };
  this.$mapContainer = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
};

Available.prototype._changeMapLocation = function () {
  var place = this.$autocompleteObject.getPlace();
  if (place.geometry) {
    this.$mapContainer.panTo(place.geometry.location);
    this.$mapContainer.setZoom(15);

    var marker = new google.maps.Marker({
      position: place.geometry.location,
      animation: google.maps.Animation.DROP
    });

    marker.setMap(this.$mapContainer);
  }
};
