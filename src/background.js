var browser = browser || chrome;

function onBeforeRequest(request) {
  if (request.method !== 'GET') return;
  const options = JSON.parse(localStorage.getItem("options") || "{}");
  const url = new URL(request.url);

  // console.log(url.pathname)
  
  if (url.pathname.includes("/user/filter/user") && options.nolimit === true) {
    url.searchParams.set("nolimit", true);
    return { redirectUrl: url.toString() };
  }
  if (url.pathname.includes("/ressources/userpicture//file/userprofil/icon/")) {
    url.pathname = url.pathname.replace("/ressources/userpicture/", "");
    return { redirectUrl: url.toString() };
  }
  if (url.pathname.startsWith("/planning/load")) {
    url.searchParams.set("location", (options.locations || []).map((l) => l.code).join("|"));
    return { redirectUrl: url.toString() };
  }
  return { cancel: false };
}

browser.webRequest.onBeforeRequest.addListener(
  onBeforeRequest,
  {
    urls: ["*://intra.epitech.eu/*"],
    types: ["xmlhttprequest", "script", "main_frame", "image"]
  },
  ["blocking"]
);


///////////////////////////
// https://chromedevtools.github.io/devtools-protocol/1-3/Network
// https://stackoverflow.com/questions/8894461/updating-an-extension-button-dynamically-inspiration-required
