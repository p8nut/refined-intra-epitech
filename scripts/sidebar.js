(() => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        console.log("Intra refined Setup: SIDEBAR");

        function updateModulesName(s) {
            if (!s.href.includes("/module/") || !s.href.endsWith("/all"))
                return
            const uri = s.href.split('/');
            const i = uri.indexOf("module");
            const code_module = uri[i + 2]
            if (!s.text.startsWith('[' + code_module + ']')) {
                s.text = '[' + code_module + ']' + " " + s.text;
            }
        }

        const observer = new MutationObserver((mutationsList, observer) => {
            const mutations = mutationsList.filter((m) => m.target && m.target.nodeName === "DD")
            const semesters = mutations.map((m) => m.target)
            const modules = semesters.map((s) => s.children).flat().map((h) => [...h]).flat().filter((value, index, self) => self.indexOf(value) === index)
            modules.forEach((m) => {
                m.style = 'overflow:hidden;';
                const sections = m.getElementsByTagName('a');
                Array.prototype.forEach.call(sections, (s) => {
                    updateModulesName(s);
                })
            });
        });

        // Start observing the target node for configured mutations
        observer.observe(sidebar, { attributes: true, childList: true, subtree: true });
    }
})();