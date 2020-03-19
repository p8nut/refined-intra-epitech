(() => {
    // bareme
    if (document.location.href.match('\/module\/[0-9]{4}\/[A-Z]-[A-Z]{3}-[0-9]{3}\/[A-Z]{3}-[0-9]+-[0-9]+\/acti-[0-9]+\/bareme\/')) {
        console.log("Intra refined Setup: bareme");
        const members = document.getElementById('members');
        if (members) {
            const logins = Array.from(members.getElementsByClassName('member')).map(m => Array.from(m.getElementsByClassName('login'))).flat().map(m => m.innerText)
            members.appendChild(createButtonTeams(logins))
        }
    }
})();
