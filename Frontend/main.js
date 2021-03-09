updatePanier();
function updatePanier(){
    let i = 0;
    let quantity = 0;
    while (localStorage.key(i)) {
        quantity =quantity + parseInt(localStorage.getItem(localStorage.key(i)),10);
        i++;
    }
    document.querySelector('#quantityPanier').textContent = quantity;
}

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