(() => {
    if (document.location.href.endsWith('/registered')) {
        console.log("Intra refined Setup: ACTIVITY");

        const list_inscrit_table = document.getElementById('list-inscrit');
        let button = null
        // Create an observer instance linked to the callback function
        const observer = new MutationObserver((mutationsList, observer) => {
            const buttons_container = Array.from(document.getElementsByClassName('admin')).find((e, id) => id === 0);
            if (!buttons_container) return;
            const students = Array.from(list_inscrit_table.getElementsByTagName('td')).filter((e) => e.dataset.login).map((e) => e.dataset.login)
            if (students.length === 0) return;
            if (button !== null) {
                buttons_container.removeChild(button)    
            }
            button = createButtonTeams(students)
            buttons_container.appendChild(button)
        });

        // Start observing the target node for configured mutations
        observer.observe(list_inscrit_table, { childList: true, subtree: true });
        //*/
    }
})();