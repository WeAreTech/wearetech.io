/**
 * @fileOverview City Registration app
 */
var Available = module.exports = function () {
  this.$mapContainer = null;
  this.$searchCityForm = null;
  this.$searchCityInput = null;
  this.$autocompleteObject = null;

  this.$cityCanonicalNameField = null;
  this.$cityCountryCodeField = null;
  this.$cityLatField = null;
  this.$cityLngField = null;
};

/**
 * Initialize the Available view.
 */
Available.prototype.init = function () {
  this.$searchCityForm = $('.search-city-form');
  this.$searchCityInput = $('#city');

  this.$cityCanonicalNameField = $('input[name=cityCanonicalName]');
  this.$cityCountryCodeField = $('input[name=cityCountryCode]');
  this.$cityLatField = $('input[name=cityLat]');
  this.$cityLngField = $('input[name=cityLng]');

  this.$searchCityForm.on('keydown', function (event) {
    if (event.keyCode === 13) {
      return false;
    }
  });

  this.$searchCityForm.on('submit', this._submitForm.bind(this));

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

  var options = {
    types: ['(cities)'],
    componentRestrictions: {country: 'gr'}
  };
  this.$autocompleteObject = new google.maps.places.Autocomplete(this.$searchCityInput[0], options); /* Pass native DOM element */

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

    this._populateHiddenForm(place);
  }
};

/**
 * Populate hidden inputs after valid city selection
 * @param place Google PlaceResult https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
 * @private
 */
Available.prototype._populateHiddenForm = function (place) {
  
  if (place.address_components && place.address_components[3] != null) {
    this.$cityCanonicalNameField.val(place.address_components[3].long_name);
  }

  if (place.address_components && place.address_components[6] != null) {
    this.$cityCountryCodeField.val(place.address_components[3].short_name);
  }

  if (place.geometry && place.geometry.location) {
    this.$cityLatField.val(place.geometry.location.B);
    this.$cityLngField.val(place.geometry.location.k);
  }

};

Available.prototype._submitForm = function () {

  /**
   * Validate hidden inputs
   */
  if(
    !this.$cityCanonicalNameField.val() ||
    !this.$cityCountryCodeField.val() ||
    !this.$cityLatField.val() ||
    !this.$cityLngField.val()
  ) {
    this.$searchCityInput.parent().parent().addClass('has-error');
    return false;
  }
};
