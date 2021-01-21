(() => {
    if (!document.location.href.match(/\/module\/#{0,1}$/g))
        return;
    window.onload = () => {
        
        const mainElement = document.getElementsByClassName('data')[0]

       // Create toggle activities registered button 
        const buttonExportLinkElement = document.createElement('a');
        buttonExportLinkElement.className = 'button export';
        buttonExportLinkElement.id = 'registeredButton';

        const buttonExportLinkSpanElement = document.createElement('span');
        buttonExportLinkSpanElement.className = 'label';
        buttonExportLinkSpanElement.innerText = `Show only activities where i'm registered`;

        const buttonExportLinkSpanParentElement = document.createElement('span');
        buttonExportLinkSpanParentElement.appendChild(buttonExportLinkSpanElement);

        buttonExportLinkElement.appendChild(buttonExportLinkSpanParentElement);
        mainElement.appendChild(buttonExportLinkElement);


        // Create project checkbox
        const projectDivElement = document.createElement('div');

        const projectCheckboxElement = document.createElement('input');
        projectCheckboxElement.type = 'checkbox';
        projectCheckboxElement.id = 'toggleOnlyProject';
        
        projectDivElement.appendChild(projectCheckboxElement);

        const projectLabelElement = document.createElement('label');
        projectLabelElement.innerText = 'Project';

        projectDivElement.appendChild(projectLabelElement);
        mainElement.appendChild(projectDivElement);

        // Create search checkbox
        const searchDivElement = document.createElement('div');

        const searchElement = document.createElement('input');
        searchElement.type = 'text';
        searchElement.id = 'refined_search';
        searchElement.placeholder = 'Search';
        
        searchDivElement.appendChild(searchElement);

        mainElement.appendChild(searchDivElement);
    };
})();