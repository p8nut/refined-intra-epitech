console.log("Hello from the content-script");

var _ = function () {
    var _eval = window.eval;
    var _launchApp = null;
    window.eval = function () {

        arguments[0] = arguments[0].replaceAll('(function(){', `
        (function(){
            const refined_registered_btn = document.getElementById("registeredButton");
            if (refined_registered_btn) {
                var refined_registered = false;
            }
        `);
        // order treeview by alphabetical order
        arguments[0] = arguments[0].replaceAll("node.data('item').items", `node.data('item').items.sort(function(a, b) {
            var textA = (a.code + a.title).toUpperCase();
            var textB = (b.code + b.title).toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });`);

        // order planning activity to plannify
        arguments[0] = arguments[0].replaceAll("draw_activities_to_planify(json){", `draw_activities_to_planify(json){
            json = json.sort(function(a, b){
                var textA = (a.codemodule[0] + a.semester + a.codemodule + a.codeinstance).toUpperCase();
                var textB = (b.codemodule[0] + b.semester + b.codemodule + b.codeinstance).toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                `);

        // add instance code to treeview
        arguments[0] = arguments[0].replaceAll("'<span>'+instance.title+str", "'<span><strong>'+'['+instance.code+']</strong><small> - '+instance.title+str+'</strong>'")

        // add teams call to groups
        // arguments[0] = arguments[0].replaceAll("'<div class=\"groupinfo\">'", "'<p>hello</p><div class=\"groupinfo\">'")

        arguments[0] = arguments[0].replaceAll('function push_rdv(item, all, start, length) {', `function push_rdv(item, all, start, length) {console.log(item);`);

        arguments[0] = arguments[0].replaceAll("datagrid.updateList(values);", `
        const baseValues = JSON.parse(JSON.stringify(values));
        datagrid.updateList(values); 
        let shouldRegistered = false;
        let search = '';
        let toggleProject = false;
        
        const refined_registered_btn = document.getElementById("registeredButton");
        if (refined_registered_btn) {
            refined_registered_btn.onclick = () => {
                values = baseValues;
                shouldRegistered = !shouldRegistered;
                updateWithFilters();
            }
        }
        
        const refined_search_field = document.getElementById("refined_search");
        if (refined_search_field) {
            refined_search_field.addEventListener('keyup', (e) => {
                if (e.keyCode == 13) {
                    search = refined_search_field.value;
                    updateWithFilters();
                }
            });
        }

        const refined_project_checkbox = document.getElementById("toggleOnlyProject");
        if (refined_project_checkbox) {
            refined_project_checkbox.addEventListener('input', (e) => {
                toggleProject = refined_project_checkbox.checked
                updateWithFilters();
            });
        }

        function updateWithFilters() {
            datagrid.updateList([]);
            values = baseValues.filter((elem) => {
                const isValid = true;
                
                if (shouldRegistered && elem.registered !== 1)
                    return false;
                
                if (search !== '') {
                    const isTitleValid = elem.acti_title.toLowerCase().includes(search.toLowerCase());
                    const isProjectValid = elem.project && elem.project.toLowerCase().includes(search.toLowerCase());
                    const isTitleModuleValid = elem.title_module.toLowerCase().includes(search.toLowerCase());
                    const isCodeModuleValid = elem.codemodule.toLowerCase().includes(search.toLowerCase());

                    if (!isTitleValid && !isProjectValid && !isTitleModuleValid && !isCodeModuleValid)
                        return false;
                }

                if (toggleProject && elem.type_acti_code != 'proj')
                    return false;
                return true;
            });
            console.log(values);


            datagrid.updateList(values);
        }
        `)
        
        const res = _eval.apply(this, arguments);
        if (window.launchApp && !_launchApp) {
            _launchApp = window.launchApp;
            window.launchApp = function (app, options) {
                if (app === 'planning.export') {
                    console.log(options)
                }
                return _launchApp.apply(this, arguments);
            }
        }
        return res
    };
}

var script = document.createElement('script');
script.textContent = `(` + _.toString() + `)()`;


(document.head || document.documentElement).appendChild(script);

//script.remove();
