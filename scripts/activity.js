(() => {
    if (document.location.href.endsWith('/rdv/') && document.location.href.includes('/acti-')) {
        console.log("Intra refined Setup: ACTIVITY-RDV");
    }
})();