console.log("Hello from the content-script");

var _ = function () {
    var _eval = window.eval;
    var _launchApp = null;
    window.eval = function () {
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
