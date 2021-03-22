const urlParams = new URLSearchParams(window.location.search);
teddy = urlParams.get('id'); // recupère l'id du produit dans l'url


// permet d'afficher les éléments du produit sur la page
function printTeddy(teddy) {
    if(teddy.imageUrl && teddy.name && teddy.price && teddy.description && teddy._id && teddy.colors){
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
    }else{
        document.querySelector('#produit').textContent = 'Erreur lors de l\'affichage du produit';
    }
}

// récupére le produit et appelle la fonction d'affichage
getProduit(teddy)
    .then(function (data) {
        printTeddy(data);
    })
    .catch(function (err) {
        console.log(err);
    });


// Ajoute un item au panier
function addToPanier() {
    if (localStorage.getItem(teddy)) {
        localStorage.setItem(teddy, parseInt(localStorage.getItem(teddy), 10) + 1);
    } else {
        localStorage.setItem(teddy, 1);
    }
}

// event listener du click sur le bouton "ajouter au panier"
let addBtn = document.querySelector('#addPanier');
addBtn.addEventListener('click', function () {
    addToPanier();
    updatePanier();
    let alert = document.querySelector('#alert');
    alert.classList.remove('d-none');
});

