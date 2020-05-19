let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

function send(query) {
    return new Promise(resolve => {
        fetch(query)
        .then(response => response.json())
        .then(result => {
            resolve(result);
        })
    })
}

export {$, $$, send};