const urlParams = new URLSearchParams(window.location.search);
teddy = urlParams.get('id');

function printTeddy(teddy) {
    // let produit = document.querySelector('#produit');
    document.querySelector('#teddyImg').setAttribute('src', teddy.imageUrl);
    document.querySelector('#teddyName').textContent = teddy.name;
    document.querySelector('#teddyPrice').textContent = teddy.price / 100 + ' €';
    document.querySelector('#teddyDescription').textContent = teddy.description;
    for (let color of teddy.colors) {
        let option = document.createElement("option");
        let select = document.querySelector('#colors');
        select.appendChild(option);
        option.textContent = color;
    }
}

getProduit(teddy)
    .then(function (data) {
        printTeddy(data);
    })
    .catch(function (err) {
        console.log(err);
    });


function addToPanier() {
    if (localStorage.getItem(teddy)) {
        localStorage.setItem(teddy, parseInt(localStorage.getItem(teddy), 10) + 1);

    } else {
        localStorage.setItem(teddy, 1);
    }
}

let addBtn = document.querySelector('#addPanier');
addBtn.addEventListener('click', function () {
    addToPanier();
    updatePanier();
    let alert = document.querySelector('#alert');
    alert.classList.remove('d-none');
});

