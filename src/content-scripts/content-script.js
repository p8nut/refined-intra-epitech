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

        // Manage modules (activities) page filters
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


            datagrid.updateList(values);
        }
        `);


        // Adding planning assistant filter
        arguments[0] = arguments[0].replaceAll('filter_location=null,', 'filter_location = null,filter_concerned=null,filter_type=null,');
        
        arguments[0] = arguments[0].replaceAll('Application.planning.filter.instance=function(options){', `Application.planning.filter.concerned = function(options) {
            const inputElement = document.getElementById('concerned');

            inputElement.addEventListener('input', (e) => {
                if (inputElement.checked)
                    options.storage.concerned = 'accept';
                else
                    options.storage.concerned = null;
                options.store();
            });
            options.loaded && options.loaded();
        };
        Application.planning.filter.instance=function(options){`)

        arguments[0] = arguments[0].replaceAll(`var loading=5;launchApp('planning.filter.location',{`, `
        ${createConcernedDiv.toString()}
        ${createActivityTypeDiv.toString()}
        if (!filter_concerned) {
            filter_concerned = createConcernedDiv();
        }
        if (!filter_type) {
            filter_type = createActivityTypeDiv(filterStorage, updateView);
        }
        var loading = 6;
        launchApp('planning.filter.concerned', {
            storage: filterStorage,
            events: events,
            bloc: filter_concerned,
            store: function() {
                updateView()
            },
            loaded: loaded
        });
        launchApp('planning.filter.location', {`)

        function createConcernedDiv() {
            const divConcernedElement = document.createElement('div');
            divConcernedElement.className = 'filters concerned';
            options.sidebar.find('> .wrapper > .bloc.filter')[0].appendChild(divConcernedElement);
            filter_concerned = options.sidebar.find('> .wrapper > .bloc.filter .filters.concerned');

            const newFieldSetElement = document.createElement('fieldset');
            
            const fieldSetLegendElement = document.createElement('legend');
            fieldSetLegendElement.innerText = 'Filter assistant';
            newFieldSetElement.appendChild(fieldSetLegendElement);
            
            const inputElement = document.createElement('input');
            inputElement.checked = !!filterStorage.concerned;
            inputElement.type = 'checkbox';
            inputElement.id = 'concerned';

            const labelElement = document.createElement('label');
            labelElement.innerText = 'Activities where i\'m assistant';

            newFieldSetElement.appendChild(inputElement);
            newFieldSetElement.appendChild(labelElement);
            divConcernedElement.appendChild(newFieldSetElement);
            return filter_concerned;
        }

        function createActivityTypeDiv(storage, store) {
            const divTypeElement = document.createElement('div');
            divTypeElement.className = 'filters type';
            options.sidebar.find('> .wrapper > .bloc.filter')[0].appendChild(divTypeElement);
            filter_type = options.sidebar.find('> .wrapper > .bloc.filter .filters.type');

            const newFieldSetElement = document.createElement('fieldset');
            
            const fieldSetLegendElement = document.createElement('legend');
            fieldSetLegendElement.innerText = 'Filter activity type';
            newFieldSetElement.appendChild(fieldSetLegendElement);
            
            const types = ['rdv', 'other', 'tp', 'class', 'exam'];
            for (let type of types) {
                const inputElement = document.createElement('input');
                inputElement.type = 'checkbox';
                inputElement.id = 'type_' + type;

                const labelElement = document.createElement('label');
                labelElement.innerText = type;

                newFieldSetElement.appendChild(inputElement);
                newFieldSetElement.appendChild(labelElement);

                inputElement.addEventListener('input', (e) => {
                    if (e.target.checked) {
                        if (!storage.type)
                            storage.type = '';
                        if (storage.type.length > 0)
                            storage.type += '|';
                        storage.type += type;
                    } else {
                        storage.type = storage.type.replaceAll('|' + type, '');
                        storage.type = storage.type.replaceAll(type, '');
                    }
                    store();
                })
            }

            divTypeElement.appendChild(newFieldSetElement);
            return filter_type;
        }

        arguments[0] = arguments[0].replaceAll(`function check_filter(appoint){`, `
        function check_filter(appoint){
            filters.push({
                name: 'concerned',
                filter: (storage, item) => {
                    if (!storage['concerned'])
                        return true;
                    if (storage['concerned'] == item.status_manager)
                        return true;
                    return false;
                }
            });
            filters.push({
                name: 'type',
                filter: (storage, item) => {
                    if (!storage['type'])
                        return true;
                    const types = storage['type'].split('|');
                    return types.includes(item.type_code)
                }
            });`)
        
        arguments[0].find(`return $(''+'<div class="bareme_note" data-name="'+name+'">'+'<h3>'+xss_protect(content.title)+'</h3>'+(content.comments ?'<p>'+xss_protect(content.comments)+'</p>':'') + '<div class="marks">'+radios+'</div>'+'<div class="comments">'+'<textarea name="'+name+'-comment"></textarea>'+'</div>'+'</div>')`);
        

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
