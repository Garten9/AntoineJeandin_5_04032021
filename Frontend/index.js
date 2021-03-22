// permet d'afficher tous les produits dans des Card Bootstrap
function printProduits(response) {
    for (let teddy of response) {
        let newCard = document.createElement("div");
        let produits = document.querySelector('#produits');
        produits.appendChild(newCard);
        newCard.classList.add('card', 'shadow', 'my-3');
        newCard.style.width = '18rem';
        if (teddy.imageUrl && teddy.name && teddy.price && teddy.description && teddy._id ){
            newCard.innerHTML = '<img class="card-img-top" src = "' + teddy.imageUrl + '" alt = ""><div class="card-body"><h3 class="card-title">'+ teddy.name +'</h3><p class="card-subtitle text-muted mb-2">'+ teddy.price/100 + ' €</p><p class="card-text">'+ teddy.description +'</p></div><a class="stretched-link" href="produit.html?id='+ teddy._id +'"></a>';
        }else{
            newCard.innerHTML = '<div class="card-body"><p class="card-text">Erreur lors de l\'affichage du produit</p></div>'
        }
    }
}

// récupère tous les produits puis appelle la fonction printProduits() pour les afficher
getProduits()
    .then(function(data) {
        printProduits(data);
    })
    .catch(function (err) {
        console.log(err);
    });
