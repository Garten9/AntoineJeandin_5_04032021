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

function envoiFormulaire(){
    let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    }
    let productArray = getProductArray();
    console.log(contact);
    console.log(productArray);
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

// let submit = document.querySelector('#submit');
// submit.addEventListener('click', function(event){
//     event.preventDefault();
//     event.stopPropagation();
//     envoiFormulaire();
// });