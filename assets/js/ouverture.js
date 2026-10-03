(function () {
  'use strict';

  var card = document.getElementById('fablab-opening');
  if (!card) return;

  var label = document.getElementById('fablab-opening-label');
  var dateElement = document.getElementById('fablab-opening-date');
  var parisDate = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit'
  });
  var frenchDate = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
  var timer;
  var previousKey;

  // UTC is used only for calendar arithmetic; today's date is always read in Paris.
  function thirdSaturday(year, month) {
    var first = new Date(Date.UTC(year, month, 1));
    return new Date(Date.UTC(year, month, 15 + (6 - first.getUTCDay() + 7) % 7));
  }

  function refreshOpening() {
    var now = new Date();
    var parts = parisDate.formatToParts(now);
    var calendar = {};
    parts.forEach(function (part) { calendar[part.type] = part.value; });
    var year = Number(calendar.year);
    var month = Number(calendar.month) - 1;
    var today = new Date(Date.UTC(year, month, Number(calendar.day)));
    var opening = thirdSaturday(year, month);

    // Keep this month's date throughout the opening day, including after 17:00.
    if (today.getTime() > opening.getTime()) {
      opening = thirdSaturday(year, month + 1);
    }

    var isToday = today.getTime() === opening.getTime();
    var key = opening.toISOString().slice(0, 10) + ':' + isToday;
    if (key !== previousKey) {
      label.textContent = isToday ? 'C’est aujourd’hui !' : 'Prochaine ouverture du FabLab';
      var formatted = frenchDate.format(opening);
      dateElement.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
      dateElement.setAttribute('datetime', opening.toISOString().slice(0, 10));
      card.classList.toggle('fablab-opening--today', isToday);
      previousKey = key;
    }

    // Align to the next minute, including Paris midnight, without reloading the page.
    window.clearTimeout(timer);
    timer = window.setTimeout(refreshOpening, 60000 - (now.getTime() % 60000));
  }

  refreshOpening();
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) refreshOpening();
  });
  window.addEventListener('pageshow', refreshOpening);
}());
