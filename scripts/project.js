(() => {
    if (document.location.href.includes('/project/')) {
        console.log("Intra refined Setup: PROJECT");

        Array.from(document.getElementsByClassName('group complete')).forEach((group) => {
            const logins = Array.from(group.getElementsByClassName('member')).map((user) => user.dataset.memberLogin)
            if (!logins) return ;
            const action = Array.from(group.getElementsByClassName('actions')).find((e, id)=> id === 0);
            if (!action) return ;
            action.appendChild(createButtonTeams(logins));
        });
    }
})()