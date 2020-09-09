var host = "127.0.0.1";
var port = "5500";
var base = "http://" + host + ":" + port;

var api = [
  { name: "#CBPM_OAsummary", url: "/sample_CBPM_OA.json" },
  { name: "#CBPM_ARCHIVESsummary", url: "/sample_CBPM_ARCHIVES.json" },
  { name: "#CBPM_BCPPORTALsummary", url: "/sample_CBPM_BCPPORTAL.json" },
  { name: "#CBPM_QUARKsummary", url: "/sample_CBPM_QUARK.json" },
  { name: "#CBPM_HYHRsummary", url: "/sample_CBPM_HYHR.json" },
];

function subs() {
  var txt = [];
  for (var i = 0; i < api.length; ++i) {
    console.info('api[i]', api[i]);
    if (!api[i]) {
      return;
    }
    txt[i] = '<div id="' +
      api[i].name.replace("#", "") +
      '" class="task_contenttext_dangan"></div>';
  }
  return txt.join("");
}
function handle() {
  for (var i = 0; i < api.length; i++) {
    var element = api[i];
    if (!element) {
      return;
    }
    var settings = {
      url: base + element.url
    };
    $.ajax(settings).done(function (response) {
      console.log(response);
      var msg = [];
      for (var j = 0; j < response.result.categories.length; j++) {
        var m = response.result.categories[j];
        if (!m) {
          return;
        }
        msg[j] = '<a href="' +
          response.result.url +
          '" target="_blank" class="num">' +
          m.name +
          '<span class="num">' +
          m.total +
          "</span>件</a>";
      }
      $(element.name)[0].innerHTML =
        response.result.name + "：" + msg.join(";");
    });
  }
}
