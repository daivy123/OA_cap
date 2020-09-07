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
  let txt = api.map(
    (element) =>
      '<div id="' +
      element.name.replace("#", "") +
      '" class="task_contenttext_dangan"></div>'
  );
  return txt.join("");
}
function handle() {
  api.forEach((element) => {
    var settings = {
      url: base + element.url,
    };
    $.ajax(settings).done(function (response) {
      console.log(response);
      let msg = response.result.categories.map(function (m) {
        return m.name + '<span class="num">' + m.total + "</span>件";
      });
      $(element.name)[0].innerHTML =
        response.result.name + "：" + msg.join(";");
    });
  });
}
