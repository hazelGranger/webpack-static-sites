(function(document) {
  var fromValue = (function getURLParameter(name) {
    return encodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
  })("from");
  if (fromValue) {
    document.cookie = "from=" + fromValue + ";Path=/" + "; Domain=itom.oneapm.com"
  }
})(document);