updatePanier();

// permet d'afficher la quantité d'items présent dans le panier à coté du lien "panier" de la barre de navigation, utilisé sur chaque page
function updatePanier(){ 
    let i = 0;
    let quantity = 0;
    while (localStorage.key(i)) {
        quantity =quantity + parseInt(localStorage.getItem(localStorage.key(i)),10);
        i++;
    }
    document.querySelector('#quantityPanier').textContent = quantity;
}

// permet de récupérer un produit en prenant l'id du produit en parametre
const getProduit = (idTeddy) => { 
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            } else {
                reject(Error(this.statusText));
            }
        };
        request.open("GET", "http://localhost:3000/api/teddies/" + idTeddy + "");
        request.send();
    });
};

// permet de récupérer tous les produits
const getProduits = () => {  
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            } else {
                reject(Error(this.statusText));
            }
        };
        request.open("GET", "http://localhost:3000/api/teddies/");
        request.send();
    });
};