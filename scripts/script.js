function createButton(title, url) {
    const button = document.createElement("A");
    button.innerHTML = `<span><span class="label">${title}</span></span>`;

    const class_ = document.createAttribute('class');
    class_.value = 'button upload';
    button.setAttributeNode(class_);

    const target = document.createAttribute('target');
    target.value = '_blank';
    button.setAttributeNode(target);

    const href = document.createAttribute('href');
    href.value = url;
    button.setAttributeNode(href);

    return button
}

function createButtonTeams(students) {
    return createButton("Call with Teams", 'https://teams.microsoft.com/l/chat/0/0?users=' + ''.concat(students));
}
