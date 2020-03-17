(() => {
    if (document.location.href.endsWith('/registered') && document.location.href.includes('/event-')) {
        console.log("Intra refined Setup: EVENT");

        const list_inscrit_table = document.getElementById('list-inscrit');
        let button = null
        function upsertTeamsButton() {
            const buttons_container = Array.from(document.getElementsByClassName('admin')).find((e, id) => id === 0);
            if (!buttons_container) return;
            const students = Array.from(list_inscrit_table.getElementsByTagName('td')).filter((e) => e.dataset.login).map((e) => e.dataset.login)
            if (students.length === 0) return;
            if (button !== null) {
                buttons_container.removeChild(button)
            }
            button = createButtonTeams(students)
            buttons_container.appendChild(button)
        }

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver((mutationsList, observer) => {
            upsertTeamsButton();
        });

        // Start observing the target node for configured mutations
        upsertTeamsButton();
        observer.observe(list_inscrit_table, { childList: true, subtree: true });
        //*/
    }
})();