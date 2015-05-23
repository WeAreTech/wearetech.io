/**
 * @fileOverview scripts about the frontpage.
 */

var calendarth = require('calendarth');

var util = require('./util');

var Front = module.exports = function() {
  this.$agendaContainer = null;
  this.$agendaItem = null;
  this.$error = null;
};

/** @const {number} Maximum events to display, use an even number */
Front.MAX_EVENTS_SHOW = 10;

/**
 * Initialize the frontpage view.
 *
 */
Front.prototype.init = function() {
  this.$agendaContainer = $('#agenda-items');
  this.$agendaItem = $('#agenda-tpl');
  this.$error = $('#agenda-error');
  this.calendarth = calendarth({
    apiKey: window.serv.calendarApiKey,
    calendarId: window.serv.callendarId,
    maxResults: 12
  });

  this.calendarth.fetch(this._handleCalResult.bind(this));
  this._fixPanels();
};

/**
 * A temp fix for panels height.
 *
 * @private
 */
Front.prototype._fixPanels = function() {
  var max = 0;
  $('.panel-info').each(function() {
    var currentHeight = $(this).height();
    if (currentHeight > max) {
      max = currentHeight;
    }
  });
  $('.panel-info').height(max);
};

/**
 * Handle incoming calendarth data.
 *
 * @param {?string|Error} err Possible error message.
 * @param {Object=} data The calendar data object.
 * @private
 */
Front.prototype._handleCalResult = function(err, data) {
  this.$agendaContainer.empty();
  if (err) {
    this.$agendaContainer.append(this.$error.clone().removeClass('hide'));
    return;
  }

  var meetups = [];
  var displayed = 0;
  var elements = '<div class="row">';
  data.items.forEach(function(item) {
    if (displayed >= Front.MAX_EVENTS_SHOW) {
      return;
    }
    if (meetups.indexOf(item.summary) > -1) {
      return;
    } else {
      meetups.push(item.summary);
    }

    if (displayed && displayed % 3 === 0) {
      // rows
      elements += '</div><div class="row">';
    }
    elements += this._assignValues(this.$agendaItem.clone(), item);
    displayed++;
  }, this);

  elements += '</div>';
  this.$agendaContainer.append(elements);
};

/**
 * Assign the Calendar item values to the Calendar item element.
 *
 * @param {jQuery} $item A jquery item we will manipulate.
 * @param {Object} item  [description]
 * @return {string} The html representation.
 * @private
 */
Front.prototype._assignValues = function($item, item) {
  $item.removeClass('hide');
  var truncatedEventTitle = util.truncateText(item.summary, 35);
  $item.find('h3.event-title').text(truncatedEventTitle);
  var data = this._parseDesc(item.description);

  var $dateEl = $item.find('.agenda-tpl-when');

  var formatedDate = util.parseDate(item.start);
  $dateEl.attr('datetime', item.start.dateTime);
  $dateEl.find('span.day').text(formatedDate.date);
  $dateEl.find('span.month').text(formatedDate.monthStr);

  $item.find('span.tpl-full-time').text(util.formatDate(item.start, item.end));


  var location = '';
  var truncatedVenue = util.truncateText(data.venue, 40);
  if (data.mapUrl) {
    location = '<a href="' + data.mapUrl + '" target="_blank">';
    location += truncatedVenue || '';
    location += '</a>';
  } else {
    location = truncatedVenue || '';
  }
  // $item.find('.agenda-tpl-address span').html(location);

  if (truncatedVenue) {
    $item.find('span.tpl-venue-copy').html(' @' + location);
  } else {
    // $item.find('.agenda-tpl-venue').addClass('hide');
  }

  if (data.infoUrl) {
    var infoUrl = '';
    if (data.infoUrl.length > 25) {
      infoUrl = data.infoUrl.substr(0, 25) + '...';
    } else {
      infoUrl = data.infoUrl;
    }
    $item.find('.agenda-tpl-info a').attr('href', data.infoUrl).text(infoUrl);
  } else {
    $item.find('.agenda-tpl-info').addClass('hide');
  }

  if (data.about) {
    $item.find('p.tpl-about').html(data.about);
  } else {
    $item.find('p.tpl-about').addClass('hide');
  }

  if (data.language) {
    $item.find('.agenda-tpl-language span').html(data.language);
  } else {
    $item.find('.agenda-tpl-language').addClass('hide');
  }

  var eventUrl = this.calendarth.getEventUrl(item);
  $item.find('.addcal').attr('href', eventUrl);
  $item.find('.viewcal').attr('href', item.htmlLink);

  return $item.html();
};

/**
 * Parse the description and generated info.
 *
 * @param {string} descr The description
 * @return {Object} An object containing the following properties:
 *   venue {?string} The venue where the event happens or null.
 *   info {?string} The informational url or null.
 *   map {?string} The map url or null.
 *   language {?string} The event language.
 * @private
 */
Front.prototype._parseDesc = function(descr) {
  var out = {
    venue: null,
    infoUrl: null,
    mapUrl: null,
    about: null,
    language: null,
    rest: ''
  };
  if (!descr) {
    return out;
  }
  var lines = descr.split('\n');
  lines.forEach(function(line) {
    if (!line.length) {
      return;
    }

    var splitPos = line.indexOf(':');
    if (splitPos === -1) {
      return;
    }

    var key = line.substr(0, splitPos).toLowerCase().trim();
    var value = line.substr(splitPos + 1).trim();

    switch(key) {
    case 'venue':
      out.venue = value;
      break;
    case 'info':
      out.infoUrl = value;
      break;
    case 'map':
      out.mapUrl = value;
      break;
    case 'about':
      out.about = value;
      break;
    case 'language':
      out.language = value;
      break;
    default:
      out.rest += line + '<br />';
      break;
    }
  }, this);

  return out;
};
