var Register = module.exports = function() {};

/**
 * Initialize the register view.
 *
 */
Register.prototype.init = function() {
  this.$cityControl = $('#city');

  var input = document.getElementById('city');
  var options = {
    types: ['(cities)'],
    componentRestrictions: {country: 'gr'}
  };

  autocomplete = new google.maps.places.Autocomplete(input, options);

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
      map.panTo(place.geometry.location);
      map.setZoom(15);

      var marker = new google.maps.Marker({
        position: place.geometry.location,
        animation: google.maps.Animation.DROP
      });

      marker.setMap(map);

      var url = 'http://localhost:3000/available?place_id=' + place.place_id
      $.get(url, function(response){
        if(response.city && response.city != null) {
          $('.user-registration-form').removeClass('hidden');
          $('.form-title').html($('.form-title').text() + '<br/>' + place.formatted_address);


          $('<input>').attr({
            type: 'hidden',
            name: 'cityName',
            value: place.formatted_address
          }).appendTo($('.user-registration-form form'));

        }
      });
    }

  });

  var myOptions = {
    center: new google.maps.LatLng(54.8, -4.6),
    zoom: 5,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
};