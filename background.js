var browser = browser || chrome
browser.webRequest.onBeforeRequest.addListener(
    function (request) {
        if (request.method === "GET" && request.url.includes("/user/filter/user")) {
            console.log("user/filter unlimit")
            let redirectUrl = request.url + "&nolimit=true";
            return { redirectUrl };
        }
        if (request.method === "GET" && request.url.includes("/ressources/userpicture//file/userprofil/icon/")) {
            const redirectUrl = request.url.replace('/ressources/userpicture/', '');
            return { redirectUrl };
        }
        return { cancel: false };


    },
    { urls: ["*://intra.epitech.eu/*"], types: ["xmlhttprequest", "script", "main_frame"] },
    ["blocking"]);