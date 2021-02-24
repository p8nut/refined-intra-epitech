(() => {
    if (!document.location.href.match(/\/bareme\//g))
        return;
        
    window.onload = () => {
        /*const baremes = document.querySelectorAll('.bareme_note > p');

        baremes.forEach((elem) => {

            
            setTimeout(() => {
                loadScript(`${load.toString()}; load(document.querySelector('[data-name="${elem.parentElement.dataset.name}"] > p'));`)

            }, 100)

            function load(elem) {
                if (!elem)
                    return;
                function onInput(element, jquery) {
                    const noteRegex = /(.*)(\[\/([0-9]+)\])(.*)/g;
                    const textareaName = element.parentElement.parentElement.childNodes[3].childNodes[0].name;
                    const textareaElem = jquery(`[name="${textareaName}"]`);
                    let textContent = textareaElem.val();
                    const titleAndNote = element.nextSibling.textContent;
    
                    const checkedString = element.checked ? "OK" : "KO";
    
                    let m = noteRegex.exec(titleAndNote);
                    while (m != null) {
                        const title = (m[1] || m[4]).trim();
    
                        textContent = textContent.replace(`${title}: OK`, `${title}: ${checkedString}`);
                        textContent = textContent.replace(`${title}: KO`, `${title}: ${checkedString}`);
                        m = noteRegex.exec(titleAndNote);
                    }
                    textareaElem.val(textContent);
                }

                let text = elem.innerHTML;
                const noteRegex = /(.*)(\[\/([0-9]+)\])(.*)/g;
                const textareaName = `[name="${elem.parentElement.childNodes[3].childNodes[0].name}"]`
                const isEmpty = !$(textareaName).val();
                let m = noteRegex.exec(text);
                let i = 0;
    
                console.log($(textareaName).val());
                while (m) {
                    const title = (m[1] || m[4]).trim();
                    elem.innerHTML = elem.innerHTML.replace(m[0], `<input type='checkbox' name='${elem.parentElement.dataset.name + "-check-" + i}' oninput='(${onInput.toString()})(this, $);' class='note_box'/>${m[0]}`)
                    if (isEmpty) {
                        console.log(title);
                        $(textareaName).val($(textareaName).val() + title + ': KO\n\n');
                    }
                    i++;
                    m = noteRegex.exec(text);
                }
            }
            
            
        });*/
    };
})();