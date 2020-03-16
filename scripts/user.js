(() => {
    if (document.location.href.includes('/user/')) {
        console.log("Intra refined Setup: USER");

        const login = Array.from(document.getElementsByClassName('item login')).find((e, id) => id === 0)
        if (!login) return;
        const l = Array.from(login.getElementsByClassName('value')).find((e, id) => id === 0)
        if (!l) return;
        login.appendChild(createButtonTeams([l.innerHTML.replace(' ', '')]));
    }
})()