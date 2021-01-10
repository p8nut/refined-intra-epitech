(() => {
    if (document.location.href.match('\/module\/[0-9]{4}\/[A-Z]-[A-Z]{3}-[0-9]{3}\/[A-Z]{3}-[0-9]+-[0-9]+\/acti-[0-9]+\/project')) {
        console.log("Intra refined Setup: PROJECT");

        Array.from(document.getElementsByClassName('group complete')).forEach((group) => {
            const logins = Array.from(group.getElementsByClassName('member')).map((user) => user.dataset.memberLogin)
            if (!logins) return ;
            const action = Array.from(group.getElementsByClassName('actions')).find((e, id)=> id === 0);
            if (!action) return ;
            action.appendChild(createButtonTeams(logins));
            /*
            const year =  0;
            const module = "B-CPP-300"
            const instance =  "NAN-3-1";
            const master = Array.from(group.getElementsByClassName('master')).map((user) => user.dataset.memberLogin)[0].split('@')[0]

            action.appendChild(createButton("jenkins", `https://jenkins.epitest.eu/job/${module}/job/CPPD01/job/2020/job/${instance}/job/${master}`));
            */
        });
    }
})()