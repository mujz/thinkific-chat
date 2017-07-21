require('./tags/app.tag');

var BASE_URL = "http://localhost:8080";
var STYLES_LOCATION = BASE_URL + "/style.css";

var app = document.createElement("app");
document.getElementsByTagName("body")[0].prepend(app);

window.initLiveChat = function(username) {
  console.log(username);
}

riot.mount('app');
