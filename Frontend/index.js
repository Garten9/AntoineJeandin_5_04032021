getProduits();


function getProduits() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            printProduits(response);
        }
    };
    request.open("GET", "http://localhost:3000/api/teddies/");
    request.send();
}


function printProduits(response) {
    for (let teddy of response) {
        let produits = document.querySelector('#produits');
        let newCard = document.createElement("div");
        produits.appendChild(newCard);
        newCard.classList.add('card', 'shadow', 'my-3');
        newCard.style.width = '18rem';

        newCard.innerHTML = '<img class="card-img-top" src = "' + teddy.imageUrl + '" alt = ""><div class="card-body"><h3 class="card-title">'+ teddy.name +'</h3><p class="card-subtitle text-muted mb-2">'+ teddy.price/100 + ' €</p><p class="card-text">'+ teddy.description +'</p></div><a class="stretched-link" href="'+ teddy._id +'.html"></a>';
    }

}