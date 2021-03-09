let panier = document.querySelector('#panier');
let totalPrice = 0;


// const getProduit = (idTeddy) => {
//     return new Promise((resolve, reject) => {
//         var request = new XMLHttpRequest();
//         request.onload = function () {
//             if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//                 resolve(JSON.parse(this.responseText));
//             } else {
//                 reject(Error(this.statusText));
//             }
//         };
//         request.open("GET", "http://localhost:3000/api/teddies/" + idTeddy + "");
//         request.send();
//     });
// };

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
                console.log(data);
                document.querySelector('#totalPrice').textContent = totalPrice + ' €';
            })
            .catch(function (err) {
                console.log(err);
            });
        i++;
    }
}

getPanier();


let resetBtn = document.querySelector('#resetPanier');
resetBtn.addEventListener('click', function () {
    localStorage.clear();
    document.location.href = 'panier.html';
});