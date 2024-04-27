(function () {
  "use strict";

  var location = window.location;
  var document = window.document;

  var scriptElement = document.currentScript;
  var dataDomain = scriptElement.getAttribute("data-domain");

  var endpoint = "http://localhost:3000/api/track";

  function trigger(eventName, options) {
    var payload = {
      event: eventName,
      url: location.href,
      domain: dataDomain,
    };

    sendRequest(payload, options);
  }

  function sendRequest(payload, options) {
    var request = new XMLHttpRequest();
    request.open("POST", endpoint, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        options && options.callback && options.callback();
      }
    };

    request.send(JSON.stringify(payload));
  }

  var queue = (window.your_tracking && window.your_tracking.q) || [];
  window.your_tracking = trigger;
  for (var i = 0; i < queue.length; i++) {
    trigger.apply(this, queue[i]);
  }

  var lastPage;

  function page() {
    if (lastPage === location.pathname) return;
    lastPage = location.pathname;
    trigger("pageview");
  }

  window.addEventListener("popstate", page);

  function handleVisibilityChange() {
    if (!lastPage && document.visibilityState === "visible") {
      page();
    }
  }

  if (document.visibilityState === "prerender") {
    document.addEventListener("visibilitychange", handleVisibilityChange);
  } else {
    page();
  }
})();
