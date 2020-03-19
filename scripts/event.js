(() => {
    if (document.location.href.match('\/module\/[0-9]{4}\/[A-Z]-[A-Z]{3}-[0-9]{3}\/[A-Z]{3}-[0-9]+-[0-9]+\/acti-[0-9]+\/event-[0-9]+\/registered')) {
        console.log("Intra refined Setup: EVENT REGISTERED");

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