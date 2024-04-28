(function () {
  ("use strict");

  var location = window.location;
  var document = window.document;

  var scriptElement = document.currentScript;
  var dataDomain = scriptElement.getAttribute("data-domain");

  var endpoint = "http://localhost:3000/api/track";

  // Retrieve or generate a session ID
  var sessionId = getSessionId();

  function getSessionId() {
    var storedSessionId = localStorage.getItem("session_id");
    if (storedSessionId) {
      return storedSessionId;
    } else {
      // Generate a new session ID if not already stored
      var newSessionId = generateSessionId();
      localStorage.setItem("session_id", newSessionId);
      trackSessionStart();
      return newSessionId;
    }
  }

  function generateSessionId() {
    // Generate a random session ID
    return "session-" + Math.random().toString(36).substr(2, 9);
  }

  // Function to send tracking events to the endpoint
  function trigger(eventName, options) {
    var payload = {
      event: eventName,
      url: location.href,
      domain: dataDomain,
      sessionId: sessionId,
    };

    sendRequest(payload, options);
  }

  // Function to send HTTP requests
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

  // Queue of tracking events
  var queue = (window.your_tracking && window.your_tracking.q) || [];
  window.your_tracking = trigger;
  for (var i = 0; i < queue.length; i++) {
    trigger.apply(this, queue[i]);
  }

  // Function to track page views
  function trackPageView() {
    // Trigger a custom event indicating page view
    trigger("pageview");
  }
  function trackSessionStart() {
    // Trigger a custom event indicating page view
    trigger("session_start");
  }
  function trackSessionEnd() {
    trigger("session_end");
  }

  // Track page view when the script is loaded
  trackPageView();

  // Event listener for popstate (back/forward navigation)
  window.addEventListener("popstate", trackPageView);

  var inactivityTimeoutDuration = 1 * 10 * 1000;

  var lastActivityTimestamp = Date.now();

  // Function to check for inactivity and end session if necessary
  function checkInactivity() {
    var currentTime = Date.now();
    var elapsedTime = currentTime - lastActivityTimestamp;

    if (elapsedTime >= inactivityTimeoutDuration) {
      // Inactivity timeout reached, end session
      // Remove the session ID from localStorage
      localStorage.removeItem("session_id");
      trackSessionEnd();
    }
  }

  // Event listener for user activity (e.g., mouse movement, keypress)
  document.addEventListener("mousemove", function () {
    lastActivityTimestamp = Date.now();
  });

  document.addEventListener("keypress", function () {
    lastActivityTimestamp = Date.now();
  });

  // Check for inactivity periodically
  setInterval(checkInactivity, 10000); // Check every minute
})();
