const utils = {
  setCookie: (cookieName, cookieValue, expirationSeconds) => {
    var date = new Date();
    var expirationDate = new Date(date.getTime() + expirationSeconds * 1000);
    document.cookie =
      cookieName +
      "=" +
      cookieValue +
      "; expires=" +
      expirationDate.toUTCString() +
      "; path=/";
  },
  getCookie: (cookieName) => {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  },

  formatDate: (time) => {
    const timeString = time;
    const date = new Date(timeString);
    const formattedTime = date.toLocaleString();

    return formattedTime;
  },

  formatTime: (seconds) => {
    const date = new Date(0);
    date.setSeconds(seconds);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const secondsFormatted = date.getUTCSeconds().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${secondsFormatted}`;
    return formattedTime;
  },
};

export default utils;
