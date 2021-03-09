function printProduits(response) {
    for (let teddy of response) {
        let newCard = document.createElement("div");
        let produits = document.querySelector('#produits');
        produits.appendChild(newCard);
        newCard.classList.add('card', 'shadow', 'my-3');
        newCard.style.width = '18rem';

        newCard.innerHTML = '<img class="card-img-top" src = "' + teddy.imageUrl + '" alt = ""><div class="card-body"><h3 class="card-title">'+ teddy.name +'</h3><p class="card-subtitle text-muted mb-2">'+ teddy.price/100 + ' €</p><p class="card-text">'+ teddy.description +'</p></div><a class="stretched-link" href="produit.html?id='+ teddy._id +'"></a>';
    }
}

getProduits()
    .then(function(data) {
        printProduits(data);
    })
    .catch(function (err) {
        console.log(err);
    });
