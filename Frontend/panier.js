let panier = document.querySelector('#panier');
let totalPrice = 0;


function printPanier(teddy) {
    let panierRow = document.createElement('tr');
    panier.appendChild(panierRow);
    panierRow.innerHTML = '<th><img class="mr-3" src="' + teddy.imageUrl + '" alt="" width=150>' + teddy.name + '</th><th class="align-middle">' + teddy.price / 100 + ' €</th><th class="align-middle">' + localStorage.getItem(teddy._id) + '</th><th class="align-middle">' + localStorage.getItem(teddy._id) * teddy.price / 100 + ' €</th>';
    totalPrice = totalPrice + localStorage.getItem(teddy._id) * teddy.price / 100;
}

function getPanier() {
    let i = 0;
    while (localStorage.key(i)) {
        getProduit(localStorage.key(i))
            .then(function (data) {
                printPanier(data);
                document.querySelector('#totalPrice').textContent = totalPrice + ' €';
            })
            .catch(function (err) {
                console.log(err);
            });
        i++;
    }
}

let emptyPanier = document.querySelector('#emptyPanier');
let filledPanier = document.querySelector('#filledPanier');
if (localStorage.length == 0){
    emptyPanier.classList.remove('d-none');
    filledPanier.classList.add('d-none');
}else{
    filledPanier.classList.remove('d-none');
    emptyPanier.classList.add('d-none');
}
getPanier();


let resetBtn = document.querySelector('#resetPanier');
resetBtn.addEventListener('click', function () {
    localStorage.clear();
    document.location.href = 'panier.html';
});

function getProductArray(){
    let productArray = [];
    let i=0;
    while (localStorage.key(i)){
        for (let j = 1; j <= localStorage.getItem(localStorage.key(i)); j++){
            productArray.push(localStorage.key(i));
        }
        i++;
    }
    return productArray;
}

const postOrder = (requete) => {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                resolve(JSON.parse(this.responseText));
            } else {
                reject(Error(this.statusText));
            }
        };
        request.open("POST", "http://localhost:3000/api/teddies/order");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(requete);
    });
};

function envoiFormulaire(){
    let contactObj = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    }
    let productArray = getProductArray();
    let requeteObj = {contact: contactObj, products: productArray};
    requete = JSON.stringify(requeteObj);

    console.log(requete);
    postOrder(requete)
        .then(function (data){
            sessionStorage.setItem('orderId', data.orderId);
            sessionStorage.setItem('totalPrice', totalPrice);
            document.location.href = 'confirmation.html';
        })
        .catch(function (err){
            console.log(err);
            document.querySelector('#echec').classList.remove('d-none');
        });
}


let form = document.querySelector('#form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.checkValidity() === true) {
        envoiFormulaire();
    }
    event.target.classList.add('was-validated');
});
