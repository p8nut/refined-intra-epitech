console.log("Intra refined Setup: EVERYWHERE");

function updateSelectType(s) {

}

const observer = new MutationObserver((mutationsList, observer) => {
    const select = document.getElementById("selectExportGeneric");
    if (select) {
        Array.from(select.getElementsByTagName("option")).forEach(element => {
            if (element.label === "Csv") element.selected = "selected"
        });
    }
});

// Start observing the target node for configured mutations
observer.observe(document, { attributes: true, childList: true, subtree: true });
