let locations = [{ code: "FR/NAN" }]

/*
fetch('https://intra.epitech.eu/user/filter/location?format=json').then(r => r.text()).then(result => {
    locations = JSON.parse(result)
    console.log(locations)
})
*/

var browser = browser || chrome
browser.webRequest.onBeforeRequest.addListener(
    function (request) {
        const url = new URL(request.url);
        if (request.method === "GET" && url.pathname.includes("/user/filter/user")) {
            url.searchParams.set('nolimit', true)
            return { redirectUrl: url.toString() };
        }
        if (request.method === "GET" && url.pathname.includes("/ressources/userpicture//file/userprofil/icon/")) {
            url.pathname = url.pathname.replace('/ressources/userpicture/', '');
            return { redirectUrl: url.toString() };
        }
        if (request.method === "GET" && url.pathname.startsWith("/planning/load")) {
            url.searchParams.set("location", locations.map((l) => l.code).join('|'));
            return { redirectUrl: url.toString() };
        }
        return { cancel: false };
    },
    { urls: ["*://intra.epitech.eu/*"], types: ["xmlhttprequest", "script", "main_frame", "image"] },
    ["blocking"]);